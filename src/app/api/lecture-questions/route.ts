import { NextRequest, NextResponse } from "next/server";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";
import { hasSupabasePublicEnv } from "@/lib/supabase/env";

const VALID_AUDIENCES = new Set(["undergrad", "grad"]);

type LectureQuestionInsert = {
  audience: "undergrad" | "grad";
  asker_name: string | null;
  asker_email: string | null;
  question_text: string;
  is_anonymous: boolean;
  consent_followup: boolean;
};

function getSupabaseClientOrError() {
  if (!hasSupabasePublicEnv()) {
    return {
      error: NextResponse.json(
        {
          error:
            "Supabase environment variables are missing. Set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.",
        },
        { status: 500 },
      ),
    };
  }

  try {
    return { client: createSupabaseAdminClient() };
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to initialize Supabase client.";
    return { error: NextResponse.json({ error: message }, { status: 500 }) };
  }
}

export async function GET(request: NextRequest) {
  const audience = request.nextUrl.searchParams.get("audience");
  const limitParam = Number.parseInt(request.nextUrl.searchParams.get("limit") ?? "200", 10);
  const limit = Number.isFinite(limitParam) ? Math.min(Math.max(limitParam, 1), 500) : 200;

  const supabaseResult = getSupabaseClientOrError();
  if (!supabaseResult.client) {
    return supabaseResult.error;
  }
  const supabase = supabaseResult.client;
  let query = supabase
    .from("lecture_questions")
    .select("id, audience, asker_name, question_text, status, created_at")
    .order("created_at", { ascending: false })
    .limit(limit);

  if (audience && VALID_AUDIENCES.has(audience)) {
    query = query.eq("audience", audience);
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data });
}

export async function POST(request: NextRequest) {
  const supabaseResult = getSupabaseClientOrError();
  if (!supabaseResult.client) {
    return supabaseResult.error;
  }
  const supabase = supabaseResult.client;

  const body = await request.json().catch(() => null);
  if (!body || typeof body !== "object") {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const audience = typeof body.audience === "string" ? body.audience.toLowerCase() : "";
  if (!VALID_AUDIENCES.has(audience)) {
    return NextResponse.json({ error: "Audience must be undergrad or grad." }, { status: 400 });
  }

  const questionText = typeof body.question_text === "string" ? body.question_text.trim() : "";
  if (questionText.length < 8) {
    return NextResponse.json(
      { error: "question_text must be at least 8 characters." },
      { status: 400 },
    );
  }
  const askerEmail = typeof body.asker_email === "string" ? body.asker_email.trim() : "";
  const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(askerEmail);
  if (!hasValidEmail) {
    return NextResponse.json(
      { error: "asker_email is required and must be a valid email address." },
      { status: 400 },
    );
  }

  const payload: LectureQuestionInsert = {
    audience: audience as "undergrad" | "grad",
    asker_name:
      typeof body.asker_name === "string" && body.asker_name.trim()
        ? body.asker_name.trim()
        : null,
    asker_email: askerEmail,
    question_text: questionText,
    is_anonymous: Boolean(body.is_anonymous),
    consent_followup: Boolean(body.consent_followup),
  };

  const { data, error } = await supabase
    .from("lecture_questions")
    .insert(payload)
    .select("id, audience, question_text, created_at")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
