"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Audience = "undergrad" | "grad";

export default function UscSubmitPage() {
  const router = useRouter();
  const [audience, setAudience] = useState<Audience>("undergrad");
  const [askerName, setAskerName] = useState("");
  const [askerEmail, setAskerEmail] = useState("");
  const [questionText, setQuestionText] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [consentFollowup, setConsentFollowup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (questionText.trim().length < 8) {
      setError("Please enter a question with at least 8 characters.");
      return;
    }
    if (!askerEmail.trim()) {
      setError("Email is required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lecture-questions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          audience,
          asker_name: askerName.trim() || null,
          asker_email: askerEmail.trim() || null,
          question_text: questionText.trim(),
          is_anonymous: isAnonymous,
          consent_followup: consentFollowup,
        }),
      });

      const payload = (await response.json()) as { error?: string };
      if (!response.ok) {
        throw new Error(payload.error ?? "Unable to submit your question.");
      }

      router.push("/usc/thank-you");
    } catch (submitError) {
      const message =
        submitError instanceof Error ? submitError.message : "Unable to submit your question.";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col gap-8 px-6 py-14 sm:px-8">
      <header className="space-y-3">
        <p className="text-sm uppercase tracking-wide text-zinc-600 dark:text-zinc-400">USC</p>
        <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Submit a question
        </h1>
        <p className="text-zinc-700 dark:text-zinc-300">
          Ask anything you want covered in the guest lecture.
        </p>
        <Link href="/usc" className="text-sm text-zinc-600 underline dark:text-zinc-300">
          Back to USC questions
        </Link>
      </header>

      <form
        onSubmit={onSubmit}
        className="space-y-5 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
      >
        <div className="space-y-2">
          <label htmlFor="audience" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Audience
          </label>
          <select
            id="audience"
            value={audience}
            onChange={(event) => setAudience(event.target.value as Audience)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
          >
            <option value="undergrad">Undergrad</option>
            <option value="grad">Grad</option>
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="question_text" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Question
          </label>
          <textarea
            id="question_text"
            value={questionText}
            onChange={(event) => setQuestionText(event.target.value)}
            rows={5}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            placeholder="What would you like to ask?"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="asker_name" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Name (optional)
          </label>
          <input
            id="asker_name"
            value={askerName}
            onChange={(event) => setAskerName(event.target.value)}
            disabled={isAnonymous}
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            placeholder={isAnonymous ? "Anonymous enabled" : "Your name"}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="asker_email" className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
            Email
          </label>
          <input
            id="asker_email"
            type="email"
            value={askerEmail}
            onChange={(event) => setAskerEmail(event.target.value)}
            required
            className="w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100"
            placeholder="you@school.edu"
          />
        </div>

        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={isAnonymous}
            onChange={(event) => setIsAnonymous(event.target.checked)}
          />
          Submit anonymously
        </label>

        <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
          <input
            type="checkbox"
            checked={consentFollowup}
            onChange={(event) => setConsentFollowup(event.target.checked)}
          />
          I am okay receiving follow-up notes by email
        </label>

        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-300"
        >
          {isSubmitting ? "Submitting..." : "Submit question"}
        </button>
      </form>
    </main>
  );
}
