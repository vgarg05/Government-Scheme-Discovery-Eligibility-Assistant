# Project Implementation Proposal

## Government Scheme Discovery & Eligibility Assistant
### A Hybrid Multi-Agent AI Framework for Citizen Empowerment (Local RAG + Serper API Web Search + React Frontend)

---

| Metric | Details |
| :--- | :--- |
| **Project Title** | Government Scheme Discovery & Eligibility Assistant |
| **Course / Semester** | B.Tech VII Semester Minor Project (2023-2027) |
| **Institution** | Maharaja Agrasen Institute of Technology (MAIT) |
| **Team ID** | MNP007 |
| **Team Members** | Keshav Jindal (00496402723), Vaibhav Garg (01196402723) |
| **Project Guide** | Dr. Yogesh Sharma |
| **Estimated Build Time** | **30 Days (Intensive Implementation Plan)** |
| **Frontend Stack** | **React.js + Tailwind CSS** |

---

## 1. Executive Summary

The objective of this project is to build an intelligent, **Hybrid Multi-Agent Conversational System** that assists Indian citizens in discovering government welfare schemes and determining their eligibility. The system combines:
1. **Primary Local RAG Engine (100 Master Schemes):** Fast, deterministic vector retrieval from a pre-indexed Knowledge Base containing **100 official government scheme PDFs** across 10 major welfare categories (Farmers, Health, Housing, Education, Women Welfare, Pensions, MSME Loans, Employment, State Flagships, and Clean Energy). This guarantees instant ground-truth responses and 100% offline stability during college presentation defenses.
2. **Fallback Serper API Web Search Agent:** Real-time Google Search integration via **Serper API** (`serper.dev`) targeted at official government portals (`site:gov.in`, `myscheme.gov.in`), triggered automatically when local vector similarity confidence falls below threshold ($S < 0.70$) to cover all remaining 500+ state and central schemes.
3. **Modern React Frontend:** Interactive, responsive single-page web app built with **React.js + Tailwind CSS**, featuring speech-to-text (Whisper/Web Speech API), text-to-speech (gTTS/Web Speech Synthesis), multilingual switching, and structured scheme cards.

---

## 2. System Architecture & Component Diagrams

### 2.1 Overall System Architecture (Mermaid Diagram)

```mermaid
graph TD
    User([Citizen / User Input: Text or Voice]) -->|User Query / Audio| UI[React.js Web App]

    subgraph InputLayer ["Frontend & Accessibility Layer (React + Tailwind CSS)"]
        UI -->|Voice Audio| AudioParser["Speech-to-Text Converter<br/>(Web Speech API / Whisper)"]
        AudioParser -->|Parsed JSON Text| Backend[FastAPI REST Server]
        UI -->|Direct Text Query| Backend
    end

    subgraph Orchestration ["Multi-Agent Orchestration Framework (LangGraph)"]
        Backend --> ProfileAgent[1. Profile Extraction Agent]
        ProfileAgent -->|JSON Demographics| ClarifyCheck{Profile Complete?}
        ClarifyCheck -->|No: Missing Info| ClarifyUser[Prompt for Missing Field]
        ClarifyUser --> UI

        ClarifyCheck -->|Yes: Complete JSON| RouterAgent{Routing & Retrieval Manager}

        RouterAgent -->|1. Primary Retrieval| RAGAgent[2a. Local Vector DB RAG Agent]
        RAGAgent -->|Semantic Search| VectorDB[("ChromaDB Vector Store<br/>Official Scheme PDFs")]

        VectorDB -->|Retrieved Context + Score| ConfidenceCheck{Similarity Score >= 0.70?}

        ConfidenceCheck -->|Yes: High Confidence| AdjudicatorAgent[3. Eligibility Adjudicator Agent]
        ConfidenceCheck -->|No: Low Match / New Scheme| WebAgent[2b. Serper API Web Search Agent]

        WebAgent -->|Google Search API| SerperAPI["Serper API - Google Search<br/>site:gov.in targeted"]
        SerperAPI -->|JSON Snippets & Web Content| AdjudicatorAgent

        AdjudicatorAgent -->|Matched Rules & Verification Score| CounselorAgent[4. Counselor & Guidance Agent]
        CounselorAgent -->|Generate Guidance & Checklists| Translator[Multilingual Translation Engine]
    end

    subgraph OutputLayer ["Response & Voice Playback Layer"]
        Translator -->|Structured JSON Response| BackendResponse[FastAPI Response Router]
        BackendResponse -->|Display Scorecards & Checklists| UI
        BackendResponse -->|Audio Stream| TTS["Text-to-Speech Engine<br/>(gTTS)"]
        TTS -->|Voice Output| UI
    end
```

---

### 2.2 System Flowchart & Decision Logic (Mermaid Diagram)

```mermaid
flowchart TD
    A([User Input: Voice or Text Query in React App]) --> B[Profile Agent: Extract Age, Income, Gender, State, Category]
    B --> C{Missing Essential Fields?}
    C -- Yes --> C1[React UI Displays Missing Field Prompt]
    C1 --> A
    C -- No --> D[Generate Normalized JSON Profile]
    
    D --> E[RAG Agent: Query ChromaDB Vector Store]
    E --> F{Cosine Similarity Score >= 0.70?}

    F -- Yes: Found in Local Database --> G[Extract Ground-Truth Policy Rules from PDFs]
    F -- No: Unknown or New Scheme --> H[Trigger Serper API Agent for site:gov.in Search]
    H --> I[Parse Serper Organic Snippets & Clean Web Page Text]
    I --> G

    G --> J[Eligibility Adjudicator Agent: Compare Profile vs. Policy Rules]
    J --> K{User Eligible?}

    K -- Yes --> L[Generate Benefits Summary & Document Checklist]
    K -- No --> M[List Missing Criteria & Suggest Alternative Schemes]

    L --> N[Counselor Agent: Formulate Action Steps & Source Citations]
    M --> N
    N --> O[Translate Output into User's Native Language]
    O --> P[React Component Renders Eligibility Scorecard & Voice Synthesis]
    P --> Q([Interactive UI Dashboard with Document Checklist & PDF Download])
```

---

### 2.3 Layered ASCII Component Architecture

```
+-------------------------------------------------------------------------------+
|                      REACT FRONTEND LAYER (React.js + Tailwind CSS)           |
|  - Speech Input (Web Speech API)  - Interactive Scorecards  - Dark/Light Theme  |
+-------------------------------------------------------------------------------+
                                       |  (REST API / JSON / WebSockets)
                                       v
+-------------------------------------------------------------------------------+
|                   FASTAPI CORE ROUTER & ACCESSIBILITY LAYER                   |
|   - Whisper Speech-to-Text (STT)      - gTTS Text-to-Speech (TTS)             |
+-------------------------------------------------------------------------------+
                                       |
                                       v
+-------------------------------------------------------------------------------+
|                   MULTI-AGENT ORCHESTRATION LAYER (LangGraph)                 |
|                                                                               |
|  +---------------------+   +---------------------+   +---------------------+  |
|  |  Profile Extractor  |-->|  RAG / Search Agent |-->| Adjudicator Engine  |  |
|  |       Agent         |   | (Cosine Similarity) |   |  (Logic Matcher)    |  |
|  +---------------------+   +----------+----------+   +----------+----------+  |
|                                       |                         |             |
|                                       v                         v             |
|  +------------------------------------+------------------------------------+  |
|  |                    Counselor & Guidance Agent                           |  |
|  |          (Generates Summaries, Checklists, Citations & Translations)     |  |
|  +-------------------------------------------------------------------------+  |
+-------------------------------------------------------------------------------+
                 |                                      |
                 v                                      v
+----------------------------------+   +----------------------------------+
|      LOCAL KNOWLEDGE BASE        |   |       EXTERNAL LIVE SEARCH       |
|  - Official Scheme PDFs (Data)   |   |  - Serper API (Google Search API)|
|  - ChromaDB Vector Store         |   |  - BeautifulSoup / Trafilatura    |
+----------------------------------+   +----------------------------------+
```

---

## 3. Technology Stack

| Layer | Recommended Technology |
| :--- | :--- |
| **Frontend Framework** | **React.js (Vite / Next.js)** |
| **Frontend Styling** | **Tailwind CSS + Lucide Icons + Framer Motion** |
| **State Management** | **React Context API / Zustand** |
| **Programming Language** | Python 3.10+ (Backend) & JavaScript / TypeScript (Frontend) |
| **Multi-Agent Framework** | LangGraph / CrewAI / LangChain |
| **LLM Engine** | Google Gemini API (`gemini-1.5-flash`) or OpenAI API |
| **Vector DB (RAG)** | ChromaDB / FAISS |
| **Live Search API** | **Serper API** (`https://serper.dev` - Google Search API) |
| **Speech Processing** | Web Speech API / OpenAI Whisper API (STT) & gTTS (TTS) |
| **Backend Framework** | FastAPI, Uvicorn, Pydantic |
| **Version Control** | Git & GitHub |

---

## 4. 🗓️ 30-Day Day-by-Day Implementation Roadmap

The project can be completely developed, integrated, tested, and deployed in **30 Days**. Below is the exact day-wise execution plan:

### 🔷 Phase 1: Environment Setup, Data Ingestion & Search Tools (Days 1 – 6)
* **Day 1:** Set up repository structure, Python virtual environment, install FastAPI, LangChain, ChromaDB, and obtain Serper API keys.
* **Day 2:** Generate and index **100 Master Government Scheme PDFs** across 10 major welfare categories (Agriculture, Health, Housing, Education, Women & Child, Pensions, MSME Loans, Employment, State Flagships, and Clean Energy) using `auto_downloader.py`.
* **Day 3:** Write PDF parsing and text chunking script (`src/rag/ingest.py`) using `pdfplumber` / `PyPDF`.
* **Day 4:** Build ChromaDB vector store ingestion script and test embedding generation using `all-MiniLM-L6-v2`.
* **Day 5:** Build `serper_tool.py` wrapper to execute targeted Google Searches (`site:gov.in OR site:myscheme.gov.in`) via Serper API.
* **Day 6:** Build web content cleaning module (`web_scraper.py`) using BeautifulSoup4/Trafilatura to strip HTML noise from search results.

### 🔷 Phase 2: Multi-Agent Logic & LangGraph State Workflow (Days 7 – 14)
* **Day 7:** Implement **Profile Extraction Agent** (`profile_agent.py`) using Pydantic JSON schemas to parse demographics (`age`, `income`, `occupation`, `state`, `caste`).
* **Day 8:** Add interactive profile clarification logic to detect missing critical parameters (e.g. prompt if `state` or `income` is missing).
* **Day 9:** Implement **Router Agent** (`router_agent.py`) to evaluate vector match Cosine Similarity score ($S \ge 0.70$).
* **Day 10:** Implement **Local RAG Agent** (`rag_agent.py`) to query ChromaDB and extract ground-truth policy paragraphs.
* **Day 11:** Implement **Serper Web Search Agent** (`web_agent.py`) for live search fallback when RAG confidence is low.
* **Day 12:** Implement **Eligibility Adjudicator Agent** (`eligibility.py`) to compare user profile against policy rules and output structured match scores.
* **Day 13:** Implement **Counselor & Guidance Agent** (`counselor.py`) to construct document checklists, application roadmaps, and attach web citations.
* **Day 14:** Connect all agents into a unified **LangGraph StateGraph** pipeline.

### 🔷 Phase 4: FastAPI Backend & API Endpoints (Days 15 – 18)
* **Day 15:** Build FastAPI backend framework (`src/api/main.py`) with CORS middleware enabled for React frontend requests.
* **Day 16:** Implement `/api/chat` POST endpoint to process user queries, execute agent workflow, and return JSON responses.
* **Day 17:** Add Speech-to-Text (STT) audio upload endpoint `/api/audio-to-text` and Text-to-Speech `/api/text-to-speech` using gTTS.
* **Day 18:** Implement query response caching (Redis/In-Memory) to avoid redundant API calls for identical profile inputs.

### 🔷 Phase 5: React Frontend Development (React.js + Tailwind CSS) (Days 19 – 25)
* **Day 19:** Initialize React app using Vite (`npm create vite@latest frontend -- --template react`). Install Tailwind CSS, Axios, and Lucide React Icons.
* **Day 20:** Build layout UI: Navbar, Hero section, Multilingual Language Selector dropdown (English, Hindi, Bengali, Marathi, etc.).
* **Day 21:** Build Conversational Chat Interface component with streaming message bubbles and loading animations.
* **Day 22:** Build Interactive **Eligibility Scorecard Component** (displays % match, eligible benefits, and missing criteria).
* **Day 23:** Build **Document Checklist Component** with interactive checkboxes (Aadhaar, Income Certificate, Ration Card, etc.) and PDF download option.
* **Day 24:** Integrate Voice Search (Web Speech API / Microphone button) and Audio Playback button for voice response.
* **Day 25:** Connect React frontend to FastAPI backend endpoints via Axios/Fetch API and test state sync.

### 🔷 Phase 6: Multilingual Integration, Testing & Refinement (Days 26 – 28)
* **Day 26:** Integrate `deep-translator` into backend counselor agent to return translated responses in Hindi, Punjabi, Tamil, etc.
* **Day 27:** Test edge cases (e.g. user missing income, brand new government scheme query, broken web links).
* **Day 28:** Measure quantitative evaluation metrics (Retrieval Precision@K, Eligibility Accuracy %, Response Latency).

### 🔷 Phase 7: Documentation, Presentation & Defense Prep (Days 29 – 30)
* **Day 29:** Prepare GitHub repository: clean code, add screenshots, write comprehensive `README.md`.
* **Day 30:** Prepare PowerPoint slides, project report, poster design, and record backup demo video for minor project defense.

---

## 5. Project Directory Structure

```
clg project/
├── frontend/                 # React.js Frontend Application
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx              # Navigation header with language dropdown
│   │   │   ├── ChatBox.jsx             # Conversational chat interface
│   │   │   ├── EligibilityCard.jsx     # Visual eligibility scorecard component
│   │   │   ├── DocumentChecklist.jsx   # Interactive document checklist card
│   │   │   └── VoiceInput.jsx          # Speech-to-text microphone button
│   │   ├── services/
│   │   │   └── api.js                  # Axios API calls to FastAPI backend
│   │   ├── App.jsx                     # Main React application component
│   │   └── index.css                   # Tailwind CSS styling directives
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Python FastAPI Backend & AI Agents
│   ├── data/
│   │   ├── raw_pdfs/         # Downloaded government scheme PDFs
│   │   └── processed/        # Extracted text chunks
│   ├── vectorstore/          # ChromaDB vector store
│   ├── src/
│   │   ├── agents/
│   │   │   ├── profile_agent.py
│   │   │   ├── router_agent.py
│   │   │   ├── rag_agent.py
│   │   │   ├── web_agent.py
│   │   │   ├── eligibility.py
│   │   │   └── counselor.py
│   │   ├── tools/
│   │   │   ├── vector_tool.py
│   │   │   ├── serper_tool.py
│   │   │   └── audio_tool.py
│   │   ├── utils/
│   │   │   ├── translator.py
│   │   │   └── config.py
│   │   └── api/
│   │       └── main.py       # FastAPI backend routes
│   └── requirements.txt
├── README.md                 # Project documentation
├── synopsis.md               # Minor Project Synopsis
└── proposal_implementation.md # Day-Wise Implementation Proposal
```

---

## 6. Quantitative Evaluation Metrics

1. **Retrieval Precision@K:** Percentage of retrieved RAG chunks/search results directly relevant to the user query (Target: $> 85\%$).
2. **Eligibility Classification Accuracy:** Tested against a benchmark dataset of 50 synthetic user profiles with known scheme eligibility (Target: $> 90\%$).
3. **System Response Latency:** Total round-trip time from user query submission in React UI to output rendering (Target: $< 3.5\text{s}$ for RAG, $< 6.0\text{s}$ for Serper API fallback).

---

## 7. Deliverables & College Presentation Value

1. **Working React Web App:** Modern, fast React single-page dashboard with Tailwind CSS styling.
2. **30-Day Execution Timeline:** Clear day-by-day plan showing structured engineering progress.
3. **Hybrid Agent Architecture:** Offline stability via local RAG + real-time search via Serper API.
4. **Interactive Accessibility:** Speech input/output and multilingual translation for rural empowerment.
