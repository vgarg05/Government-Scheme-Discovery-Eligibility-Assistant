import sys
import os
import json

# Force UTF-8 encoding for Windows console
sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
sys.path.append(BASE_DIR)

from src.agents.state import AgentState, UserProfile
from src.agents.profile_agent import profile_agent
from src.agents.rag_agent import rag_agent
from src.agents.router_agent import router_agent
from src.agents.eligibility import eligibility_agent
from src.agents.counselor import counselor_agent

print("==================================================")
print("   VERIFYING END-TO-END RAG PIPELINE FLOW (3,400 SCHEMES)")
print("==================================================\n")

test_query = "I am a 68 year old fisherman living in Puducherry."

print(f"INPUT USER QUERY: '{test_query}'\n")

# Step 1: Initial State
state = AgentState(user_query=test_query)
print("[STEP 1] AgentState Initialized.")

# Step 2: Profile Extraction Agent
print("[STEP 2] Running ProfileExtractionAgent...")
state = profile_agent.process(state)
print(f"  - Extracted Profile: Age={state.user_profile.age}, State={state.user_profile.state}, Occupation={state.user_profile.occupation}")
print(f"  - Profile Complete: {state.user_profile.is_complete}\n")

# Step 3: RAG Retrieval Agent
print("[STEP 3] Running RAGRetrievalAgent (ChromaDB 3,400 Schemes)...")
state = rag_agent.process(state)
print(f"  - Retrieved Chunks Count: {len(state.retrieved_chunks)}")
print(f"  - Max Similarity Score: {state.max_similarity_score}")
if state.retrieved_chunks:
    top = state.retrieved_chunks[0]
    print(f"  - Top Scheme Title: {top.get('title')}")
    print(f"  - Top Scheme URL: {top.get('url')}\n")

# Step 4: Router Agent
print("[STEP 4] Running RouterAgent...")
state = router_agent.process(state)
print(f"  - Selected Retrieval Mode: {state.retrieval_mode}\n")

# Step 5: Eligibility Adjudicator Agent
print("[STEP 5] Running EligibilityAdjudicatorAgent...")
state = eligibility_agent.process(state)
eval_res = state.eligibility_evaluation
print(f"  - Target Scheme: {eval_res.get('target_scheme')}")
print(f"  - Is Eligible: {eval_res.get('is_eligible')}")
print(f"  - Match Score: {eval_res.get('match_score')}%")
print(f"  - Matched Criteria: {eval_res.get('matched_criteria')}")
print(f"  - Unmatched Criteria: {eval_res.get('unmatched_criteria')}\n")

# Step 6: Counselor Agent
print("[STEP 6] Running CounselorAgent...")
state = counselor_agent.process(state)
output = state.final_output
print(f"  - Summary Generated: {output.get('summary')[:120]}...")
print(f"  - Document Checklist: {output.get('document_checklist')}")
print(f"  - Application Process Steps: {output.get('application_process')[:2] if output.get('application_process') else []}")
print(f"  - Citations/URLs: {output.get('citations')}\n")

print("==================================================")
print("   FLOW VERIFICATION COMPLETED SUCCESSFULLY!  ")
print("==================================================")
