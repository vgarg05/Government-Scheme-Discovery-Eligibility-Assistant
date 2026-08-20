from src.agents.state import AgentState

def clean_url(url: str) -> str:
    """Ensure clean URL without trailing semicolons or punctuation."""
    if not url:
        return "https://www.myscheme.gov.in"
    return url.strip().rstrip(";").rstrip(".").rstrip(",")

# Curated database of major schemes with exact verified myScheme portal URLs and point-by-point steps
SCHEME_KNOWLEDGE_BASE = {
    "krishak_durghatna": {
        "name": "Mukhyamantri Krishak Durghatna Kalyan Yojana",
        "benefit": "Financial assistance of up to Rs 5 Lakh in case of accidental death or permanent disability while working on agricultural land.",
        "eligibility": "Farmers and leaseholder agricultural laborers aged 18 to 70 years in Uttar Pradesh.",
        "portal": "https://www.myscheme.gov.in/schemes/kdky",
        "docs": [
            "Aadhaar Card of the farmer (linked with active mobile number)",
            "Land Ownership Records (Khasra / Khatauni / Gata Number)",
            "Proof of Residence / Domicile Certificate of Uttar Pradesh",
            "Income Certificate issued by competent Revenue authority (Tehsildar)",
            "Accidental Death Report / Post-Mortem Report or Medical Disability Certificate from Government Hospital",
            "Bank Account Passbook with IFSC code for Direct Benefit Transfer (DBT)"
        ],
        "steps": [
            "🌐 ONLINE METHOD — Step 1: Visit the official portal (www.myscheme.gov.in/schemes/kdky) or UP e-District portal.",
            "🌐 ONLINE METHOD — Step 2: Click 'Apply Online' and log in using your registered mobile number and OTP.",
            "🌐 ONLINE METHOD — Step 3: Fill out the digital application form with personal, land, and bank account details.",
            "🌐 ONLINE METHOD — Step 4: Upload scanned copies of Aadhaar, Khasra land records, and hospital medical certificate, then click Submit.",
            "🏢 OFFLINE METHOD — Step 1: Visit your local Tehsil Office, District Magistrate (DM) office, or nearest Common Service Centre (CSC).",
            "🏢 OFFLINE METHOD — Step 2: Collect the physical Krishak Durghatna Kalyan application form from the Revenue Officer.",
            "🏢 OFFLINE METHOD — Step 3: Attach self-attested photocopies of Aadhaar, Khasra land records, and hospital death/disability report.",
            "🏢 OFFLINE METHOD — Step 4: Submit the completed form to the Tehsildar within 45 days of the incident to receive your tracking receipt."
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
            "🌐 ONLINE METHOD — Step 1: Visit pmkisan.gov.in or myscheme.gov.in/schemes/pm-kisan portal.",
            "🌐 ONLINE METHOD — Step 2: Click on 'Farmers Corner' → 'New Farmer Registration'.",
            "🌐 ONLINE METHOD — Step 3: Enter your Aadhaar number, active mobile number, state, and land survey details.",
            "🌐 ONLINE METHOD — Step 4: Complete OTP e-KYC verification and submit the online application.",
            "🏢 OFFLINE METHOD — Step 1: Visit your local Block Development Office (BDO), Tehsil, or nearest CSC Centre.",
            "🏢 OFFLINE METHOD — Step 2: Submit physical photocopies of your Aadhaar card, land Khatauni passbook, and bank details.",
            "🏢 OFFLINE METHOD — Step 3: The Agriculture Nodal Officer will verify your land documents and register your profile on the PM-KISAN portal."
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
            "🌐 ONLINE METHOD — Step 1: Visit pmfby.gov.in or myscheme.gov.in/schemes/pmfby portal.",
            "🌐 ONLINE METHOD — Step 2: Click 'Farmer Application' and log in with your mobile number.",
            "🌐 ONLINE METHOD — Step 3: Enter crop details, land survey number, area sown, and bank account info.",
            "🌐 ONLINE METHOD — Step 4: Pay nominal premium (1.5% to 2%) via net banking/UPI to download your policy receipt.",
            "🏢 OFFLINE METHOD — Step 1: Visit your local Commercial Bank branch, Cooperative Bank, or nearest CSC Centre before cut-off date.",
            "🏢 OFFLINE METHOD — Step 2: Fill the crop insurance application form and attach land sowing certificate and bank passbook copy.",
            "🏢 OFFLINE METHOD — Step 3: Pay the premium in cash/cheque at bank counter and collect the stamped insurance acknowledgment."
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
            "🌐 ONLINE METHOD — Step 1: Visit beneficiary.nha.gov.in or myscheme.gov.in/schemes/ab-pmjay portal.",
            "🌐 ONLINE METHOD — Step 2: Enter your mobile number, verify with OTP, and search your family name.",
            "🌐 ONLINE METHOD — Step 3: Complete e-KYC using Aadhaar OTP or facial authentication.",
            "🌐 ONLINE METHOD — Step 4: Download your digital Ayushman Card directly to your mobile phone.",
            "🏢 OFFLINE METHOD — Step 1: Visit the Ayushman Mitra desk at any empanelled Government or Private Hospital.",
            "🏢 OFFLINE METHOD — Step 2: Present your physical Aadhaar Card and Ration Card to the Ayushman Mitra representative.",
            "🏢 OFFLINE METHOD — Step 3: Get your biometric e-KYC verified on-site and receive your printed Ayushman PVC Card."
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
            "🌐 ONLINE METHOD — Step 1: Visit pmsuryaghar.gov.in or myscheme.gov.in/schemes/pmsgmby portal.",
            "🌐 ONLINE METHOD — Step 2: Register with your State Electricity DISCOM and consumer account number.",
            "🌐 ONLINE METHOD — Step 3: Apply for rooftop solar installation and select an empaneled vendor.",
            "🌐 ONLINE METHOD — Step 4: After vendor installation, submit net-metering application to receive subsidy direct to bank.",
            "🏢 OFFLINE METHOD — Step 1: Visit your local Electricity DISCOM divisional office or CSC Kendra.",
            "🏢 OFFLINE METHOD — Step 2: Submit physical application form along with latest electricity bill and roof ownership document.",
            "🏢 OFFLINE METHOD — Step 3: DISCOM engineers inspect roof feasibility and assist with offline vendor allocation."
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
    "🌐 ONLINE METHOD — Step 1: Visit the official myScheme portal (www.myscheme.gov.in) and search for the scheme name.",
    "🌐 ONLINE METHOD — Step 2: Click 'Apply Online', log in using your mobile number and OTP.",
    "🌐 ONLINE METHOD — Step 3: Fill out the online application form with your personal and income details.",
    "🌐 ONLINE METHOD — Step 4: Upload scanned copies of required documents and click Submit to get reference tracking number.",
    "🏢 OFFLINE METHOD — Step 1: Visit your local Tehsil Office, Block Development Office (BDO), or nearest Common Service Centre (CSC).",
    "🏢 OFFLINE METHOD — Step 2: Collect the physical application form from the designated nodal officer.",
    "🏢 OFFLINE METHOD — Step 3: Attach self-attested photocopies of Aadhaar, income, and domicile certificates.",
    "🏢 OFFLINE METHOD — Step 4: Submit the completed form to the office counter and retain the acknowledgment receipt."
]

def find_matched_kb_scheme(scheme_title: str):
    """Match scheme title against curated knowledge base."""
    if not scheme_title:
        return None
    title_low = scheme_title.lower()
    
    if "durghatna" in title_low or "kdky" in title_low or "krishak" in title_low:
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
    Generates simple-language scheme benefits, required documents, point-by-point online & offline application steps,
    and exact clean myscheme.gov.in citation links.
    """

    def _clean_scheme_name(self, name: str) -> str:
        if not name:
            return None
        low = name.lower()
        junk_signals = ["page ", "june", "july", "august", "2026", "2025", "pdf", "download", "news", "update", "enter scheme name"]
        if any(sig in low for sig in junk_signals) or len(name) > 70:
            return None
        cleaned = name.rstrip(" .…").strip()
        return cleaned if len(cleaned) > 2 else None

    def process(self, state: AgentState) -> AgentState:
        evaluation = state.eligibility_evaluation
        profile = state.user_profile
        mode = state.retrieval_mode

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
                "url": clean_url(kb_match["portal"])
            }]
        elif clean_scheme:
            scheme_title = clean_scheme
            docs = GENERAL_DOCS
            steps = GENERAL_STEPS
            
            # Extract exact matching citation URL from web search results
            citations = []
            if mode == "web_search" and state.web_search_results:
                scheme_results = [r for r in state.web_search_results if "/schemes/" in r.get("link", "")]
                target_result = scheme_results[0] if scheme_results else state.web_search_results[0]
                
                raw_url = target_result.get("link", "https://www.myscheme.gov.in")
                target_url = clean_url(raw_url)
                title = target_result.get("title", f"{clean_scheme} - myScheme")
                if "Enter scheme name" in title:
                    title = f"{clean_scheme} - myScheme"

                citations = [{
                    "type": "Government Portal (myScheme)",
                    "title": title,
                    "url": target_url
                }]
            else:
                citations = [{
                    "type": "Government Portal (myScheme)",
                    "title": f"{clean_scheme} - myScheme",
                    "url": "https://www.myscheme.gov.in"
                }]
        else:
            default_kb = SCHEME_KNOWLEDGE_BASE["krishak_durghatna"] if (profile.occupation and "farm" in profile.occupation.lower()) else SCHEME_KNOWLEDGE_BASE["pm_kisan"]
            scheme_title = default_kb["name"]
            docs = default_kb["docs"]
            steps = default_kb["steps"]
            citations = [{
                "type": "Government Portal (myScheme)",
                "title": f"{default_kb['name']} - myScheme",
                "url": clean_url(default_kb["portal"])
            }]

        if is_eligible:
            summary = (
                f"Good news! Based on your profile, you are eligible for {scheme_title}. "
                f"Below you will find the required documents, simple point-by-point application steps "
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
