# Guest Lecture Question Tool - Product Spec + Build Prompt

## TL;DR
Build a web tool for live guest lectures that:
- collects student questions through a simple form,
- uses AI to group and summarize similar questions,
- provides a presenter-friendly live Q&A mode,
- and optionally sends a post-lecture recap with answers.

This should be practical, fast, and reliable in a real classroom environment.

---

## Product Goals

1. **Collect Questions Easily**
   - Share one link.
   - Students submit questions quickly from any device.
   - Support optional anonymity.

2. **Reduce Question Overlap**
   - AI merges semantically similar questions.
   - Presenter sees a clean list of unique, high-signal questions.
   - Every merged question shows source submissions for traceability.

3. **Run Live Q&A Smoothly**
   - Full-screen presentation mode for screen sharing.
   - Keyboard navigation and answer tracking.
   - Minimal UI friction during the lecture.

4. **Follow Up with Students**
   - Save answer notes per merged question.
   - Publish a recap page and optionally email students who opted in.

---

## Primary User Flows

### 1) Student Submission
- Open form link.
- Enter question text (required).
- Optionally provide name and email.
- Optionally opt into receiving recap.
- Submit.

### 2) Host Prepares Session
- Open admin view.
- See incoming raw submissions in real time.
- Click "Aggregate Questions" to run AI grouping.
- Review merged questions and optionally edit wording.

### 3) Host Runs Live Q&A
- Open presentation mode.
- Navigate merged questions (next/previous, hotkeys).
- Mark each as answered or skipped.
- Capture short answer notes live.

### 4) Post-Lecture Recap
- Generate summary page with questions + answers.
- Optionally email recap link to students who opted in.

---

## MVP Features

### Submission
- Public form route.
- Fields:
  - `question_text` (required)
  - `name` (optional)
  - `email` (optional)
  - `consent_followup` (boolean)
- Basic validation + spam guard (rate limit/captcha optional for MVP).

### Admin
- Raw submission list (newest first).
- Aggregation run button.
- Merged question list with:
  - canonical question,
  - number of similar submissions,
  - linked source submissions.

### Presentation Mode
- Full-screen question cards.
- Show:
  - canonical question,
  - count of similar asks,
  - expandable source list.
- Controls:
  - next/previous question
  - mark answered/skipped
  - answer notes textarea

### Recap
- Public or private recap page.
- Includes:
  - merged questions
  - answer notes
  - optional source question excerpts.

---

## Non-Goals (for MVP)

- No complex LMS integration.
- No advanced moderation workflows.
- No multi-tenant org management.
- No deeply customizable branding system.

---

## AI Aggregation Design

Use a two-pass pipeline for better quality and lower risk:

1. **Semantic Clustering**
   - Create embeddings for all raw questions.
   - Cluster by semantic similarity using a threshold.

2. **Cluster Summarization**
   - For each cluster, call LLM with structured output:
     - `canonical_question`
     - `summary`
     - `source_question_ids`
     - `confidence`
     - `suggested_tag` (optional)

3. **Final Dedupe Pass**
   - Deduplicate similar canonical questions after cluster summaries.

4. **Human Override**
   - Admin can manually merge/split/edit before presentation.

---

## Suggested Data Model

### `sessions`
- `id`
- `title`
- `description`
- `created_by`
- `created_at`

### `submissions`
- `id`
- `session_id`
- `question_text`
- `name` (nullable)
- `email` (nullable)
- `consent_followup` (bool)
- `created_at`

### `aggregation_runs`
- `id`
- `session_id`
- `model_name`
- `parameters_json`
- `created_at`

### `aggregated_questions`
- `id`
- `aggregation_run_id`
- `canonical_question`
- `summary`
- `status` (`new`, `answered`, `skipped`)
- `display_order`
- `confidence` (nullable)

### `aggregated_question_sources`
- `aggregated_question_id`
- `submission_id`
- `similarity_score` (nullable)

### `answers`
- `id`
- `aggregated_question_id`
- `answer_text`
- `answered_at`

---

## UI Requirements

### Form Page
- Mobile-first and low-friction.
- Single-column layout.
- Fast submit with clear success state.

### Admin Page
- Table/list of submissions.
- Action bar with:
  - Run aggregation
  - Re-run aggregation
  - Enter presentation mode

### Presentation Page
- Large readable text.
- Dark/light mode support.
- Keyboard shortcuts:
  - Left/Right: previous/next
  - `A`: mark answered
  - `S`: skip
  - `N`: focus notes

### Footer/Meta (optional)
- Session timer.
- Current progress (e.g., "5/18 answered").

---

## Quality and Safety Requirements

- Preserve links between merged questions and source submissions.
- Do not expose private emails in presenter mode.
- Maintain audit trail for aggregation runs.
- Provide retry/fallback when AI calls fail.
- Keep deterministic-ish output (low temperature).

---

## Example LLM Prompt (Cluster Summarization)

```text
You are summarizing student questions for a live lecture.

Input:
- A cluster of semantically similar questions.
- Each question has an id and text.

Task:
1) Write one canonical question that best represents the cluster.
2) Write a one-sentence summary of what students want to understand.
3) Return source question IDs unchanged.
4) Return a confidence score from 0 to 1.

Output strict JSON:
{
  "canonical_question": "string",
  "summary": "string",
  "source_question_ids": ["id1", "id2"],
  "confidence": 0.0
}

Rules:
- Do not invent source IDs.
- Do not include markdown.
- Keep canonical question under 160 characters.
```

---

## Suggested Build Stack

- **Frontend/App**: Next.js (App Router, TypeScript)
- **DB**: Postgres (or Supabase)
- **Auth**: lightweight host auth (magic link)
- **AI**: embeddings + chat completion model
- **Email**: Resend (optional for MVP)

---

## Milestones

### Milestone 1 (Same Day)
- Public form
- Save submissions
- Basic admin list

### Milestone 2
- AI aggregation pipeline
- Merged question view with sources

### Milestone 3
- Presentation mode + answer capture

### Milestone 4
- Recap page + optional email follow-up

---

## Acceptance Criteria

- Host can collect live questions from a shared link.
- Host can generate merged question list with source traceability.
- Host can present and mark questions answered in real time.
- Host can produce a recap artifact after session.

