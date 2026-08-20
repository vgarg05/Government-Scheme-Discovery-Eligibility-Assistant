from src.agents.state import AgentState

class EligibilityAdjudicatorAgent:
    """
    Day 12: Eligibility Adjudicator Agent.
    Evaluates user demographic profile against scheme rules extracted from RAG/Web search context.
    Computes match status, match percentage score, and criteria breakdowns.
    """

    def process(self, state: AgentState) -> AgentState:
        profile = state.user_profile
        context_chunks = state.retrieved_chunks if state.retrieved_chunks else state.web_search_results

        if not context_chunks:
            state.eligibility_evaluation = {
                "is_eligible": False,
                "match_score": 0,
                "matched_criteria": [],
                "unmatched_criteria": ["No relevant scheme policy context found."],
                "matched_schemes": []
            }
            return state

        # Primary scheme matched
        matched_schemes = []

        for chunk in context_chunks:
            content = chunk.get("content") or chunk.get("snippet", "")
            scheme_id = chunk.get("scheme_id") or chunk.get("title", "General Government Scheme")
            
            matched_rules = []
            unmatched_rules = []
            score = 70  # Base match score

            # Rule 1: Age check
            if profile.age:
                if "60" in content or "senior" in content:
                    if profile.age >= 60:
                        matched_rules.append(f"Age criterion met: User age ({profile.age}) >= 60")
                        score += 10
                    else:
                        unmatched_rules.append(f"Age constraint: Requires 60+ (User age: {profile.age})")
                        score -= 20

            # Rule 2: Income check
            if profile.income:
                if "2.5" in content or "2,50,000" in content or "250000" in content:
                    if profile.income <= 250000:
                        matched_rules.append(f"Income criterion met: Rs. {profile.income} <= Rs. 2,50,000 ceiling")
                        score += 15
                    else:
                        unmatched_rules.append(f"Income ceiling exceeded: Rs. {profile.income} > Rs. 2,50,000")
                        score -= 25

            # Rule 3: Occupation match
            if profile.occupation and profile.occupation.lower() in content.lower():
                matched_rules.append(f"Occupation match: {profile.occupation}")
                score += 15

            final_score = max(0, min(100, score))
            is_eligible = final_score >= 60 and len(unmatched_rules) == 0

            matched_schemes.append({
                "scheme": scheme_id,
                "match_score": final_score,
                "is_eligible": is_eligible,
                "matched_criteria": matched_rules if matched_rules else ["General demographic alignment"],
                "unmatched_criteria": unmatched_rules
            })

        top_match = max(matched_schemes, key=lambda x: x["match_score"]) if matched_schemes else {}

        state.eligibility_evaluation = {
            "is_eligible": top_match.get("is_eligible", False),
            "match_score": top_match.get("match_score", 0),
            "top_scheme": top_match.get("scheme", ""),
            "matched_criteria": top_match.get("matched_criteria", []),
            "unmatched_criteria": top_match.get("unmatched_criteria", []),
            "all_evaluated_schemes": matched_schemes
        }

        return state

eligibility_agent = EligibilityAdjudicatorAgent()
