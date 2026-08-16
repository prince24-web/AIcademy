# Lesson Plan: Building Custom Knowledge Bases (ai-5-2)
**Module 5: Retrieval-Augmented Generation (RAG) · Chapter 2**

---

## 🎯 Lesson Overview & Metadata
- **Lesson ID:** `ai-5-2`
- **Title:** Building Custom Knowledge Bases: Ingestion, Cleaning & Chunking
- **Subtitle:** Transforming Raw Documents (PDFs, Markdown, Wikis) into High-Precision AI Knowledge Stores
- **Estimated Reading Time:** 8–10 min read
- **Badge:** `CORE RAG ARCHITECTURE` (#7c3aed)
- **Prerequisites:** `ai-5-1` (Why LLMs Forget & Context Window Limits)
- **Next Lesson:** `ai-5-3` (Generating Vector Embeddings & Similarity Math)

---

## 🏗️ Detailed Lesson Structure & Content Breakdown

### 1. Header & Motivational Hook
- **The Core Problem:** LLMs are powerful reasoning engines, but they know nothing about your private company docs, updated 2026 product pricing, or confidential customer tickets.
- **The Solution:** A **Custom Knowledge Base**—an ETL (Extract, Transform, Load) pipeline designed specifically for vector search and LLM context injection.
- **Why Naive Approaches Fail:** You cannot simply dump a 500-page PDF into a prompt (context window explosion, high latency, attention dilution). We must systematically extract, clean, slice, and index the knowledge.

---

### 2. The 4-Stage Knowledge Base Ingestion Pipeline (The AI ETL)
We break down the complete engineering lifecycle from messy raw files to search-ready knowledge chunks:

```
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────────────┐      ┌─────────────────────────┐
│  Raw Documents  │ ───► │ 1. Extraction   │ ───► │  2. Cleaning &          │ ───► │  3. Intelligent         │
│  (PDF, MD, DOCX,│      │    & Parsing    │      │     Normalization       │      │     Chunking            │
│   JSON, Notion) │      │ (Text/OCR/AST)  │      │ (Strip noise/headers)   │      │ (Size, Overlap, Splits) │
└─────────────────┘      └─────────────────┘      └─────────────────────────┘      └────────────┬────────────┘
                                                                                                │
                                                  ┌─────────────────────────┐                   │
                                                  │  Search-Ready Vector DB │ ◄─────────────────┘
                                                  │  (Chunk + Rich Metadata)│
                                                  └─────────────────────────┘
```

#### Stage 1: Document Extraction & Parsing
- Parsing plain text, Markdown, HTML, JSON, and complex PDFs.
- Handling tables, bullet points, headers, and images (OCR).

#### Stage 2: Data Cleaning & Normalization
- Removing repeated navigation headers/footers, page numbers, duplicate whitespace, and garbage characters.
- Preserving semantic markup (Markdown headers `#`, `##` and bullet points) because LLMs rely on formatting structure to understand context hierarchy.

#### Stage 3: Intelligent Chunking Strategies (Deep Dive)
Comparing the 4 major chunking strategies with pros, cons, and code:
1. **Fixed-Size Chunking (Character/Token-based):**
   - Simple but risks cutting sentences and numbers directly in half (e.g. splitting `$10,000` into `$10` and `,000`).
2. **Recursive Character Text Splitting (Industry Standard):**
   - Attempts splits hierarchically: Double line breaks `\n\n` (paragraphs) -> Single line break `\n` (lines) -> Spaces ` ` (words) -> Characters.
3. **Document-Aware / Markdown Header Chunking:**
   - Slices on logical document sections (H1, H2, H3), preserving parent section headers inside child chunks.
4. **Semantic / Sentence-Window Chunking:**
   - Embeds sentences individually and merges adjacent sentences based on semantic similarity.

#### Stage 4: Chunk Overlap & Context Windows
- **Why Chunk Overlap Matters (e.g. 10–20% overlap):** Prevents losing critical context when an idea spans across the boundary of two chunks.
- Visual diagram showing:
  `[ ---- Chunk 1 (Tokens 1 to 500) ---- ]`
                   `[ ---- Overlap: Tokens 450 to 500 ---- ]`
                   `[ ---- Chunk 2 (Tokens 450 to 950) ---- ]`

#### Stage 5: Metadata Enrichment & Tagging
- Attaching rich JSON metadata to every chunk:
  - `document_id`: Unique identifier
  - `source_file`: e.g. `"Q3_Financial_Report.pdf"`
  - `page_number`: e.g. `14`
  - `section_title`: e.g. `"Enterprise SLA Guarantee"`
  - `created_at`: e.g. `"2026-08-15"`
  - `department`: e.g. `"Legal"`
- Why metadata is essential: Enables pre-filtering in vector databases (e.g. *"Only search within Legal department documents updated after Jan 2026"*).

---

### 3. 💡 ELI5 Real-World Analogy
- **Title:** *The Encyclopedia vs. The Indexed Flashcards*
- **Analogy:** Handing an LLM a 500-page encyclopedia is like asking a human to read an entire volume in 2 seconds to answer a single question about page 42. Building a knowledge base is like taking the encyclopedia, neatly cutting it into single-topic index cards (chunking), writing the chapter and page on the top corner (metadata), and filing them in a color-coded drawer (vector store). When a question is asked, you pull only the exact 2 cards needed.

---

### 4. 💻 Complete Production Code Example (Python)
A clean, runnable Python script demonstrating:
1. Loading multi-format documents (Markdown/Text).
2. Implementing a robust `RecursiveTextSplitter` algorithm from scratch (with custom chunk size & overlap).
3. Metadata injection and structured chunk output validation.

```python
# Preview of the lesson's code walkthrough:
class KnowledgeChunk:
    def __init__(self, text: str, metadata: dict):
        self.text = text
        self.metadata = metadata

def build_custom_knowledge_base(raw_docs: list[dict], chunk_size=400, chunk_overlap=80):
    # Step-by-step extraction, recursive splitting, and metadata enrichment
    ...
```

---

### 5. 🎮 Interactive UI Widget: "Live Chunking & Overlap Simulator"
In the interactive lesson reader, students can:
- Type or paste custom text (or choose from presets like *Company Security Policy* or *API Documentation*).
- Adjust two interactive sliders:
  1. **Chunk Size Slider:** 100 to 800 characters
  2. **Overlap Slider:** 0 to 200 characters
- **Live Visual Slices:** Watch the text split in real time with distinct color-coded chunk cards and highlight the exact overlapping words in glowing purple/amber!
- **Inspection Metrics:** Live stats showing Total Chunks Created, Avg Words per Chunk, Overlap Ratio, and Token Efficiency score.

---

### 6. ⚠️ Common Pitfalls & Enterprise Best Practices
- **Pitfall 1: Chunk Too Small (Under-contextualization):** Fragments lack the surrounding background needed for reasoning.
- **Pitfall 2: Chunk Too Large (Attention Dilution & Noise):** Irrelevant text crowds the LLM context window.
- **Pitfall 3: Stripping Structural Headers:** Without section titles, a chunk saying *"You will be charged a $50 late fee"* loses whether it applies to Standard or Premium tier.
- **Best Practice:** Keep chunks between 256–512 tokens with 10–15% overlap for general QA, and always prepend the document/section hierarchy to each chunk.

---

### 7. 📝 Key Takeaways Checklist
1. A Knowledge Base is the foundational data substrate for all RAG applications.
2. Ingestion requires a 4-step pipeline: Extract, Clean, Chunk, and Enrich with Metadata.
3. Recursive character splitting preserves semantic paragraph and sentence boundaries.
4. Overlapping boundaries (10–20%) prevents split-context hallucinations.
5. Metadata tags enable high-performance hybrid filtering (Vector Search + SQL/Metadata filters).

---

### 8. 🧠 Interactive Knowledge Check Quiz
- **Question:** An engineer notices their RAG application fails to answer questions when the answer is split across the boundary of two consecutive chunks. What is the most effective engineering fix?
- **Options:**
  1. Increase temperature to 1.0 so the LLM guesses the missing piece
  2. Implement chunk overlap (e.g. 15–20%) so adjacent chunks share boundary context
  3. Increase the prompt's font size
  4. Delete the second chunk from the database
- **Correct Option:** 2
- **Detailed Explanation:** Chunk overlap ensures sentences spanning across boundary thresholds are preserved intact in both adjacent chunks, eliminating boundary information loss.

---

## 🚀 Next Steps Once Approved
1. Add the full `ai-5-2` lesson data object to `app/learn/ai-engineering/aiLessonsData.js`.
2. Add the custom interactive **Chunking & Overlap Simulator Widget** to `app/learn/ai-engineering/[lessonId]/page.js`.
3. Unlock `ai-5-2` in the roadmap (`page.js`) and connect the Next/Prev navigation links.
