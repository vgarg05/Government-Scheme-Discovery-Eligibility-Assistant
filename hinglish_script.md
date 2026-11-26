# 🎤 PPT Speaking Script — Hinglish
### Government Scheme Discovery & Eligibility Assistant
**Team MNP007 · Keshav Jindal & Vaibhav Garg · MAIT Delhi**

---

## 🟠 Slide 1 — Title Slide

> *"Good morning/afternoon sir/ma'am. Hamara naam hai Keshav Jindal aur Vaibhav Garg, aur hum dono B.Tech 7th semester ke students hain, Computer Science Department, MAIT Delhi se.*
>
> *Aaj hum apna Minor Project present karne wale hain jiska naam hai —*
> **'Government Scheme Discovery and Eligibility Assistant'**
>
> *Yeh ek AI-based system hai jo citizens ko — especially rural aur marginalized communities ko — government ki welfare schemes dhundhne mein help karta hai. Hamara guide Dr. Yogesh Sharma sir hain.*
>
> *Toh chalo shuru karte hain!"*

---

## 🔴 Slide 2 — Problem Statement

> *"Toh pehle baat karte hain problem ki — aakhir problem kya hai?*
>
> *Socho ek kisan hai, ya ek widow hai — unhe pata hi nahi ki unke liye koi government scheme exist karti hai. Kyun? Kyunki information itni scattered hai — alag alag portals pe, dense bureaucratic language mein — ki ek normal insaan ke liye samajhna practically impossible hai.*
>
> *India mein 500 se zyada central aur state schemes hain. Lekin unka faayda sirf woh log uthate hain jo ya toh padhay-likhay hain, ya jinka koi connection hai.*
>
> *Studies ke hisaab se approximately 67% eligible beneficiaries ko unka haq kabhi milta hi nahi — sirf information gap ki wajah se.*
>
> *Aur oopar se 22 official languages hain — agar koi Hindi ya English nahi jaanta, toh uske liye toh yeh problem aur bhi serious hai.*
>
> *Toh yahi hai hamara problem — **Information Asymmetry** — aur isko solve karna hai humein."*

---

## 📄 Slide 3 — Abstract

> *"Ab baat karte hain ki humne build kya kiya.*
>
> *Humne ek AI-powered web application banaya hai. Koi bhi citizen apni situation plain language mein describe kar sakta hai — chahe Hindi mein, chahe English mein — ya voice mein bol sakta hai.*
>
> *Hama system pehle uski personal details extract karta hai — jaise umar, income, caste, state — Gemini 2.5 Flash LLM ki help se.*
>
> *Phir hum ek **dual-engine retrieval** run karte hain:*
> *Pehla engine hai hamara local RAG — 100+ schemes ki ek vector database jismein ChromaDB use kiya hai.*
> *Agar confidence low ho — yaani 70% se kam — toh system automatically fallback karta hai Playwright DOM scraping pe aur Serper API Google Search pe — aur live gov.in websites se data pull karta hai.*
>
> *Aur phir ek AI adjudicator decide karta hai — ki yeh person eligible hai ya nahi — aur step-by-step guidance deta hai.*
>
> *Sab kuch — 10 se zyada Indian languages mein aur voice output ke saath!"*

---

## 📖 Slide 4 — Introduction (Scope, Motivation, Challenges)

> *"Ab introduction mein hum teen cheezein cover karenge — Scope, Motivation, aur Challenges.*
>
> **Scope ke baare mein:**
> *Hamara system conversational hai — matlab citizen ko koi form nahi bharna, koi filter nahi laganaa. Bas apni baat karo aur system sab handle kar lega. Voice input bhi support karta hai. 10+ regional languages mein output milta hai.*
>
> **Motivation:**
> *Hum log CSE students hain aur humne socha ki AI ko sirf apps aur games ke liye nahi, balki ek real social problem solve karne ke liye use karna chahiye. Yeh project usi soch se aaya hai — Tech for Good.*
>
> **Challenges:**
> *Ek major challenge tha — myscheme.gov.in ek Next.js SPA hai — matlab JavaScript render hone ke baad hi content visible hota hai. Normal HTTP request se kuch nahi milta. Iske liye humne Playwright Headless Chromium use kiya.*
>
> *Doosra challenge tha RAG ki reliability — agar vector similarity 70% se kam aaye toh hallucination ka risk hota hai. Isliye humne automatic fallback mechanism daala live web search pe."*

---

## 📚 Slide 5 — Literature Survey

> *"Ab hum dekhte hain ki is field mein pehle kya kaam hua hai aur hum kahan naye hain.*
>
> *Lewis et al. ka 2020 ka famous RAG paper — unhone knowledge-intensive NLP ke liye RAG introduce kiya. Lekin unka focus static knowledge base tha — live web scraping nahi tha.*
>
> *myScheme.gov.in khud ek government portal hai — lekin woh sirf filter-based search deta hai. Koi NLP nahi, koi eligibility verdict nahi, sirf English mein.*
>
> *LangChain ReAct agents generic tool-calling deta hai — lekin government domain ke liye customize nahi kiya gaya.*
>
> *Playwright aur Puppeteer pe kaafi research hai — but sirf scraping ke liye, koi AI layer nahi.*
>
> ***Hamara system — yeh sabka combination hai.*** RAG + Playwright + Serper + LLM adjudicator + voice + multilingual — ek hi system mein. Yeh gap pehle kisi ne fill nahi kiya tha."*

---

## 🛠️ Slide 6 — Technology Stack

> *"Chalo ab technology stack dekhte hain — basically humne kya kya tools use kiye.*
>
> *Frontend ke liye **React 18 aur Vite** use kiya — fast aur modern UI banane ke liye. Styling mein **Tailwind CSS** use hua.*
>
> *Backend mein **Python FastAPI** hai — jo ki ek async REST API server hai, bohot fast aur lightweight.*
>
> *AI ke liye **Google Gemini 2.5 Flash** use kiya — yeh humara LLM hai jo profile extract karta hai, eligibility check karta hai, aur summaries banata hai.*
>
> *Vector database ke liye **ChromaDB** use kiya — aur semantic similarity ke liye **Sentence Transformers**.*
>
> *Dynamic web scraping ke liye **Playwright Headless Chromium** — jo React SPA pages render karke clean data extract karta hai.*
>
> *Live search ke liye **Serper API** — jo Google Search ko target karta hai specifically gov.in domains pe.*
>
> *Aur voice ke liye — **Web Speech API** for speech-to-text, aur **gTTS** for text-to-speech. Translation ke liye **Deep Translator**.*
>
> *Basically yeh ek full-stack AI system hai — frontend se backend tak, scraping se LLM tak — sab ek saath kaam karta hai."*

---

## 🏗️ Slide 7 — Architecture

> *"Ab dekhte hain system ka architecture — yaani andar se yeh kaise kaam karta hai.*
>
> *Sab kuch start hota hai user ke input se — text ya voice. React frontend pe.*
>
> *Phir ek **Profile Extraction Agent** kaam karta hai — jo Gemini use karke user ki age, income, caste, state, gender extract karta hai. Agar koi information missing ho toh system usi cheez ke liye clarification maangta hai.*
>
> *Jab profile complete ho jaata hai — **Routing aur Retrieval** start hota hai.*
> *Pehle local ChromaDB mein search hota hai. Agar similarity 70% se zyada aaye — toh direct adjudication pe jaata hai.*
> *Agar 70% se kam aaye — Playwright Chromium launch hota hai aur myscheme.gov.in pe scrape karta hai. Ya Serper API se live Google Search karti hai specifically gov.in pe.*
>
> *Retrieved content **Gemini 2.5 Flash Adjudicator** ko jaata hai — jo decide karta hai ki user eligible hai ya nahi. Ineligible schemes pe warning show hoti hai.*
>
> *Phir **Counselor Agent** step-by-step guide banata hai — documents, process, portal links sab kuch.*
>
> *Aur finally **Translation Engine** sab kuch user ki preferred language mein convert karta hai — aur gTTS se voice output bhi generate hota hai."*

---

## 🖥️ Slide 8 — Prototype

> *"Ab hum apna actual prototype dekhenga — humne practically kya build kiya.*
>
> *Pehla feature hai — **Conversational Profile Builder**. Aap literally apni situation describe karo — 'Main ek 65 saal ka kisan hoon UP se, meri income 1 lakh se kam hai' — aur system khud samajh jaayega. Voice mein bhi bol sakte ho.*
>
> *Doosra — **Dual Engine Retrieval**. 100 core schemes toh local database mein hain jo instant response dete hain. Baaki 500+ schemes ke liye live Playwright scraping ya Google Search.*
>
> *Teesra — yeh mujhe personally bohot interesting lagta hai — **LLM Policy Adjudicator**. Yeh sirf scheme suggest nahi karta — yeh clearly batata hai ki aap eligible ho ya nahi, aur kyun nahi ho. Agar age mismatch hai toh explicit warning card show hota hai.*
>
> *Aur fourth — **Guidance aur Accessibility**. Documents ki checklist milti hai, official portal ke direct clickable links milte hain, aur voice mein sab sun sakte ho — especially un logon ke liye jo padhne mein comfortable nahi hain."*

---

## 🌍 Slide 9 — Social Impact & Future Scope

> *"Ab baat karte hain is project ke impact ki — aur aage kya ho sakta hai.*
>
> *Abhi is system se 500+ schemes cover hote hain. 10 se zyada Indian languages support karta hai. Aur kyunki hamara primary RAG local hai — demo mein 100% reliability hai.*
>
> *Lekin real impact ki baat karein — agar yeh system ek rural citizen ke haath mein pohnche, jise na English aati hai na bureaucratic language samajh mein aati — toh yeh uski zindagi badal sakta hai. Literally.*
>
> **Future scope mein hum chahte hain:**
> *Pehla — **DigiLocker integration** — taaki user ke documents automatically verify ho sakein without manual submission.*
>
> *Doosra — **WhatsApp aur SMS channel** — kyunki bharat mein smartphone se zyada WhatsApp use hota hai. Twilio se yeh possible hai.*
>
> *Teesra — **Analytics dashboard** — taaki pata chale ki kaun si schemes sabse zyada query ho rahi hain — policymakers ke liye useful data.*
>
> *Aur fourth — **geo-aware personalization** — system automatically user ki state detect kare aur state-specific schemes pehle dikhaye."*

---

## 📖 Slide 10 — References & Thank You

> *"Yeh hai hamari references list — humne Lewis et al. ka RAG paper, Playwright documentation, myScheme portal, Serper API, aur Google Gemini ki documentation refer ki hai.*
>
> *Toh overall — humne ek aisa system banaya hai jo plain language mein citizen ki baat sunta hai, AI se eligibility decide karta hai, aur regional language mein guide karta hai — sab kuch ek hi platform pe.*
>
> *Hamara believe hai ki technology ka asli use tabhi hota hai jab woh aam insaan tak pohnche — aur yahi humara goal tha is project mein.*
>
> *Sir/Ma'am, thank you so much for your time. Agar koi questions hain toh hum answer karne ke liye ready hain!"*

---

## 💡 Quick Tips for Presentation Day

| Tip | What to do |
|-----|-----------|
| **Eye contact** | Panel ko dekho, screen ko nahi |
| **Speed** | Slow bolo — nervous hone pe log fast bolne lagte hain |
| **Pause** | Har slide ke baad 1-2 second ruko |
| **Questions** | "Sir, aapka question bilkul valid hai..." se start karo |
| **Demo ready** | Browser mein website/HTML presentation already open rakhna |
| **Time** | Total ~8-10 minute mein complete karo |
