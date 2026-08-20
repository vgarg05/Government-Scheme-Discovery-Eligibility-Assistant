import sys
sys.path.insert(0, 'backend')

from src.agents.orchestrator import orchestrator

history = [
    {
        "role": "user",
        "content": "I am a 45 year old farmer from Uttar Pradesh with annual income of Rs 80,000",
        "profile_snapshot": {"age": 45, "income": 80000, "occupation": "Farmer", "state": "Uttar Pradesh"}
    }
]

prompt = "Tell me full details about Uttar Pradesh Old Age Pension Scheme"
print(f"--- TESTING DISQUALIFICATION EVALUATION FOR: '{prompt}' ---")

result_state = orchestrator.run(prompt, conversation_history=history)
final = result_state.final_output or {}

print("\n--- SUMMARY OUTPUT ---")
print(final.get("summary"))

print("\n--- MATCH SCORE ---")
print(final.get("match_score"))

print("\n--- IS ELIGIBLE ---")
print(final.get("is_eligible"))

print("\n--- MATCHED CRITERIA ---")
for m in final.get("matched_criteria", []):
    print("  ✅", m)

print("\n--- UNMATCHED / DISQUALIFICATION CRITERIA ---")
for u in final.get("unmatched_criteria", []):
    print("  ⚠️", u)
