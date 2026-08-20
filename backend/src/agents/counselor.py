from src.agents.state import AgentState

# Curated database of major schemes for high-quality structured guidance
SCHEME_KNOWLEDGE_BASE = {
    "krishak_durghatna": {
        "name": "Mukhyamantri Krishak Durghatna Kalyan Yojana",
        "benefit": "Financial assistance of up to Rs 5 Lakh in case of accidental death or permanent disability while working on agricultural land.",
        "eligibility": "Farmers and leaseholder agricultural laborers aged 18 to 70 years in Uttar Pradesh.",
        "portal": "https://www.myscheme.gov.in/schemes/mkdky",
        "docs": [
            "Aadhaar Card of the farmer (linked with active mobile number)",
            "Land Ownership Records (Khasra / Khatauni / Gata Number)",
            "Proof of Residence / Domicile Certificate of Uttar Pradesh",
            "Income Certificate issued by competent Revenue authority (Tehsildar)",
            "Accidental Death Report / Post-Mortem Report or Medical Disability Certificate from Government Hospital",
            "Bank Account Passbook with IFSC code for Direct Benefit Transfer (DBT)"
        ],
        "steps": [
            "🌐 ONLINE APPLICATION: Visit the official myScheme portal (myscheme.gov.in/schemes/mkdky) or UP e-District portal. Click 'Apply Online', log in with mobile OTP, fill the application form, upload scanned copies of land and medical documents, and submit.",
            "🏢 OFFLINE APPLICATION: Visit your local Tehsil office, District Magistrate (DM) office, or nearest Common Service Centre (CSC). Collect the Krishak Durghatna Kalyan form, attach verified photocopies of Aadhaar, Khasra land records, and hospital death/disability certificate, and submit to the Tehsildar within 45 days of the incident."
        ]
    },
    "pm_kisan": {
        "name": "PM Kisan Samman Nidhi (PM-KISAN)",
        "benefit": "Rs 6,000 per year direct income support transferred in 3 equal installments of Rs 2,000.",
        "eligibility": "Small and marginal farmer families with cultivable landholding up to 2 hectares.",
        "portal": "https://www.myscheme.gov.in/schemes/pm-kisan",
        "docs": [
            "Aadhaar Card (linked with active mobile number for e-KYC)",
            "Landholding Ownership Document (Khasra / Khatauni)",
            "Savings Bank Account Passbook with IFSC code (linked to Aadhaar)",
            "Domicile / State Residence Certificate"
        ],
        "steps": [
            "🌐 ONLINE APPLICATION: Visit pmkisan.gov.in or myscheme.gov.in/schemes/pm-kisan. Click 'New Farmer Registration', enter Aadhaar number, mobile number, and state. Fill land boundary details and submit after OTP e-KYC verification.",
            "🏢 OFFLINE APPLICATION: Visit the nearest Common Service Centre (CSC) or Agriculture Development Officer at your local Block/Tehsil office. Submit physical copies of Aadhaar, land Khatauni, and bank passbook for portal registration."
        ]
    },
    "pmfby": {
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "benefit": "Comprehensive crop insurance coverage against natural calamities, pests, and unseasonal weather loss.",
        "eligibility": "All farmers growing notified crops including sharecroppers and tenant farmers.",
        "portal": "https://www.myscheme.gov.in/schemes/pmfby",
        "docs": [
            "Aadhaar Card of the farmer",
            "Land Record (Khatauni) or Land Tenancy Agreement",
            "Sowing Certificate issued by Patwari / Gram Pradhan",
            "Bank Account Passbook details"
        ],
        "steps": [
            "🌐 ONLINE APPLICATION: Visit pmfby.gov.in or myscheme.gov.in/schemes/pmfby. Click 'Farmer Application', enter crop name, area, survey number, and bank details. Pay the nominal premium (1.5% to 2%) online to receive your policy receipt.",
            "🏢 OFFLINE APPLICATION: Visit your local Commercial Bank branch, Regional Rural Bank, or CSC Centre before the seasonal cut-off date. Fill the crop insurance form and submit along with your land sowing certificate."
        ]
    },
    "ayushman": {
        "name": "Ayushman Bharat PM-JAY Health Scheme",
        "benefit": "Free cashless health insurance coverage up to Rs 5 Lakh per family per year for secondary and tertiary hospital care.",
        "eligibility": "Low-income families listed under SECC database or senior citizens aged 70+.",
        "portal": "https://www.myscheme.gov.in/schemes/ab-pmjay",
        "docs": [
            "Aadhaar Card / Voter ID Card",
            "Ration Card / Family ID",
            "Active Mobile Number for OTP verification"
        ],
        "steps": [
            "🌐 ONLINE APPLICATION / VERIFICATION: Visit beneficiary.nha.gov.in or myscheme.gov.in/schemes/ab-pmjay. Enter mobile number, verify via OTP, search your family name, and generate your Ayushman Card online.",
            "🏢 OFFLINE APPLICATION: Visit the Ayushman Mitra desk at any empanelled Government/Private Hospital or nearest CSC Centre. Present your Aadhaar and Ration Card to get your physical Ayushman Card generated on the spot."
        ]
    },
    "surya_ghar": {
        "name": "PM Surya Ghar Free Electricity Solar Scheme",
        "benefit": "Subsidy up to Rs 78,000 for installing rooftop solar panels with up to 300 units of free electricity per month.",
        "eligibility": "Residential households with a suitable roof and valid electricity connection.",
        "portal": "https://www.myscheme.gov.in/schemes/pmsgmby",
        "docs": [
            "Aadhaar Card of home owner",
            "Latest Electricity Bill copy",
            "Proof of Roof Ownership / Property Tax Receipt",
            "Bank Account Passbook for subsidy credit"
        ],
        "steps": [
            "🌐 ONLINE APPLICATION: Visit pmsuryaghar.gov.in or myscheme.gov.in/schemes/pmsgmby. Register with state electricity DISCOM, enter consumer number, apply for rooftop solar installation, and select an empaneled vendor.",
            "🏢 OFFLINE APPLICATION: Visit your local Electricity DISCOM office or CSC Kendra. Submit your electricity consumer bill and Aadhaar copy to get registered for solar feasibility inspection."
        ]
    }
}

GENERAL_DOCS = [
    "Aadhaar Card (linked with active mobile number)",
    "Savings Bank Account Passbook with IFSC code",
    "Proof of Residence / Domicile Certificate",
    "Income Certificate issued by competent Tehsildar / Revenue Authority",
    "Category / Caste Certificate (if SC / ST / OBC / EWS)"
]

GENERAL_STEPS = [
    "🌐 ONLINE METHOD: Visit the official myScheme portal (www.myscheme.gov.in). Search for the scheme name, click 'Apply Online', fill out the online application form with your demographic details, upload scanned documents, and submit.",
    "🏢 OFFLINE METHOD: Visit your local Tehsil Office, Block Development Office (BDO), or nearest Common Service Centre (CSC). Obtain the physical application form, attach self-attested photocopies of your Aadhaar, income, and domicile certificates, and submit to the designated scheme officer."
]

def find_matched_kb_scheme(scheme_title: str):
    """Match scheme title against curated knowledge base."""
    if not scheme_title:
        return None
    title_low = scheme_title.lower()
    
    if "durghatna" in title_low or "kalyan yojana" in title_low or "krishak" in title_low:
        return SCHEME_KNOWLEDGE_BASE["krishak_durghatna"]
    elif "pm kisan" in title_low or "samman nidhi" in title_low:
        return SCHEME_KNOWLEDGE_BASE["pm_kisan"]
    elif "fasal bima" in title_low or "pmfby" in title_low:
        return SCHEME_KNOWLEDGE_BASE["pmfby"]
    elif "ayushman" in title_low or "health" in title_low or "pm-jay" in title_low:
        return SCHEME_KNOWLEDGE_BASE["ayushman"]
    elif "surya ghar" in title_low or "solar" in title_low:
        return SCHEME_KNOWLEDGE_BASE["surya_ghar"]
        
    return None

class CounselorGuidanceAgent:
    """
    Counselor & Guidance Agent.
    Generates simple-language scheme benefits, required documents, dual online/offline application steps,
    and exact myscheme.gov.in citation links.
    """

    def _clean_scheme_name(self, name: str) -> str:
        if not name:
            return None
        low = name.lower()
        junk_signals = ["page ", "june", "july", "august", "2026", "2025", "pdf", "download", "news", "update"]
        if any(sig in low for sig in junk_signals) or len(name) > 70:
            return None
        cleaned = name.rstrip(" .…").strip()
        return cleaned if len(cleaned) > 2 else None

    def process(self, state: AgentState) -> AgentState:
        evaluation = state.eligibility_evaluation
        profile = state.user_profile
        mode = state.retrieval_mode
        intent = state.intent

        raw_scheme = evaluation.get("top_scheme", "")
        clean_scheme = self._clean_scheme_name(raw_scheme) if raw_scheme else None
        match_score = evaluation.get("match_score", 75)
        is_eligible = evaluation.get("is_eligible", True)

        kb_match = find_matched_kb_scheme(raw_scheme or (state.user_query if state.user_query else ""))

        if kb_match:
            scheme_title = kb_match["name"]
            docs = kb_match["docs"]
            steps = kb_match["steps"]
            citations = [{
                "type": "Government Portal (myScheme)",
                "title": f"{kb_match['name']} - myScheme",
                "url": kb_match["portal"]
            }]
        elif clean_scheme:
            scheme_title = clean_scheme
            docs = GENERAL_DOCS
            steps = GENERAL_STEPS
            
            # Extract exact matching citation URL from web search results
            citations = []
            if mode == "web_search" and state.web_search_results:
                top_result = state.web_search_results[0]
                url = top_result.get("link", "https://www.myscheme.gov.in")
                title = top_result.get("title", f"{clean_scheme} - myScheme")
                citations = [{
                    "type": "Government Portal (myScheme)",
                    "title": title,
                    "url": url if "myscheme.gov.in" in url else "https://www.myscheme.gov.in"
                }]
            elif mode == "rag" and state.retrieved_chunks:
                top_chunk = state.retrieved_chunks[0]
                citations = [{
                    "type": "Official Policy Document",
                    "title": top_chunk.get("scheme_id", "").replace("_", " ").title(),
                    "url": "https://www.myscheme.gov.in"
                }]
            else:
                citations = [{
                    "type": "Government Portal (myScheme)",
                    "title": f"{clean_scheme} - myScheme",
                    "url": "https://www.myscheme.gov.in"
                }]
        else:
            # Fallback for general query
            default_kb = SCHEME_KNOWLEDGE_BASE["krishak_durghatna"] if (profile.occupation and "farm" in profile.occupation.lower()) else SCHEME_KNOWLEDGE_BASE["pm_kisan"]
            scheme_title = default_kb["name"]
            docs = default_kb["docs"]
            steps = default_kb["steps"]
            citations = [{
                "type": "Government Portal (myScheme)",
                "title": f"{default_kb['name']} - myScheme",
                "url": default_kb["portal"]
            }]

        # Summary in simple language
        if is_eligible:
            summary = (
                f"Good news! Based on your profile, you are eligible for {scheme_title}. "
                f"Below you will find the required documents, simple step-by-step application instructions "
                f"(both Online & Offline), and the official myScheme portal link."
            )
        else:
            summary = (
                f"Based on your profile, {scheme_title} is the closest matching scheme. "
                f"Please review the document requirements and application steps below."
            )

        guidance = {
            "summary": summary,
            "top_scheme": scheme_title,
            "match_score": match_score,
            "is_eligible": is_eligible,
            "matched_criteria": evaluation.get("matched_criteria", ["Demographic alignment met"]),
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
