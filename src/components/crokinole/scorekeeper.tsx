"use client";

import { useMemo, useState, useSyncExternalStore } from "react";

type GameMode = "conventional" | "tournament";

type Round = {
  /** Raw board points (including 20s) scored by side 1 in the round. */
  side1: number;
  /** Raw board points (including 20s) scored by side 2 in the round. */
  side2: number;
};

type Game = {
  id: string;
  createdAt: string;
  completedAt: string | null;
  mode: GameMode;
  /** Conventional: target score to win (default 100). */
  targetScore: number;
  /** Tournament: number of rounds in the match (default 4). */
  totalRounds: number;
  side1Name: string;
  side2Name: string;
  rounds: Round[];
  winner: "side1" | "side2" | "tie" | null;
};

type StoredState = {
  activeGame: Game | null;
  history: Game[];
};

const STORAGE_KEY = "crokinole-state-v1";

const EMPTY_STATE: StoredState = { activeGame: null, history: [] };

function readState(): StoredState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as StoredState;
    if (!parsed || typeof parsed !== "object") return EMPTY_STATE;
    return {
      activeGame: parsed.activeGame ?? null,
      history: Array.isArray(parsed.history) ? parsed.history : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

function writeState(state: StoredState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode errors
  }
}

let memoryState: StoredState | null = null;
const storeListeners = new Set<() => void>();

function getStoreSnapshot(): StoredState {
  if (memoryState === null) memoryState = readState();
  return memoryState;
}

function getServerStoreSnapshot(): StoredState {
  return EMPTY_STATE;
}

function subscribeStore(callback: () => void) {
  storeListeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      memoryState = readState();
      storeListeners.forEach((listener) => listener());
    }
  };
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage);
  }
  return () => {
    storeListeners.delete(callback);
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage);
    }
  };
}

function setStoredState(updater: (prev: StoredState) => StoredState) {
  const current = getStoreSnapshot();
  const next = updater(current);
  if (next === current) return;
  memoryState = next;
  writeState(next);
  storeListeners.forEach((listener) => listener());
}

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `g_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/** Compute totals at any point in the game using the active mode's rules. */
function computeTotals(game: Game): { side1: number; side2: number } {
  if (game.mode === "conventional") {
    let s1 = 0;
    let s2 = 0;
    for (const round of game.rounds) {
      const diff = round.side1 - round.side2;
      if (diff > 0) s1 += diff;
      else if (diff < 0) s2 += -diff;
    }
    return { side1: s1, side2: s2 };
  }
  let s1 = 0;
  let s2 = 0;
  for (const round of game.rounds) {
    if (round.side1 > round.side2) s1 += 2;
    else if (round.side2 > round.side1) s2 += 2;
    else {
      s1 += 1;
      s2 += 1;
    }
  }
  return { side1: s1, side2: s2 };
}

function determineWinner(game: Game): Game["winner"] {
  const totals = computeTotals(game);
  if (game.mode === "conventional") {
    if (totals.side1 >= game.targetScore && totals.side1 > totals.side2) return "side1";
    if (totals.side2 >= game.targetScore && totals.side2 > totals.side1) return "side2";
    return null;
  }
  if (game.rounds.length < game.totalRounds) return null;
  if (totals.side1 > totals.side2) return "side1";
  if (totals.side2 > totals.side1) return "side2";
  return "tie";
}

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString(undefined, {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export default function Scorekeeper() {
  const state = useSyncExternalStore(
    subscribeStore,
    getStoreSnapshot,
    getServerStoreSnapshot,
  );

  const activeGame = state.activeGame;

  const totals = useMemo(
    () => (activeGame ? computeTotals(activeGame) : { side1: 0, side2: 0 }),
    [activeGame],
  );

  function startGame(input: {
    mode: GameMode;
    side1Name: string;
    side2Name: string;
    targetScore: number;
    totalRounds: number;
  }) {
    const game: Game = {
      id: newId(),
      createdAt: new Date().toISOString(),
      completedAt: null,
      mode: input.mode,
      targetScore: input.targetScore,
      totalRounds: input.totalRounds,
      side1Name: input.side1Name.trim() || "Side 1",
      side2Name: input.side2Name.trim() || "Side 2",
      rounds: [],
      winner: null,
    };
    setStoredState((prev) => ({ ...prev, activeGame: game }));
  }

  function addRound(round: Round) {
    setStoredState((prev) => {
      if (!prev.activeGame) return prev;
      const nextGame: Game = {
        ...prev.activeGame,
        rounds: [...prev.activeGame.rounds, round],
      };
      const winner = determineWinner(nextGame);
      if (winner) {
        const completed: Game = {
          ...nextGame,
          winner,
          completedAt: new Date().toISOString(),
        };
        return {
          activeGame: null,
          history: [completed, ...prev.history],
        };
      }
      return { ...prev, activeGame: nextGame };
    });
  }

  function undoLastRound() {
    setStoredState((prev) => {
      if (!prev.activeGame || prev.activeGame.rounds.length === 0) return prev;
      const nextRounds = prev.activeGame.rounds.slice(0, -1);
      return {
        ...prev,
        activeGame: { ...prev.activeGame, rounds: nextRounds },
      };
    });
  }

  function endGameEarly() {
    setStoredState((prev) => {
      if (!prev.activeGame) return prev;
      const totals = computeTotals(prev.activeGame);
      let winner: Game["winner"] = "tie";
      if (totals.side1 > totals.side2) winner = "side1";
      else if (totals.side2 > totals.side1) winner = "side2";
      const completed: Game = {
        ...prev.activeGame,
        winner,
        completedAt: new Date().toISOString(),
      };
      return {
        activeGame: null,
        history: [completed, ...prev.history],
      };
    });
  }

  function abandonGame() {
    if (!activeGame) return;
    if (typeof window !== "undefined") {
      const ok = window.confirm("Abandon the current game without saving it?");
      if (!ok) return;
    }
    setStoredState((prev) => ({ ...prev, activeGame: null }));
  }

  function deleteHistoryEntry(id: string) {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Delete this game from history?");
      if (!ok) return;
    }
    setStoredState((prev) => ({
      ...prev,
      history: prev.history.filter((g) => g.id !== id),
    }));
  }

  function clearHistory() {
    if (typeof window !== "undefined") {
      const ok = window.confirm("Clear all saved games? This cannot be undone.");
      if (!ok) return;
    }
    setStoredState((prev) => ({ ...prev, history: [] }));
  }

  return (
    <div className="flex flex-col gap-4">
      {activeGame ? (
        <ActiveGameCard
          game={activeGame}
          totals={totals}
          onAddRound={addRound}
          onUndo={undoLastRound}
          onEnd={endGameEarly}
          onAbandon={abandonGame}
        />
      ) : (
        <NewGameForm onStart={startGame} />
      )}

      <HistoryList
        history={state.history}
        onDelete={deleteHistoryEntry}
        onClearAll={clearHistory}
      />
    </div>
  );
}

function NewGameForm({
  onStart,
}: {
  onStart: (input: {
    mode: GameMode;
    side1Name: string;
    side2Name: string;
    targetScore: number;
    totalRounds: number;
  }) => void;
}) {
  const [mode, setMode] = useState<GameMode>("conventional");
  const [side1Name, setSide1Name] = useState("");
  const [side2Name, setSide2Name] = useState("");
  const [targetScore, setTargetScore] = useState(100);
  const [totalRounds, setTotalRounds] = useState(4);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">New game</h2>
      <form
        className="mt-4 grid gap-4 sm:grid-cols-2"
        onSubmit={(event) => {
          event.preventDefault();
          onStart({ mode, side1Name, side2Name, targetScore, totalRounds });
        }}
      >
        <div className="sm:col-span-2">
          <label className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Mode
          </label>
          <div className="mt-1 inline-flex rounded-full border border-zinc-300 bg-white p-1 dark:border-zinc-700 dark:bg-zinc-950">
            <button
              type="button"
              onClick={() => setMode("conventional")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                mode === "conventional"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Conventional
            </button>
            <button
              type="button"
              onClick={() => setMode("tournament")}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
                mode === "tournament"
                  ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                  : "text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              }`}
            >
              Tournament
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="side1Name" className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Side 1 name
          </label>
          <input
            id="side1Name"
            type="text"
            value={side1Name}
            onChange={(event) => setSide1Name(event.target.value)}
            placeholder="Patrick"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
          />
        </div>
        <div>
          <label htmlFor="side2Name" className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            Side 2 name
          </label>
          <input
            id="side2Name"
            type="text"
            value={side2Name}
            onChange={(event) => setSide2Name(event.target.value)}
            placeholder="Opponent"
            className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
          />
        </div>

        {mode === "conventional" ? (
          <div>
            <label htmlFor="targetScore" className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Target score
            </label>
            <input
              id="targetScore"
              type="number"
              min={5}
              step={5}
              value={targetScore}
              onChange={(event) => setTargetScore(Math.max(5, Number(event.target.value) || 100))}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-100"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">First to this total wins.</p>
          </div>
        ) : (
          <div>
            <label htmlFor="totalRounds" className="block text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
              Number of rounds
            </label>
            <input
              id="totalRounds"
              type="number"
              min={1}
              max={20}
              value={totalRounds}
              onChange={(event) => setTotalRounds(Math.min(20, Math.max(1, Number(event.target.value) || 4)))}
              className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 outline-none focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:focus:border-zinc-100"
            />
            <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-500">
              Each round: winner +2, tie 1-1, loser 0.
            </p>
          </div>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            className="w-full rounded-full bg-zinc-900 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 sm:w-auto"
          >
            Start game
          </button>
        </div>
      </form>
    </section>
  );
}

function ActiveGameCard({
  game,
  totals,
  onAddRound,
  onUndo,
  onEnd,
  onAbandon,
}: {
  game: Game;
  totals: { side1: number; side2: number };
  onAddRound: (round: Round) => void;
  onUndo: () => void;
  onEnd: () => void;
  onAbandon: () => void;
}) {
  const [side1Input, setSide1Input] = useState("");
  const [side2Input, setSide2Input] = useState("");
  const [error, setError] = useState<string | null>(null);

  const roundNumber = game.rounds.length + 1;

  const remaining =
    game.mode === "conventional"
      ? null
      : Math.max(0, game.totalRounds - game.rounds.length);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const s1 = Number(side1Input);
    const s2 = Number(side2Input);
    if (!Number.isFinite(s1) || !Number.isFinite(s2) || s1 < 0 || s2 < 0) {
      setError("Enter non-negative numbers for both sides.");
      return;
    }
    if (!Number.isInteger(s1) || !Number.isInteger(s2)) {
      setError("Round points must be whole numbers.");
      return;
    }
    setError(null);
    onAddRound({ side1: s1, side2: s2 });
    setSide1Input("");
    setSide2Input("");
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Active game</h2>
          <p className="text-xs text-zinc-500 dark:text-zinc-500">
            {game.mode === "conventional"
              ? `Conventional · play to ${game.targetScore}`
              : `Tournament · ${game.totalRounds} rounds`}
          </p>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">Started {formatDate(game.createdAt)}</p>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <ScoreTile name={game.side1Name} value={totals.side1} />
        <ScoreTile name={game.side2Name} value={totals.side2} />
      </div>

      {remaining !== null ? (
        <p className="mt-2 text-center text-xs text-zinc-500 dark:text-zinc-500">
          {remaining === 0
            ? "All rounds played — end the game to record the result."
            : `${remaining} ${remaining === 1 ? "round" : "rounds"} remaining`}
        </p>
      ) : null}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3">
        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
          Round {roundNumber} — board points
        </p>
        <div className="grid grid-cols-2 gap-3">
          <RoundInput
            label={game.side1Name}
            value={side1Input}
            onChange={setSide1Input}
            id="round-side1"
          />
          <RoundInput
            label={game.side2Name}
            value={side2Input}
            onChange={setSide2Input}
            id="round-side2"
          />
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-500">
          Enter each side&apos;s total board points for the round (5s + 10s + 15s + 20s).
          {game.mode === "conventional"
            ? " The app applies cancellation."
            : " The app awards 2/1/0 round points automatically."}
        </p>
        {error ? <p className="text-sm text-red-600 dark:text-red-400">{error}</p> : null}
        <div className="flex flex-wrap gap-2">
          <button
            type="submit"
            disabled={remaining === 0}
            className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Save round
          </button>
          <button
            type="button"
            onClick={onUndo}
            disabled={game.rounds.length === 0}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Undo last round
          </button>
          <button
            type="button"
            onClick={onEnd}
            disabled={game.rounds.length === 0}
            className="rounded-full border border-zinc-300 bg-white px-4 py-2 text-sm font-medium text-zinc-800 transition hover:bg-zinc-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            End game now
          </button>
          <button
            type="button"
            onClick={onAbandon}
            className="rounded-full border border-transparent px-4 py-2 text-sm font-medium text-zinc-500 transition hover:text-red-600 dark:text-zinc-500 dark:hover:text-red-400"
          >
            Abandon
          </button>
        </div>
      </form>

      {game.rounds.length > 0 ? (
        <RoundsTable game={game} />
      ) : null}
    </section>
  );
}

function ScoreTile({ name, value }: { name: string; value: number }) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-3 text-center dark:border-zinc-800 dark:bg-zinc-950">
      <p className="truncate text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
        {name}
      </p>
      <p className="mt-1 text-4xl font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
    </div>
  );
}

function RoundInput({
  label,
  value,
  onChange,
  id,
}: {
  label: string;
  value: string;
  onChange: (next: string) => void;
  id: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="block truncate text-xs font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        step={5}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="0"
        className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-base tabular-nums text-zinc-900 outline-none placeholder:text-zinc-400 focus:border-zinc-900 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100"
      />
    </div>
  );
}

type RoundRow = {
  index: number;
  round: Round;
  award1: number;
  award2: number;
  runningS1: number;
  runningS2: number;
};

function buildRoundRows(game: Game): RoundRow[] {
  const isConventional = game.mode === "conventional";
  let runningS1 = 0;
  let runningS2 = 0;
  return game.rounds.map((round, index) => {
    let award1 = 0;
    let award2 = 0;
    if (isConventional) {
      const diff = round.side1 - round.side2;
      if (diff > 0) award1 = diff;
      else if (diff < 0) award2 = -diff;
    } else if (round.side1 > round.side2) {
      award1 = 2;
    } else if (round.side2 > round.side1) {
      award2 = 2;
    } else {
      award1 = 1;
      award2 = 1;
    }
    runningS1 += award1;
    runningS2 += award2;
    return { index, round, award1, award2, runningS1, runningS2 };
  });
}

function RoundsTable({ game }: { game: Game }) {
  const rows = buildRoundRows(game);
  return (
    <div className="mt-5 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800">
      <table className="w-full text-sm">
        <thead className="bg-zinc-50 text-left text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-950 dark:text-zinc-400">
          <tr>
            <th className="px-3 py-2 font-medium">Round</th>
            <th className="px-3 py-2 font-medium">{game.side1Name}</th>
            <th className="px-3 py-2 font-medium">{game.side2Name}</th>
            <th className="px-3 py-2 font-medium">Awarded</th>
            <th className="px-3 py-2 font-medium">Total</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
          {rows.map((row) => (
            <tr key={row.index} className="text-zinc-800 dark:text-zinc-200">
              <td className="px-3 py-2 text-zinc-500 dark:text-zinc-500">{row.index + 1}</td>
              <td className="px-3 py-2 tabular-nums">{row.round.side1}</td>
              <td className="px-3 py-2 tabular-nums">{row.round.side2}</td>
              <td className="px-3 py-2 tabular-nums">
                <span className={row.award1 > row.award2 ? "font-medium" : ""}>{row.award1}</span>
                <span className="text-zinc-400 dark:text-zinc-600"> · </span>
                <span className={row.award2 > row.award1 ? "font-medium" : ""}>{row.award2}</span>
              </td>
              <td className="px-3 py-2 tabular-nums text-zinc-600 dark:text-zinc-400">
                {row.runningS1}–{row.runningS2}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function HistoryList({
  history,
  onDelete,
  onClearAll,
}: {
  history: Game[];
  onDelete: (id: string) => void;
  onClearAll: () => void;
}) {
  if (history.length === 0) {
    return (
      <section className="rounded-2xl border border-dashed border-zinc-300 bg-white p-5 text-center text-sm text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-500">
        No completed games yet.
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
          Past games <span className="text-sm font-normal text-zinc-500 dark:text-zinc-500">({history.length})</span>
        </h2>
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-medium text-zinc-500 underline hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
        >
          Clear all
        </button>
      </div>
      <ul className="mt-3 divide-y divide-zinc-100 dark:divide-zinc-800">
        {history.map((game) => {
          const totals = computeTotals(game);
          const winnerName =
            game.winner === "side1"
              ? game.side1Name
              : game.winner === "side2"
                ? game.side2Name
                : "Tie";
          const finishedAt = game.completedAt ?? game.createdAt;
          return (
            <li key={game.id} className="py-3">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">
                    {game.side1Name} {totals.side1}
                    <span className="text-zinc-400 dark:text-zinc-600"> – </span>
                    {totals.side2} {game.side2Name}
                  </p>
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    {game.mode === "conventional" ? `Conv. to ${game.targetScore}` : `Tournament · ${game.rounds.length}/${game.totalRounds} rounds`}
                    {" · "}
                    {game.winner === "tie" ? "Tied" : `Winner: ${winnerName}`}
                    {" · "}
                    {formatDate(finishedAt)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onDelete(game.id)}
                  className="text-xs font-medium text-zinc-500 underline hover:text-red-600 dark:text-zinc-400 dark:hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
