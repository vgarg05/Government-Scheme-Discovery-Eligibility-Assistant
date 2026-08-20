import sys
sys.path.insert(0, 'backend')

from src.agents.orchestrator import orchestrator

prompt = "I am a 45 year old farmer from Uttar Pradesh with annual income of Rs 80,000"
print(f"--- TESTING PIPELINE WITH PROMPT: '{prompt}' ---")

result = orchestrator.run(prompt)
final = result.get("final_output", {})

print("\n--- SUMMARY OUTPUT ---")
print(final.get("summary"))

print("\n--- TOP SCHEME ---")
print(final.get("top_scheme"))

print("\n--- MATCH SCORE ---")
print(final.get("match_score"))

print("\n--- MATCHED CRITERIA ---")
for m in final.get("matched_criteria", []):
    print("  ✅", m)

print("\n--- UNMATCHED / VERIFY CRITERIA ---")
for u in final.get("unmatched_criteria", []):
    print("  ⚠️", u)

print("\n--- RECOMMENDED CAROUSEL CARDS ---")
cards = final.get("scheme_cards", [])
print(f"Total Cards: {len(cards)}")
for i, c in enumerate(cards, 1):
    print(f"  {i}. {c['name']} (Key: {c['scheme_key']})")
    print(f"     Desc: {c['short_desc']}")
    print(f"     Highlights: {c['highlights']}")
