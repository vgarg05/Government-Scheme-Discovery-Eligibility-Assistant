from src.agents.state import AgentState

# Curated scheme database for common farmer/citizen categories
# Used when Serper returns generic article titles instead of actual scheme names
FARMER_SCHEMES = [
    {
        "name": "PM Kisan Samman Nidhi (PM-KISAN)",
        "benefit": "Rs 6,000/year direct income support in 3 installments",
        "eligibility": "Small & marginal farmers with up to 2 hectares land",
        "portal": "https://pmkisan.gov.in",
        "docs": ["Aadhaar Card", "Land ownership records (Khasra/Khatauni)", "Bank account linked to Aadhaar"],
        "steps": [
            "Visit pmkisan.gov.in → 'Farmers Corner' → 'New Farmer Registration'",
            "Enter Aadhaar number, mobile number, and state",
            "Fill in land and bank details, submit",
            "Verify OTP sent to registered mobile",
            "Installment credited directly to bank account after verification"
        ]
    },
    {
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "benefit": "Crop insurance against natural calamities, pests & disease",
        "eligibility": "All farmers including sharecroppers and tenant farmers",
        "portal": "https://pmfby.gov.in",
        "docs": ["Aadhaar Card", "Land records or tenancy agreement", "Bank passbook", "Sowing certificate from Patwari"],
        "steps": [
            "Visit pmfby.gov.in or nearest bank/CSC before Kharif/Rabi cut-off date",
            "Fill insurance form with crop, area, and bank details",
            "Pay nominal premium (2% for Kharif, 1.5% for Rabi, 5% for commercial/horticulture)",
            "Get policy certificate from bank or CSC",
            "Claim within 72 hours of crop loss via app or helpline 14447"
        ]
    },
    {
        "name": "Kisan Credit Card (KCC)",
        "benefit": "Short-term credit up to Rs 3 lakh at 4% interest (with subsidy)",
        "eligibility": "Farmers, sharecroppers, oral lessees, tenant farmers",
        "portal": "https://www.india.gov.in/spotlight/kisan-credit-card",
        "docs": ["Aadhaar Card", "Land records", "Passport-size photos", "Bank account details"],
        "steps": [
            "Visit nearest bank branch (SBI, PNB, cooperatives, RRBs)",
            "Fill KCC application form available at branch or bankofbaroda.in/kkc",
            "Submit land records and identity proof",
            "Bank verifies land holding and issues KCC within 14 days",
            "Use KCC for purchasing seeds, fertilizers, equipment"
        ]
    },
    {
        "name": "PM Kisan Maandhan Yojana (PM-KMY)",
        "benefit": "Rs 3,000/month pension after age 60 — minimum assured pension",
        "eligibility": "Small & marginal farmers aged 18-40 with up to 2 hectares land",
        "portal": "https://pmkmy.gov.in",
        "docs": ["Aadhaar Card", "Bank passbook", "Land records"],
        "steps": [
            "Visit nearest CSC (Common Service Centre) with required documents",
            "CSC operator will register you on pmkmy.gov.in portal",
            "Monthly contribution deducted from PM-KISAN installment automatically",
            "Receive pension certificate after enrollment"
        ]
    },
    {
        "name": "Soil Health Card Scheme",
        "benefit": "Free soil testing and fertilizer recommendations for your land",
        "eligibility": "All farmers across India",
        "portal": "https://soilhealth.dac.gov.in",
        "docs": ["Aadhaar Card", "Land records or field location details"],
        "steps": [
            "Contact local Agriculture Department or Krishi Vigyan Kendra (KVK)",
            "Submit soil sample from your field",
            "Receive Soil Health Card within 2-3 weeks via mobile/post",
            "Follow fertilizer and nutrient recommendations on the card"
        ]
    },
    {
        "name": "Pradhan Mantri Krishi Sinchayee Yojana (PMKSY)",
        "benefit": "Micro-irrigation subsidies (50-90% subsidy on drip/sprinkler systems)",
        "eligibility": "All farmers, priority to small & marginal farmers",
        "portal": "https://pmksy.gov.in",
        "docs": ["Aadhaar Card", "Land records", "Bank account"],
        "steps": [
            "Visit state agriculture department or pmksy.gov.in",
            "Apply for micro-irrigation subsidy online or at block office",
            "Get field inspection done by agriculture officer",
            "Receive subsidy directly to bank account after installation"
        ]
    },
    {
        "name": "eNAM — National Agriculture Market",
        "benefit": "Online platform to sell crops directly at best market prices",
        "eligibility": "All farmers with registered produce",
        "portal": "https://enam.gov.in",
        "docs": ["Aadhaar Card", "Bank account", "Registered at nearest APMC/mandi"],
        "steps": [
            "Visit enam.gov.in and register as farmer with Aadhaar",
            "List your produce on the platform with quantity and quality",
            "Receive bids from traders across the country",
            "Deliver produce to nearest eNAM-integrated mandi",
            "Payment credited to bank account within 24-48 hours"
        ]
    },
    {
        "name": "Rashtriya Krishi Vikas Yojana (RKVY)",
        "benefit": "Grants for agriculture infrastructure, storage, processing units",
        "eligibility": "Farmer groups, FPOs, state government projects",
        "portal": "https://rkvy.nic.in",
        "docs": ["Project proposal", "Land records", "FPO/group registration certificate"],
        "steps": [
            "Approach district agriculture office or state RKVY nodal officer",
            "Submit project proposal for agriculture development activity",
            "After approval, grant released in installments",
            "Submit utilization certificate after project completion"
        ]
    },
]

GENERAL_DOCS = [
    "Aadhaar Card (linked with active mobile number)",
    "Savings Bank Account Passbook with IFSC code",
    "Proof of Residence / Domicile Certificate",
    "Income Certificate issued by competent authority",
    "Category / Caste Certificate (if SC/ST/OBC/EWS)",
]

GENERAL_STEPS = [
    "Visit the official portal or your local Common Service Centre (CSC).",
    "Fill out the online application form with your personal and income details.",
    "Upload verified copies of the required document checklist.",
    "Submit and note your Application / Reference Number for status tracking.",
]


def get_relevant_schemes(profile, top_n=8):
    """Return curated scheme list filtered for the user's profile."""
    # For farmers, return all farmer schemes
    if profile and profile.occupation and profile.occupation.lower() in ("farmer", "kisan"):
        return FARMER_SCHEMES[:top_n]
    # Default — return first N general schemes
    return FARMER_SCHEMES[:4]


class CounselorGuidanceAgent:
    """
    Day 13: Counselor & Guidance Agent.
    Handles three intents:
      - scheme_query  : single best-match scheme result
      - list_schemes  : numbered list of all relevant schemes for profile
      - apply_info    : step-by-step application procedure for top scheme
      - followup      : contextual follow-up answer
    """

    def _clean_scheme_name(self, name: str) -> str:
        """Strip article titles, generic web page names, ellipsis."""
        # If name looks like an article title (> 60 chars or contains "in 2026", "important", "list of")
        junk_signals = ["in 2026", "in 2025", "important government", "list of scheme",
                        "welfare scheme", "schemes of india", "top government"]
        low = name.lower()
        if any(sig in low for sig in junk_signals) or len(name) > 70:
            return None  # signal to use curated data
        return name.rstrip(" .…").strip()

    def process(self, state: AgentState) -> AgentState:
        evaluation = state.eligibility_evaluation
        profile = state.user_profile
        mode = state.retrieval_mode
        intent = state.intent

        raw_scheme = evaluation.get("top_scheme", "")
        clean_scheme = self._clean_scheme_name(raw_scheme) if raw_scheme else None
        match_score = evaluation.get("match_score", 70)
        is_eligible = evaluation.get("is_eligible", True)

        # ── Intent: list_schemes ─────────────────────────────────────
        if intent == "list_schemes":
            schemes = get_relevant_schemes(profile)
            lines = []
            for i, s in enumerate(schemes, 1):
                lines.append(
                    f"{i}. {s['name']}\n"
                    f"   Benefit: {s['benefit']}\n"
                    f"   Eligibility: {s['eligibility']}\n"
                    f"   Portal: {s['portal']}"
                )
            summary = (
                f"Based on your profile as a {profile.occupation or 'citizen'}, "
                f"here are the main government schemes you may qualify for:\n\n"
                + "\n\n".join(lines)
                + "\n\nReply with any scheme number or name to get the step-by-step application procedure."
            )
            guidance = {
                "summary": summary,
                "top_scheme": schemes[0]["name"] if schemes else "PM Kisan Samman Nidhi",
                "match_score": 85,
                "is_eligible": True,
                "matched_criteria": [f"Occupation: {profile.occupation or 'General citizen'}"],
                "unmatched_criteria": [],
                "document_checklist": GENERAL_DOCS,
                "application_steps": [],
                "citations": [{"type": "Portal", "title": s["name"], "url": s["portal"]} for s in schemes[:4]],
                "retrieval_mode": mode,
            }
            state.guidance_response = guidance
            state.final_output = guidance
            return state

        # ── Intent: apply_info ────────────────────────────────────────
        if intent == "apply_info":
            # Try to find the scheme name from conversation history or current result
            schemes = get_relevant_schemes(profile)
            # Default to first scheme (PM Kisan for farmers)
            target = schemes[0] if schemes else None

            if target:
                summary = (
                    f"Here is the step-by-step application process for {target['name']}:\n\n"
                    + "\n".join(f"{i}. {step}" for i, step in enumerate(target["steps"], 1))
                    + f"\n\nBenefit: {target['benefit']}"
                    + f"\nOfficial Portal: {target['portal']}"
                )
                docs = target["docs"]
                steps = target["steps"]
                cite_title = target["name"]
                cite_url = target["portal"]
            else:
                summary = "Please specify which scheme you want to apply for, and I will provide the detailed procedure."
                docs = GENERAL_DOCS
                steps = GENERAL_STEPS
                cite_title = "myscheme.gov.in"
                cite_url = "https://www.myscheme.gov.in"

            guidance = {
                "summary": summary,
                "top_scheme": target["name"] if target else "Government Scheme",
                "match_score": match_score,
                "is_eligible": True,
                "matched_criteria": evaluation.get("matched_criteria", ["General alignment"]),
                "unmatched_criteria": evaluation.get("unmatched_criteria", []),
                "document_checklist": docs,
                "application_steps": steps,
                "citations": [{"type": "Portal", "title": cite_title, "url": cite_url}],
                "retrieval_mode": mode,
            }
            state.guidance_response = guidance
            state.final_output = guidance
            return state

        # ── Intent: scheme_query / followup (default) ─────────────────
        # If web search returned a generic article title, fall back to curated data
        if not clean_scheme:
            schemes = get_relevant_schemes(profile)
            top = schemes[0] if schemes else None
            if top:
                clean_scheme = top["name"]
                docs = top["docs"]
                steps = top["steps"]
                citations = [{"type": "Portal", "title": top["name"], "url": top["portal"]}]
            else:
                docs = GENERAL_DOCS
                steps = GENERAL_STEPS
                citations = []
        else:
            docs = GENERAL_DOCS
            steps = GENERAL_STEPS
            # Citations from RAG/web
            citations = []
            if mode == "rag" and state.retrieved_chunks:
                for chunk in state.retrieved_chunks[:2]:
                    citations.append({
                        "type": "PDF Document",
                        "title": chunk.get("scheme_id", "").replace("_", " ").title(),
                        "filename": chunk.get("filename", ""),
                    })
            elif mode == "web_search" and state.web_search_results:
                for item in state.web_search_results[:2]:
                    url = item.get("link", "")
                    if "gov.in" in url or "nic.in" in url:  # Only cite official sources
                        citations.append({
                            "type": "Government Portal",
                            "title": item.get("title", ""),
                            "url": url,
                        })

        # Summary — plain text, no markdown, no %
        scheme_label = (clean_scheme or "").rstrip(" .…").strip()
        if len(scheme_label) > 60:
            scheme_label = scheme_label[:57] + "..."

        if is_eligible:
            summary = (
                f"Good news! Based on your profile, you are eligible for {scheme_label}. "
                f"The eligibility card below shows your match score, qualifying criteria, "
                f"required documents, and how to apply."
            )
        else:
            summary = (
                f"Based on your profile, {scheme_label} is the closest matching scheme. "
                f"Please verify the specific eligibility criteria before applying. "
                f"See the card below for full details."
            )

        guidance = {
            "summary": summary,
            "top_scheme": clean_scheme or scheme_label,
            "match_score": match_score,
            "is_eligible": is_eligible,
            "matched_criteria": evaluation.get("matched_criteria", ["General demographic alignment"]),
            "unmatched_criteria": evaluation.get("unmatched_criteria", []),
            "document_checklist": docs,
            "application_steps": steps,
            "citations": citations,
            "retrieval_mode": mode,
        }

        state.guidance_response = guidance
        state.final_output = guidance
        return state


counselor_agent = CounselorGuidanceAgent()
