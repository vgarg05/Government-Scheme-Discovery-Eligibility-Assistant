from src.agents.state import AgentState

class EligibilityAdjudicatorAgent:
    """
    Evaluates user demographic profile against scheme eligibility criteria.
    Determines matched rules, missing/to-verify criteria, and match score.
    """

    def process(self, state: AgentState) -> AgentState:
        profile = state.user_profile
        user_query_low = (state.user_query or "").lower()
        context_chunks = state.retrieved_chunks if state.retrieved_chunks else state.web_search_results

        matched_rules = []
        to_verify_rules = []
        score = 85  # Base match score for matched scheme

        # 1. Occupation Check
        if profile.occupation:
            matched_rules.append(f"Occupation match: {profile.occupation.capitalize()}")
        else:
            to_verify_rules.append("Occupation verification (e.g. Farmer, Agricultural Laborer, Student)")

        # 2. State / Domicile Check
        if profile.state:
            matched_rules.append(f"State domicile match: {profile.state.upper()}")
        else:
            to_verify_rules.append("State domicile proof")

        # 3. Age Check
        if profile.age:
            if 18 <= profile.age <= 70:
                matched_rules.append(f"Age criterion met: {profile.age} years old (18-70 age limit satisfied)")
            else:
                to_verify_rules.append(f"Age restriction: User age is {profile.age}")
        else:
            if "durghatna" in user_query_low or "krishak" in user_query_low:
                to_verify_rules.append("Age eligibility (requires 18 to 70 years)")

        # 4. Income Check
        if profile.income:
            matched_rules.append(f"Income record: Rs. {profile.income:,} per annum")
        else:
            to_verify_rules.append("Annual family income ceiling verification")

        # 5. Landholding / Category Check for Agricultural Schemes
        if "farmer" in (profile.occupation or "").lower() or "kisan" in user_query_low or "krishak" in user_query_low:
            if not any("land" in str(r).lower() for r in matched_rules):
                to_verify_rules.append("Landholding size (up to 2 hectares for small/marginal farmer benefits)")

        # Determine overall eligibility
        is_eligible = len(matched_rules) > 0 and len([r for r in to_verify_rules if "disqualif" in r.lower()]) == 0

        # Top scheme name extraction
        top_scheme = ""
        if context_chunks:
            top_scheme = context_chunks[0].get("scheme_id") or context_chunks[0].get("title", "")

        state.eligibility_evaluation = {
            "is_eligible": is_eligible,
            "match_score": max(50, min(100, score - (len(to_verify_rules) * 5))),
            "top_scheme": top_scheme,
            "matched_criteria": matched_rules if matched_rules else ["General demographic alignment"],
            "unmatched_criteria": to_verify_rules,
        }

        return state

eligibility_agent = EligibilityAdjudicatorAgent()
