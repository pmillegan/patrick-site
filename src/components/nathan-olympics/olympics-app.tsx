"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import {
  olympicsEvents,
  sessionLabels,
  sessionOrder,
  TEAM_SIZE,
  type OlympicsEvent,
  type OlympicsSession,
} from "@/data/nathan-olympics-events";
import {
  computeStandings,
  createTeam,
  formatScoring,
  getEventResult,
  getOlympicsServerSnapshot,
  getOlympicsSnapshot,
  getTeamById,
  isEventScored,
  setOlympicsState,
  shuffleIntoTeams,
  subscribeOlympics,
  type EventPlacements,
  type Team,
} from "@/lib/nathan-olympics-store";

type Tab = "teams" | "leaderboard" | "events";

const tabLabels: Record<Tab, string> = {
  teams: "Teams",
  leaderboard: "Leaderboard",
  events: "Events",
};

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
          : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
      }`}
    >
      {children}
    </button>
  );
}

function TeamBadge({ team, size = "sm" }: { team: Team; size?: "sm" | "md" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium ${
        size === "md" ? "text-base" : "text-sm"
      }`}
    >
      <span
        className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: team.color }}
        aria-hidden
      />
      {team.name}
    </span>
  );
}

function SelectTeam({
  value,
  onChange,
  teams,
  placeholder,
  excludeIds = [],
}: {
  value: string;
  onChange: (teamId: string) => void;
  teams: Team[];
  placeholder: string;
  excludeIds?: string[];
}) {
  const options = teams.filter((t) => !excludeIds.includes(t.id) || t.id === value);
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
    >
      <option value="">{placeholder}</option>
      {options.map((team) => (
        <option key={team.id} value={team.id}>
          {team.name}
        </option>
      ))}
    </select>
  );
}

function TeamsPanel() {
  const state = useSyncExternalStore(
    subscribeOlympics,
    getOlympicsSnapshot,
    getOlympicsServerSnapshot,
  );
  const [newTeamName, setNewTeamName] = useState("");
  const [playerPool, setPlayerPool] = useState("");
  const [teamSize, setTeamSize] = useState(TEAM_SIZE);

  const addTeam = () => {
    const name = newTeamName.trim() || `Team ${state.teams.length + 1}`;
    setOlympicsState((prev) => ({
      ...prev,
      teams: [...prev.teams, createTeam(name, teamSize)],
    }));
    setNewTeamName("");
  };

  const updateTeam = (teamId: string, patch: Partial<Team>) => {
    setOlympicsState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => (t.id === teamId ? { ...t, ...patch } : t)),
    }));
  };

  const updateMember = (teamId: string, index: number, value: string) => {
    setOlympicsState((prev) => ({
      ...prev,
      teams: prev.teams.map((t) => {
        if (t.id !== teamId) return t;
        const members = [...t.members];
        members[index] = value;
        return { ...t, members };
      }),
    }));
  };

  const removeTeam = (teamId: string) => {
    setOlympicsState((prev) => ({
      teams: prev.teams.filter((t) => t.id !== teamId),
      results: prev.results.map((r) => ({
        ...r,
        placements: {
          first: r.placements.first === teamId ? undefined : r.placements.first,
          second:
            r.placements.second === teamId ? undefined : r.placements.second,
          third: r.placements.third === teamId ? undefined : r.placements.third,
        },
        customScores: Object.fromEntries(
          Object.entries(r.customScores).filter(([id]) => id !== teamId),
        ),
      })),
    }));
  };

  const drawFromHat = () => {
    const names = playerPool.split("\n");
    const teams = shuffleIntoTeams(names, teamSize);
    if (teams.length === 0) return;
    setOlympicsState((prev) => ({
      ...prev,
      teams,
      results: [],
    }));
    setPlayerPool("");
  };

  return (
    <div className="space-y-6">
      <section className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800/50">
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Draw teams from a hat
        </h3>
        <p className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          Paste one name per line, then shuffle into teams of {teamSize}.
        </p>
        <textarea
          value={playerPool}
          onChange={(e) => setPlayerPool(e.target.value)}
          rows={4}
          placeholder={"Nathan\nAlex\nJordan\n..."}
          className="mt-3 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-900"
        />
        <div className="mt-3 flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-zinc-700 dark:text-zinc-300">
            Team size
            <input
              type="number"
              min={2}
              max={10}
              value={teamSize}
              onChange={(e) => setTeamSize(Number(e.target.value) || TEAM_SIZE)}
              className="w-16 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-sm dark:border-zinc-700 dark:bg-zinc-900"
            />
          </label>
          <button
            type="button"
            onClick={drawFromHat}
            disabled={!playerPool.trim()}
            className="rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white disabled:opacity-40 dark:bg-zinc-100 dark:text-zinc-900"
          >
            Shuffle into teams
          </button>
        </div>
      </section>

      <section>
        <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
          Add a team manually
        </h3>
        <div className="mt-3 flex flex-wrap gap-2">
          <input
            type="text"
            value={newTeamName}
            onChange={(e) => setNewTeamName(e.target.value)}
            placeholder="Team name (optional)"
            className="min-w-[12rem] flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm dark:border-zinc-700 dark:bg-zinc-800"
          />
          <button
            type="button"
            onClick={addTeam}
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800"
          >
            Add team
          </button>
        </div>
      </section>

      {state.teams.length === 0 ? (
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          No teams yet. Draw from a hat or add teams manually.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {state.teams.map((team) => (
            <article
              key={team.id}
              className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
              style={{ borderLeftWidth: 4, borderLeftColor: team.color }}
            >
              <div className="flex items-start justify-between gap-2">
                <input
                  type="text"
                  value={team.name}
                  onChange={(e) => updateTeam(team.id, { name: e.target.value })}
                  className="w-full rounded-lg border border-transparent bg-transparent px-1 py-0.5 text-lg font-semibold text-zinc-900 hover:border-zinc-200 focus:border-zinc-300 dark:text-zinc-100 dark:hover:border-zinc-700"
                />
                <button
                  type="button"
                  onClick={() => removeTeam(team.id)}
                  className="shrink-0 text-xs text-zinc-400 hover:text-red-500"
                  aria-label={`Remove ${team.name}`}
                >
                  Remove
                </button>
              </div>
              <ul className="mt-3 space-y-2">
                {team.members.map((member, index) => (
                  <li key={index}>
                    <input
                      type="text"
                      value={member}
                      onChange={(e) =>
                        updateMember(team.id, index, e.target.value)
                      }
                      placeholder={`Player ${index + 1}`}
                      className="w-full rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm dark:border-zinc-700 dark:bg-zinc-800"
                    />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

function LeaderboardPanel() {
  const state = useSyncExternalStore(
    subscribeOlympics,
    getOlympicsSnapshot,
    getOlympicsServerSnapshot,
  );
  const standings = useMemo(() => computeStandings(state), [state]);
  const scoredCount = olympicsEvents.filter((e) =>
    isEventScored(e, getEventResult(state, e.id)),
  ).length;

  if (state.teams.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Set up teams first to see the leaderboard.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        {scoredCount} of {olympicsEvents.length} events scored
      </p>
      <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-700">
        <table className="w-full min-w-[32rem] text-left text-sm">
          <thead className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                Rank
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                Team
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                Points
              </th>
              <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-zinc-100">
                Medals
              </th>
            </tr>
          </thead>
          <tbody>
            {standings.map((row, index) => (
              <tr
                key={row.team.id}
                className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
              >
                <td className="px-4 py-3 font-medium text-zinc-500">
                  {index + 1}
                  {index === 0 && scoredCount > 0 ? " 🏆" : ""}
                </td>
                <td className="px-4 py-3">
                  <TeamBadge team={row.team} size="md" />
                </td>
                <td className="px-4 py-3 text-lg font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
                  {row.totalPoints}
                </td>
                <td className="px-4 py-3 text-zinc-600 dark:text-zinc-400">
                  <span className="tabular-nums">
                    🥇 {row.medals.gold} · 🥈 {row.medals.silver} · 🥉{" "}
                    {row.medals.bronze}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function BoxScore({
  event,
  teams,
}: {
  event: OlympicsEvent;
  teams: Team[];
}) {
  const state = useSyncExternalStore(
    subscribeOlympics,
    getOlympicsSnapshot,
    getOlympicsServerSnapshot,
  );
  const result = getEventResult(state, event.id);
  const scored = isEventScored(event, result);

  const rows = useMemo(() => {
    if (event.scoring.type === "custom") {
      return teams
        .map((team) => ({
          team,
          place: null as number | null,
          points: result.customScores[team.id] ?? 0,
        }))
        .filter((r) => r.points > 0)
        .sort((a, b) => b.points - a.points);
    }

    const places: Array<{ place: number; teamId: string; points: number }> = [];
    if (result.placements.first) {
      places.push({
        place: 1,
        teamId: result.placements.first,
        points: event.scoring.first,
      });
    }
    if (result.placements.second) {
      places.push({
        place: 2,
        teamId: result.placements.second,
        points: event.scoring.second,
      });
    }
    if (result.placements.third) {
      places.push({
        place: 3,
        teamId: result.placements.third,
        points: event.scoring.third,
      });
    }
    return places
      .map((p) => ({
        team: getTeamById(state, p.teamId),
        place: p.place,
        points: p.points,
      }))
      .filter((r): r is { team: Team; place: number; points: number } =>
        Boolean(r.team),
      );
  }, [event, result, state, teams]);

  if (!scored) {
    return (
      <p className="text-xs text-zinc-500 dark:text-zinc-400">Not scored yet</p>
    );
  }

  return (
    <div className="mt-3 overflow-x-auto rounded-lg border border-zinc-200 dark:border-zinc-700">
      <table className="w-full text-left text-sm">
        <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-800/50">
          <tr>
            <th className="px-3 py-2">Place</th>
            <th className="px-3 py-2">Team</th>
            <th className="px-3 py-2">Pts</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.team.id}
              className="border-t border-zinc-100 dark:border-zinc-800"
            >
              <td className="px-3 py-2 tabular-nums text-zinc-500">
                {row.place ?? "—"}
              </td>
              <td className="px-3 py-2">
                <TeamBadge team={row.team} />
              </td>
              <td className="px-3 py-2 font-semibold tabular-nums">
                {row.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function EventScoringForm({
  event,
  teams,
}: {
  event: OlympicsEvent;
  teams: Team[];
}) {
  const state = useSyncExternalStore(
    subscribeOlympics,
    getOlympicsSnapshot,
    getOlympicsServerSnapshot,
  );
  const result = getEventResult(state, event.id);

  const updatePlacements = (placements: EventPlacements) => {
    setOlympicsState((prev) => {
      const existing = getEventResult(prev, event.id);
      const nextResults = prev.results.filter((r) => r.eventId !== event.id);
      nextResults.push({ ...existing, placements });
      return { ...prev, results: nextResults };
    });
  };

  const updateCustomScore = (teamId: string, points: number) => {
    setOlympicsState((prev) => {
      const existing = getEventResult(prev, event.id);
      const customScores = { ...existing.customScores, [teamId]: points };
      const nextResults = prev.results.filter((r) => r.eventId !== event.id);
      nextResults.push({ ...existing, customScores });
      return { ...prev, results: nextResults };
    });
  };

  const clearResult = () => {
    setOlympicsState((prev) => ({
      ...prev,
      results: prev.results.filter((r) => r.eventId !== event.id),
    }));
  };

  if (event.scoring.type === "custom") {
    return (
      <div className="mt-4 space-y-3">
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          Enter points for each team
        </p>
        {teams.map((team) => (
          <label
            key={team.id}
            className="flex items-center justify-between gap-3 text-sm"
          >
            <TeamBadge team={team} />
            <input
              type="number"
              min={0}
              value={result.customScores[team.id] ?? ""}
              onChange={(e) =>
                updateCustomScore(team.id, Number(e.target.value) || 0)
              }
              className="w-20 rounded-lg border border-zinc-200 bg-white px-2 py-1 text-right tabular-nums dark:border-zinc-700 dark:bg-zinc-800"
            />
          </label>
        ))}
        {isEventScored(event, result) && (
          <button
            type="button"
            onClick={clearResult}
            className="text-xs text-zinc-400 hover:text-red-500"
          >
            Clear scores
          </button>
        )}
      </div>
    );
  }

  const { first, second, third } = result.placements;

  return (
    <div className="mt-4 grid gap-3 sm:grid-cols-3">
      <label className="space-y-1">
        <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
          🥇 1st ({event.scoring.first} pts)
        </span>
        <SelectTeam
          value={first ?? ""}
          onChange={(id) =>
            updatePlacements({
              ...result.placements,
              first: id || undefined,
            })
          }
          teams={teams}
          placeholder="Select team"
          excludeIds={[second ?? "", third ?? ""].filter(Boolean)}
        />
      </label>
      <label className="space-y-1">
        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
          🥈 2nd ({event.scoring.second} pts)
        </span>
        <SelectTeam
          value={second ?? ""}
          onChange={(id) =>
            updatePlacements({
              ...result.placements,
              second: id || undefined,
            })
          }
          teams={teams}
          placeholder="Select team"
          excludeIds={[first ?? "", third ?? ""].filter(Boolean)}
        />
      </label>
      <label className="space-y-1">
        <span className="text-xs font-medium text-amber-700 dark:text-amber-600">
          🥉 3rd ({event.scoring.third} pts)
        </span>
        <SelectTeam
          value={third ?? ""}
          onChange={(id) =>
            updatePlacements({
              ...result.placements,
              third: id || undefined,
            })
          }
          teams={teams}
          placeholder="Select team"
          excludeIds={[first ?? "", second ?? ""].filter(Boolean)}
        />
      </label>
      {isEventScored(event, result) && (
        <div className="sm:col-span-3">
          <button
            type="button"
            onClick={clearResult}
            className="text-xs text-zinc-400 hover:text-red-500"
          >
            Clear placements
          </button>
        </div>
      )}
    </div>
  );
}

function EventsPanel() {
  const state = useSyncExternalStore(
    subscribeOlympics,
    getOlympicsSnapshot,
    getOlympicsServerSnapshot,
  );
  const [expandedId, setExpandedId] = useState<string | null>(
    olympicsEvents[0]?.id ?? null,
  );
  const [view, setView] = useState<"score" | "boxscores">("score");

  const eventsBySession = useMemo(() => {
    const grouped = new Map<OlympicsSession, OlympicsEvent[]>();
    for (const session of sessionOrder) grouped.set(session, []);
    for (const event of olympicsEvents) {
      grouped.get(event.session)?.push(event);
    }
    return grouped;
  }, []);

  if (state.teams.length === 0) {
    return (
      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        Set up teams first before scoring events.
      </p>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <TabButton active={view === "score"} onClick={() => setView("score")}>
          Score events
        </TabButton>
        <TabButton
          active={view === "boxscores"}
          onClick={() => setView("boxscores")}
        >
          Box scores
        </TabButton>
      </div>

      {sessionOrder.map((session) => {
        const events = eventsBySession.get(session) ?? [];
        if (events.length === 0) return null;

        return (
          <section key={session}>
            <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {sessionLabels[session]}
            </h3>
            <div className="space-y-3">
              {events.map((event) => {
                const result = getEventResult(state, event.id);
                const scored = isEventScored(event, result);
                const expanded = expandedId === event.id;

                if (view === "boxscores") {
                  return (
                    <article
                      key={event.id}
                      className="rounded-xl border border-zinc-200 p-4 dark:border-zinc-700"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                            {event.name}
                          </h4>
                          <p className="mt-0.5 text-xs text-zinc-500">
                            {event.instructions} · {formatScoring(event)}
                          </p>
                        </div>
                        {scored ? (
                          <span className="shrink-0 rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                            Scored
                          </span>
                        ) : (
                          <span className="shrink-0 rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-800">
                            Pending
                          </span>
                        )}
                      </div>
                      <BoxScore event={event} teams={state.teams} />
                    </article>
                  );
                }

                return (
                  <article
                    key={event.id}
                    className="rounded-xl border border-zinc-200 dark:border-zinc-700"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedId(expanded ? null : event.id)
                      }
                      className="flex w-full items-start justify-between gap-3 p-4 text-left"
                    >
                      <div>
                        <h4 className="font-semibold text-zinc-900 dark:text-zinc-100">
                          {event.name}
                        </h4>
                        <p className="mt-0.5 text-xs text-zinc-500">
                          {event.instructions} · {formatScoring(event)}
                        </p>
                      </div>
                      <div className="flex shrink-0 items-center gap-2">
                        {scored && (
                          <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/40 dark:text-green-300">
                            Scored
                          </span>
                        )}
                        <span className="text-zinc-400">{expanded ? "−" : "+"}</span>
                      </div>
                    </button>
                    {expanded && (
                      <div className="border-t border-zinc-200 px-4 pb-4 dark:border-zinc-700">
                        <EventScoringForm event={event} teams={state.teams} />
                        <BoxScore event={event} teams={state.teams} />
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}

export default function OlympicsApp() {
  const [tab, setTab] = useState<Tab>("teams");
  const state = useSyncExternalStore(
    subscribeOlympics,
    getOlympicsSnapshot,
    getOlympicsServerSnapshot,
  );

  const resetAll = () => {
    if (
      !window.confirm(
        "Reset all teams and scores? This cannot be undone.",
      )
    ) {
      return;
    }
    setOlympicsState(() => ({ teams: [], results: [] }));
    setTab("teams");
  };

  const topTeam = useMemo(() => {
    const standings = computeStandings(state);
    return standings[0];
  }, [state]);

  return (
    <section className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900 sm:p-6">
      {topTeam && topTeam.totalPoints > 0 && (
        <div
          className="mb-5 rounded-xl border px-4 py-3 text-sm"
          style={{
            borderColor: topTeam.team.color,
            backgroundColor: `${topTeam.team.color}15`,
          }}
        >
          <span className="font-medium text-zinc-900 dark:text-zinc-100">
            Current leader:{" "}
          </span>
          <TeamBadge team={topTeam.team} size="md" />
          <span className="ml-2 font-semibold tabular-nums text-zinc-900 dark:text-zinc-100">
            {topTeam.totalPoints} pts
          </span>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {(Object.keys(tabLabels) as Tab[]).map((key) => (
            <TabButton
              key={key}
              active={tab === key}
              onClick={() => setTab(key)}
            >
              {tabLabels[key]}
            </TabButton>
          ))}
        </div>
        <button
          type="button"
          onClick={resetAll}
          className="text-xs text-zinc-400 hover:text-red-500"
        >
          Reset all
        </button>
      </div>

      <div className="mt-6">
        {tab === "teams" && <TeamsPanel />}
        {tab === "leaderboard" && <LeaderboardPanel />}
        {tab === "events" && <EventsPanel />}
      </div>

      <p className="mt-6 text-center text-xs text-zinc-500 dark:text-zinc-500">
        Teams and scores save to this device automatically.
      </p>
    </section>
  );
}
