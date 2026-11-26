import os
import re
import glob
import pandas as pd
import chromadb
from chromadb.utils import embedding_functions
from src.utils.config import settings

def load_csv_documents(csv_path: str):
    """
    Parses updated_data.csv containing 3,400 central/state government schemes
    and constructs structured document records.
    """
    if not os.path.exists(csv_path):
        print(f"[ERROR] CSV file not found at '{csv_path}'")
        return []

    print(f"[LOAD] Reading CSV data from '{csv_path}'...")
    try:
        df = pd.read_csv(csv_path, encoding="utf-8")
    except Exception as e:
        print(f"[ERROR] Reading CSV with utf-8 failed: {e}. Trying latin-1 encoding.")
        df = pd.read_csv(csv_path, encoding="latin-1")

    df = df.fillna("")
    documents = []

    for index, row in df.iterrows():
        scheme_name = str(row.get("scheme_name", "")).strip()
        slug = str(row.get("slug", "")).strip()
        details = str(row.get("details", "")).strip()
        benefits = str(row.get("benefits", "")).strip()
        eligibility = str(row.get("eligibility", "")).strip()
        application = str(row.get("application", "")).strip()
        documents_req = str(row.get("documents", "")).strip()
        level = str(row.get("level", "")).strip()
        category = str(row.get("schemeCategory", "")).strip()
        tags = str(row.get("tags", "")).strip()

        if not scheme_name:
            continue

        url = f"https://www.myscheme.gov.in/schemes/{slug}" if slug else "https://www.myscheme.gov.in"

        full_text = f"""
SCHEME TITLE: {scheme_name}
CATEGORY: {category} | LEVEL: {level}
PORTAL URL: {url}
TAGS: {tags}

SCHEME DETAILS:
{details}

BENEFITS & FINANCIAL ASSISTANCE:
{benefits}

ELIGIBILITY CRITERIA:
{eligibility}

REQUIRED DOCUMENTS:
{documents_req}

APPLICATION PROCESS:
{application}
""".strip()

        documents.append({
            "id": scheme_name,
            "scheme_name": scheme_name,
            "slug": slug,
            "url": url,
            "level": level,
            "category": category,
            "tags": tags,
            "text": full_text
        })

    print(f"[LOAD] Successfully parsed {len(documents)} scheme records from CSV.")
    return documents

def split_text_into_chunks(text, chunk_size=400, overlap=80):
    """Splits document text into overlapping semantic word chunks."""
    words = text.split()
    if len(words) <= chunk_size:
        return [text]

    chunks = []
    start = 0
    while start < len(words):
        end = start + chunk_size
        chunks.append(" ".join(words[start:end]))
        start += (chunk_size - overlap)

    return chunks

def ingest_documents_to_chroma():
    """Processes updated_data.csv and persists embeddings into ChromaDB."""
    print("[START] Starting RAG Ingestion Pipeline (updated_data.csv)...")

    csv_path = settings.UPDATED_DATA_CSV
    if not os.path.exists(csv_path):
        # Fallback check at project root or backend dir
        alt_path = os.path.join(settings.PROJECT_ROOT, "updated_data.csv")
        if os.path.exists(alt_path):
            csv_path = alt_path

    docs = load_csv_documents(csv_path)

    if not docs:
        print("[ERROR] No scheme records found to ingest!")
        return

    # Initialize ChromaDB client
    os.makedirs(settings.CHROMA_PERSIST_DIR, exist_ok=True)
    chroma_client = chromadb.PersistentClient(path=settings.CHROMA_PERSIST_DIR)
    embedding_fn = embedding_functions.ONNXMiniLM_L6_V2()

    collection_name = "government_schemes"
    try:
        chroma_client.delete_collection(name=collection_name)
        print(f"[CHROMA] Cleared existing collection '{collection_name}'")
    except Exception:
        pass

    collection = chroma_client.create_collection(
        name=collection_name,
        embedding_function=embedding_fn,
        metadata={"hnsw:space": "cosine"}
    )

    chunk_ids = []
    chunk_texts = []
    chunk_metadatas = []
    total_chunks = 0

    for idx_doc, doc in enumerate(docs):
        chunks = split_text_into_chunks(doc["text"])
        safe_id = re.sub(r'[^a-zA-Z0-9_-]', '_', doc["slug"] or doc["scheme_name"].lower()[:30])
        
        for idx_chunk, chunk_text in enumerate(chunks):
            total_chunks += 1
            chunk_id = f"scheme_{idx_doc}_{safe_id}_chunk_{idx_chunk}"
            
            chunk_ids.append(chunk_id)
            chunk_texts.append(chunk_text)
            chunk_metadatas.append({
                "scheme_id": doc["scheme_name"],
                "scheme_name": doc["scheme_name"],
                "title": doc["scheme_name"],
                "slug": doc["slug"],
                "url": doc["url"],
                "level": doc["level"],
                "category": doc["category"],
                "tags": doc["tags"],
                "chunk_index": idx_chunk
            })

    print(f"[INDEXING] Indexing {total_chunks} chunks ({len(docs)} schemes) into ChromaDB...")

    batch_size = 200
    for i in range(0, len(chunk_ids), batch_size):
        end_idx = min(i + batch_size, len(chunk_ids))
        collection.add(
            ids=chunk_ids[i:end_idx],
            documents=chunk_texts[i:end_idx],
            metadatas=chunk_metadatas[i:end_idx]
        )
        if (i // batch_size) % 10 == 0:
            print(f"  - Progress: {end_idx}/{total_chunks} chunks ingested...")

    print(f"\n[SUCCESS] Successfully ingested {len(docs)} schemes ({total_chunks} chunks) into ChromaDB at:\n'{settings.CHROMA_PERSIST_DIR}'!")

if __name__ == "__main__":
    ingest_documents_to_chroma()
