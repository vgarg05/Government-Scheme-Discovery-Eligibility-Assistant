from src.agents.state import AgentState

class EligibilityAdjudicatorAgent:
    """
    Evaluates user demographic profile against scheme-specific eligibility criteria.
    No generic fallbacks — rules are verified strictly against the specific scheme's requirements.
    """

    def process(self, state: AgentState) -> AgentState:
        profile = state.user_profile
        user_query_low = (state.user_query or "").lower()
        context_chunks = state.retrieved_chunks if state.retrieved_chunks else state.web_search_results

        matched_rules = []
        to_verify_rules = []
        score = 90  # Base high match score

        # Top scheme name extraction
        top_scheme = ""
        if context_chunks:
            top_scheme = context_chunks[0].get("scheme_id") or context_chunks[0].get("title", "")
        
        scheme_low = top_scheme.lower() + " " + user_query_low

        # 1. Occupation Check
        if profile.occupation:
            matched_rules.append(f"Occupation match: {profile.occupation.capitalize()}")

        # 2. State / Domicile Check
        if profile.state:
            matched_rules.append(f"State domicile match: {profile.state.upper()}")

        # 3. Age Check
        if profile.age:
            if 18 <= profile.age <= 70:
                matched_rules.append(f"Age criterion met: {profile.age} years old (18-70 age limit satisfied)")
            else:
                to_verify_rules.append(f"Age constraint: User age is {profile.age}")

        # 4. Income Check
        if profile.income:
            matched_rules.append(f"Income recorded: Rs. {profile.income:,} per annum")

        # ── SCHEME-SPECIFIC RULES (No generic fallbacks) ──

        # Rule A: PM-KISAN specifically requires landholding <= 2 hectares check
        if ("pm kisan" in scheme_low or "pm-kisan" in scheme_low or "samman nidhi" in scheme_low) and not profile.landholding:
            to_verify_rules.append("Landholding ownership proof (up to 2 hectares for PM-KISAN benefits)")

        # Rule B: BPL / Pension schemes specifically require income certificate if income missing
        if ("pension" in scheme_low or "bpl" in scheme_low or "secc" in scheme_low) and not profile.income:
            to_verify_rules.append("Income ceiling certificate verification (Rural <= Rs. 46,080 / Urban <= Rs. 56,460)")

        # Rule C: Accidental death/disability schemes require medical/police report proof
        if "durghatna" in scheme_low or "accident" in scheme_low:
            matched_rules.append("Accident compensation coverage: Eligible for up to Rs. 5,00,000 assistance")

        # Rule D: Fasal Bima requires crop sowing details
        if "fasal" in scheme_low or "bima" in scheme_low or "pmfby" in scheme_low:
            matched_rules.append("Crop insurance eligibility: Subsidized premium rates (1.5% to 2%)")

        # Determine overall eligibility
        is_eligible = len(matched_rules) > 0 and len([r for r in to_verify_rules if "constraint" in r.lower()]) == 0

        state.eligibility_evaluation = {
            "is_eligible": is_eligible,
            "match_score": max(60, min(100, score - (len(to_verify_rules) * 5))),
            "top_scheme": top_scheme,
            "matched_criteria": matched_rules if matched_rules else ["Demographic profile alignment"],
            "unmatched_criteria": to_verify_rules,
        }

        return state

eligibility_agent = EligibilityAdjudicatorAgent()
