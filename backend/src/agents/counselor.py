from src.agents.state import AgentState

def clean_url(url: str) -> str:
    """Ensure clean URL without trailing semicolons or punctuation."""
    if not url:
        return "https://www.myscheme.gov.in"
    return url.strip().rstrip(";").rstrip(".").rstrip(",")

# Curated database of major schemes with exact verified myScheme portal URLs, simple benefits, docs, and steps
SCHEME_KNOWLEDGE_BASE = {
    "krishak_durghatna": {
        "name": "Mukhyamantri Krishak Durghatna Kalyan Yojana",
        "benefits": [
            "Financial compensation of up to Rs 5,00,000 (5 Lakh) in case of accidental death while working on agricultural land.",
            "Financial assistance of Rs 5,00,000 for 100% permanent disability (loss of both hands, both feet, or both eyes).",
            "Financial assistance ranging from Rs 1,00,000 to Rs 2,50,000 for partial permanent disability (loss of one limb or one eye).",
            "Direct Bank Transfer (DBT) credit directly into the bank account of the farmer or legal nominee."
        ],
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
            "🌐 ONLINE METHOD",
            "Visit the official portal (www.myscheme.gov.in/schemes/kdky) or UP e-District portal.",
            "Click 'Apply Online' and log in using your registered mobile number and OTP.",
            "Fill out the digital application form with personal, land, and bank account details.",
            "Upload scanned copies of Aadhaar, Khasra land records, and hospital medical certificate, then click Submit.",
            "🏢 OFFLINE METHOD",
            "Visit your local Tehsil Office, District Magistrate (DM) office, or nearest Common Service Centre (CSC).",
            "Collect the physical Krishak Durghatna Kalyan application form from the Revenue Officer.",
            "Attach self-attested photocopies of Aadhaar, Khasra land records, and hospital death/disability report.",
            "Submit the completed form to the Tehsildar within 45 days of the incident to receive your tracking receipt."
        ]
    },
    "pm_kisan": {
        "name": "PM Kisan Samman Nidhi (PM-KISAN)",
        "benefits": [
            "Direct income support of Rs 6,000 per year for all landholding farmer families.",
            "Transferred directly into bank accounts in 3 equal installments of Rs 2,000 every 4 months.",
            "100% Central Sector Scheme with Direct Benefit Transfer (DBT) through Aadhaar payment bridge."
        ],
        "eligibility": "Small and marginal farmer families with cultivable landholding up to 2 hectares.",
        "portal": "https://www.myscheme.gov.in/schemes/pm-kisan",
        "docs": [
            "Aadhaar Card (linked with active mobile number for e-KYC)",
            "Landholding Ownership Document (Khasra / Khatauni)",
            "Savings Bank Account Passbook with IFSC code (linked to Aadhaar)",
            "Domicile / State Residence Certificate"
        ],
        "steps": [
            "🌐 ONLINE METHOD",
            "Visit pmkisan.gov.in or myscheme.gov.in/schemes/pm-kisan portal.",
            "Click on 'Farmers Corner' → 'New Farmer Registration'.",
            "Enter your Aadhaar number, active mobile number, state, and land survey details.",
            "Complete OTP e-KYC verification and submit the online application.",
            "🏢 OFFLINE METHOD",
            "Visit your local Block Development Office (BDO), Tehsil, or nearest CSC Centre.",
            "Submit physical photocopies of your Aadhaar card, land Khatauni passbook, and bank details.",
            "The Agriculture Nodal Officer will verify your land documents and register your profile on the PM-KISAN portal."
        ]
    },
    "pmfby": {
        "name": "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
        "benefits": [
            "Insurance cover against non-preventable natural risks (drought, flood, unseasonal rainfall, pests, diseases).",
            "Low farmer premium rates: 2% for Kharif crops, 1.5% for Rabi crops, and 5% for commercial/horticulture crops.",
            "Claim settlement credited directly to the farmer's bank account."
        ],
        "eligibility": "All farmers growing notified crops including sharecroppers and tenant farmers.",
        "portal": "https://www.myscheme.gov.in/schemes/pmfby",
        "docs": [
            "Aadhaar Card of the farmer",
            "Land Record (Khatauni) or Land Tenancy Agreement",
            "Sowing Certificate issued by Patwari / Gram Pradhan",
            "Bank Account Passbook details"
        ],
        "steps": [
            "🌐 ONLINE METHOD",
            "Visit pmfby.gov.in or myscheme.gov.in/schemes/pmfby portal.",
            "Click 'Farmer Application' and log in with your mobile number.",
            "Enter crop details, land survey number, area sown, and bank account info.",
            "Pay nominal premium (1.5% to 2%) via net banking/UPI to download your policy receipt.",
            "🏢 OFFLINE METHOD",
            "Visit your local Commercial Bank branch, Cooperative Bank, or nearest CSC Centre before cut-off date.",
            "Fill the crop insurance application form and attach land sowing certificate and bank passbook copy.",
            "Pay the premium in cash/cheque at bank counter and collect the stamped insurance acknowledgment."
        ]
    },
    "ayushman": {
        "name": "Ayushman Bharat PM-JAY Health Scheme",
        "benefits": [
            "Free cashless health insurance coverage up to Rs 5,00,000 (5 Lakh) per family per year.",
            "Covers pre-hospitalization, hospitalization, surgeries, diagnostics, and medicines across empanelled government and private hospitals.",
            "No restriction on family size, age, or gender."
        ],
        "eligibility": "Low-income families listed under SECC database or senior citizens aged 70+.",
        "portal": "https://www.myscheme.gov.in/schemes/ab-pmjay",
        "docs": [
            "Aadhaar Card / Voter ID Card",
            "Ration Card / Family ID",
            "Active Mobile Number for OTP verification"
        ],
        "steps": [
            "🌐 ONLINE METHOD",
            "Visit beneficiary.nha.gov.in or myscheme.gov.in/schemes/ab-pmjay portal.",
            "Enter your mobile number, verify with OTP, and search your family name.",
            "Complete e-KYC using Aadhaar OTP or facial authentication.",
            "Download your digital Ayushman Card directly to your mobile phone.",
            "🏢 OFFLINE METHOD",
            "Visit the Ayushman Mitra desk at any empanelled Government or Private Hospital.",
            "Present your physical Aadhaar Card and Ration Card to the Ayushman Mitra representative.",
            "Get your biometric e-KYC verified on-site and receive your printed Ayushman PVC Card."
        ]
    },
    "surya_ghar": {
        "name": "PM Surya Ghar Free Electricity Solar Scheme",
        "benefits": [
            "Subsidy up to Rs 78,000 for installing rooftop solar systems.",
            "Up to 300 units of free electricity every month for the household.",
            "Earn extra income by selling surplus electricity back to the DISCOM grid."
        ],
        "eligibility": "Residential households with a suitable roof and valid electricity connection.",
        "portal": "https://www.myscheme.gov.in/schemes/pmsgmby",
        "docs": [
            "Aadhaar Card of home owner",
            "Latest Electricity Bill copy",
            "Proof of Roof Ownership / Property Tax Receipt",
            "Bank Account Passbook for subsidy credit"
        ],
        "steps": [
            "🌐 ONLINE METHOD",
            "Visit pmsuryaghar.gov.in or myscheme.gov.in/schemes/pmsgmby portal.",
            "Register with your State Electricity DISCOM and consumer account number.",
            "Apply for rooftop solar installation and select an empaneled vendor.",
            "After vendor installation, submit net-metering application to receive subsidy direct to bank.",
            "🏢 OFFLINE METHOD",
            "Visit your local Electricity DISCOM divisional office or CSC Kendra.",
            "Submit physical application form along with latest electricity bill and roof ownership document.",
            "DISCOM engineers inspect roof feasibility and assist with offline vendor allocation."
        ]
    }
}

GENERAL_BENEFITS = [
    "Financial assistance and financial security provided directly by the Government of India / State Government.",
    "Direct Benefit Transfer (DBT) directly into the applicant's verified Aadhaar-linked bank account.",
    "Transparent processing with online application status tracking."
]

GENERAL_DOCS = [
    "Aadhaar Card (linked with active mobile number)",
    "Savings Bank Account Passbook with IFSC code",
    "Proof of Residence / Domicile Certificate",
    "Income Certificate issued by competent Tehsildar / Revenue Authority",
    "Category / Caste Certificate (if SC / ST / OBC / EWS)"
]

GENERAL_STEPS = [
    "🌐 ONLINE METHOD",
    "Visit the official myScheme portal (www.myscheme.gov.in) and search for the scheme name.",
    "Click 'Apply Online', log in using your mobile number and OTP.",
    "Fill out the online application form with your personal and income details.",
    "Upload scanned copies of required documents and click Submit to get reference tracking number.",
    "🏢 OFFLINE METHOD",
    "Visit your local Tehsil Office, Block Development Office (BDO), or nearest Common Service Centre (CSC).",
    "Collect the physical application form from the designated nodal officer.",
    "Attach self-attested photocopies of Aadhaar, income, and domicile certificates.",
    "Submit the completed form to the office counter and retain the acknowledgment receipt."
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
    Generates dynamic summary messages breaking down held eligibility criteria vs criteria to verify,
    followed by a call-to-action asking for missing details.
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
            benefits = kb_match["benefits"]
            docs = kb_match["docs"]
            steps = kb_match["steps"]
            citations = [{
                "type": "Government Portal (myScheme)",
                "title": f"{kb_match['name']} - myScheme",
                "url": clean_url(kb_match["portal"])
            }]
        elif clean_scheme:
            scheme_title = clean_scheme
            benefits = GENERAL_BENEFITS
            docs = GENERAL_DOCS
            steps = GENERAL_STEPS
            
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
                
                snippet = target_result.get("snippet", "")
                if snippet and len(snippet) > 20:
                    benefits = [snippet]
            else:
                citations = [{
                    "type": "Government Portal (myScheme)",
                    "title": f"{clean_scheme} - myScheme",
                    "url": "https://www.myscheme.gov.in"
                }]
        else:
            default_kb = SCHEME_KNOWLEDGE_BASE["krishak_durghatna"] if (profile.occupation and "farm" in profile.occupation.lower()) else SCHEME_KNOWLEDGE_BASE["pm_kisan"]
            scheme_title = default_kb["name"]
            benefits = default_kb["benefits"]
            docs = default_kb["docs"]
            steps = default_kb["steps"]
            citations = [{
                "type": "Government Portal (myScheme)",
                "title": f"{default_kb['name']} - myScheme",
                "url": clean_url(default_kb["portal"])
            }]

        # ── Formulate Criteria Breakdown & Call-to-Action ──
        matched_items = evaluation.get("matched_criteria", ["Demographic profile alignment"])
        verify_items = evaluation.get("unmatched_criteria", [])

        matched_text = ", ".join(matched_items)
        
        if verify_items:
            verify_text = ", ".join(verify_items)
            summary = (
                f"Good news! Based on the details provided, you match the primary requirements for **{scheme_title}**.\n\n"
                f"✅ **Criteria You Currently Hold**: {matched_text}\n"
                f"⚠️ **Criteria We Need to Check**: {verify_text}\n\n"
                f"👇 **Please share your details for ({verify_text})**, and I will confirm whether you qualify or not!"
            )
        else:
            summary = (
                f"Great news! Based on your profile, you hold full eligibility for **{scheme_title}**.\n\n"
                f"✅ **Criteria You Currently Hold**: {matched_text}\n"
                f"✓ **Disqualifiers Check**: No disqualifiers found.\n\n"
                f"👇 If you'd like me to double-check any specific condition (like your exact landholding size or income certificate limit), please share your details below and I will verify it for you!"
            )

        guidance = {
            "summary": summary,
            "top_scheme": scheme_title,
            "match_score": match_score,
            "is_eligible": is_eligible,
            "matched_criteria": matched_items,
            "unmatched_criteria": verify_items if verify_items else ["No disqualifiers found"],
            "benefits": benefits,
            "document_checklist": docs,
            "application_steps": steps,
            "citations": citations,
            "retrieval_mode": mode,
        }

        state.guidance_response = guidance
        state.final_output = guidance
        return state

counselor_agent = CounselorGuidanceAgent()
