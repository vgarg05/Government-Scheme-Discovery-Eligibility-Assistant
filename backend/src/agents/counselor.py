from src.agents.state import AgentState

class CounselorGuidanceAgent:
    """
    Day 13: Counselor & Guidance Agent.
    Formulates citizen guidance, application roadmaps, required document checklists, and source link citations.
    """

    def process(self, state: AgentState) -> AgentState:
        evaluation = state.eligibility_evaluation
        query = state.user_query
        mode = state.retrieval_mode

        top_scheme = evaluation.get("top_scheme", "Government Welfare Scheme")
        match_score = evaluation.get("match_score", 0)
        is_eligible = evaluation.get("is_eligible", False)

        # 1. Summary statement — plain text, no markdown, no % (card already shows that)
        if is_eligible:
            summary = f"Good news! Based on your profile, you are eligible for {top_scheme}. Check the eligibility card below for your match score, qualifying criteria, required documents, and application steps."
        else:
            summary = f"Based on your profile, we found {top_scheme} as the closest matching scheme. Please verify the specific eligibility criteria before applying. The card below has full details."

        # 2. Document Checklist
        document_checklist = [
            "Aadhaar Card (linked with active mobile number)",
            "Savings Bank Account Passbook with IFSC code",
            "Proof of Residence / Domicile Certificate",
            "Income Certificate issued by competent authority",
            "Category / Caste Certificate (if SC/ST/OBC/EWS)"
        ]

        # Clean top_scheme name — strip trailing ellipsis and cap length for display
        scheme_label = top_scheme.rstrip(" .…").strip()
        if len(scheme_label) > 60:
            scheme_label = scheme_label[:57] + "..."

        # 3. Step-by-Step Application Steps
        application_steps = [
            "Visit the official portal or your local Common Service Centre (CSC).",
            f"Fill out the online application form for {scheme_label}.",
            "Upload verified copies of the required document checklist.",
            "Submit the application and note down your Application / Reference Number for status tracking."
        ]

        # 4. Source Link Citations
        citations = []
        if mode == "rag" and state.retrieved_chunks:
            for chunk in state.retrieved_chunks[:2]:
                citations.append({
                    "type": "Official PDF Document",
                    "title": chunk.get("scheme_id", "").replace("_", " ").title(),
                    "filename": chunk.get("filename", "")
                })
        elif mode == "web_search" and state.web_search_results:
            for item in state.web_search_results[:2]:
                citations.append({
                    "type": "Live Government Portal",
                    "title": item.get("title", ""),
                    "url": item.get("link", "")
                })

        guidance = {
            "summary": summary,
            "top_scheme": top_scheme,
            "match_score": match_score,
            "is_eligible": is_eligible,
            "matched_criteria": evaluation.get("matched_criteria", []),
            "unmatched_criteria": evaluation.get("unmatched_criteria", []),
            "document_checklist": document_checklist,
            "application_steps": application_steps,
            "citations": citations,
            "retrieval_mode": mode
        }

        state.guidance_response = guidance
        state.final_output = guidance

        return state

counselor_agent = CounselorGuidanceAgent()
