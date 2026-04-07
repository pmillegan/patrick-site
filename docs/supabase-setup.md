# Supabase Setup Notes

Supabase has been wired into this project with:

- Database schema:
  - `lecture_sessions`
  - `lecture_questions`
  - `lecture_question_groups`
- RLS enabled with public insert/select policies for rapid prototyping.
- App utilities:
  - `src/lib/supabase/client.ts`
  - `src/lib/supabase/server.ts`
  - `src/lib/supabase/admin.ts`
- Starter API route:
  - `GET /api/lecture-questions`
  - `POST /api/lecture-questions`

## Environment Variables

Use `.env.local` for local development and `.env.example` as a template:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (optional now, recommended for secure admin flows)

## Quick Test

### Insert a question

```bash
curl -X POST http://localhost:3000/api/lecture-questions \
  -H "Content-Type: application/json" \
  -d '{
    "audience": "undergrad",
    "asker_name": "Test Student",
    "asker_email": "student@example.com",
    "question_text": "How do you prioritize product tradeoffs at scale?",
    "is_anonymous": false,
    "consent_followup": true
  }'
```

### List questions

```bash
curl "http://localhost:3000/api/lecture-questions?audience=undergrad&limit=50"
```

## Security Follow-up

For production, tighten current public select policy and move admin reads to authenticated/server-only paths using the service role key.
