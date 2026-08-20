import re
from typing import Tuple
from src.agents.state import AgentState, UserProfile

class ProfileExtractionAgent:
    """
    Day 7 & 8: Profile Extraction & Clarification Agent.
    Extracts demographic attributes from natural language queries and detects missing critical fields.
    """

    def process(self, state: AgentState) -> AgentState:
        query = state.user_query.lower()
        profile = state.user_profile or UserProfile()

        # 1. Extract Age
        age_match = re.search(r'(\d{1,2})\s*(?:years|yr|years old|age|aged)', query)
        if age_match:
            profile.age = int(age_match.group(1))

        # 2. Extract Income
        income_match = re.search(r'(\d+[\d,]*)\s*(?:lakh|lac|k|thousand|rupees|rs|per year|annual|per annum)', query)
        if income_match:
            val_str = income_match.group(1).replace(',', '')
            val = float(val_str)
            if 'lakh' in query or 'lac' in query:
                profile.income = int(val * 100000)
            elif 'k' in query or 'thousand' in query:
                profile.income = int(val * 1000)
            else:
                profile.income = int(val)

        # 3. Extract Occupation
        occupations = ["farmer", "student", "street vendor", "artisan", "unorganized worker", "trader", "senior citizen", "widow", "disabled", "craftsman"]
        for occ in occupations:
            if occ in query:
                profile.occupation = occ.title()
                break

        # 4. Extract Category (SC, ST, OBC, EWS, General)
        categories = ["sc", "st", "obc", "ews", "general"]
        for cat in categories:
            if re.search(rf'\b{cat}\b', query):
                profile.category = cat.upper()
                break

        # 5. Extract Gender
        if "woman" in query or "female" in query or "girl" in query or "mother" in query or "widow" in query:
            profile.gender = "Female"
        elif "man" in query or "male" in query or "boy" in query:
            profile.gender = "Male"

        # 6. Extract State
        states = ["odisha", "uttar pradesh", "up", "madhya pradesh", "mp", "maharashtra", "west bengal", "wb", "telangana", "rajasthan", "delhi", "bihar", "punjab", "tamil nadu", "karnataka"]
        for st in states:
            if re.search(rf'\b{st}\b', query):
                if st in ["up", "uttar pradesh"]:
                    profile.state = "Uttar Pradesh"
                elif st in ["mp", "madhya pradesh"]:
                    profile.state = "Madhya Pradesh"
                elif st in ["wb", "west bengal"]:
                    profile.state = "West Bengal"
                else:
                    profile.state = st.title()
                break

        # Day 8: Check for missing fields
        missing = []
        if not profile.state and any(w in query for w in ["state scheme", "local scheme", "pension"]):
            missing.append("state")

        profile.missing_fields = missing
        profile.is_complete = len(missing) == 0

        state.user_profile = profile

        if not profile.is_complete and "state" in missing:
            state.clarification_needed = True
            state.clarification_prompt = "To recommend state-specific schemes accurately, could you please specify which Indian state you reside in?"
        else:
            state.clarification_needed = False

        return state

profile_agent = ProfileExtractionAgent()
