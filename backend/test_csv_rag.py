import os
import sys

# Ensure UTF-8 output encoding for Windows terminal
sys.stdout.reconfigure(encoding='utf-8')

from src.tools.vector_tool import vector_tool

queries = [
    "fishermen relief Puducherry",
    "AICTE short term training sfurti",
    "Burial and Ex-gratia Payment Scheme death of unregistered laborer",
    "Garuda Scheme for Funeral Expenses Andhra Pradesh Brahmin",
    "Intra Caste Marriage Scheduled Tribe Karnataka",
    "Incentive Scheme for MSMEs in Powerloom Sector West Bengal",
    "Indira Mahila Shakti Udyam Protsahan Yojana Rajasthan",
    "Mukhyamantri Shramik Aujaar Sahayata Yojana Chhattisgarh",
    "Pre-Matric Scholarship for Backward Class Students Madhya Pradesh"
]

print("=== TESTING RAG RETRIEVAL WITH 3,400 SCHEMES (updated_data.csv) ===")
for q in queries:
    res = vector_tool.search_schemes(q, top_k=2)
    print(f"\nQUERY: '{q}'")
    print(f"  - Success: {res['success']}")
    print(f"  - Max Similarity Score: {res['max_similarity_score']}")
    if res['results']:
        top = res['results'][0]
        print(f"  - Top Matched Scheme: {top.get('title')}")
        print(f"  - Category: {top.get('category')} | Level: {top.get('level')}")
        print(f"  - URL: {top.get('url')}")
        print(f"  - Snippet: {top.get('content', '')[:120]}...")
