import {
  olympicsEvents,
  teamColors,
  type OlympicsEvent,
} from "@/data/nathan-olympics-events";

export type Team = {
  id: string;
  name: string;
  members: string[];
  color: string;
};

export type EventPlacements = {
  first?: string;
  second?: string;
  third?: string;
};

export type EventResult = {
  eventId: string;
  placements: EventPlacements;
  /** Per-team points for custom-scoring events (e.g. Nathan Jeopardy). */
  customScores: Record<string, number>;
};

export type OlympicsState = {
  teams: Team[];
  results: EventResult[];
};

const STORAGE_KEY = "nathan-olympics-state-v1";

export const EMPTY_STATE: OlympicsState = { teams: [], results: [] };

function newId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
    return crypto.randomUUID();
  }
  return `id_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function readOlympicsState(): OlympicsState {
  if (typeof window === "undefined") return EMPTY_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return EMPTY_STATE;
    const parsed = JSON.parse(raw) as OlympicsState;
    if (!parsed || typeof parsed !== "object") return EMPTY_STATE;
    return {
      teams: Array.isArray(parsed.teams) ? parsed.teams : [],
      results: Array.isArray(parsed.results) ? parsed.results : [],
    };
  } catch {
    return EMPTY_STATE;
  }
}

export function writeOlympicsState(state: OlympicsState) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore quota / private mode errors
  }
}

let memoryState: OlympicsState | null = null;
const storeListeners = new Set<() => void>();

export function getOlympicsSnapshot(): OlympicsState {
  if (memoryState === null) memoryState = readOlympicsState();
  return memoryState;
}

export function getOlympicsServerSnapshot(): OlympicsState {
  return EMPTY_STATE;
}

export function subscribeOlympics(callback: () => void) {
  storeListeners.add(callback);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      memoryState = readOlympicsState();
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

export function setOlympicsState(updater: (prev: OlympicsState) => OlympicsState) {
  const current = getOlympicsSnapshot();
  const next = updater(current);
  if (next === current) return;
  memoryState = next;
  writeOlympicsState(next);
  storeListeners.forEach((listener) => listener());
}

export function getEventResult(
  state: OlympicsState,
  eventId: string,
): EventResult {
  return (
    state.results.find((r) => r.eventId === eventId) ?? {
      eventId,
      placements: {},
      customScores: {},
    }
  );
}

export function getTeamById(state: OlympicsState, teamId: string): Team | undefined {
  return state.teams.find((t) => t.id === teamId);
}

export function getPointsForPlacement(
  event: OlympicsEvent,
  place: "first" | "second" | "third",
): number {
  if (event.scoring.type === "custom") return 0;
  return event.scoring[place];
}

export function getEventTeamPoints(
  event: OlympicsEvent,
  result: EventResult,
  teamId: string,
): number {
  if (event.scoring.type === "custom") {
    return result.customScores[teamId] ?? 0;
  }
  const { placements } = result;
  if (placements.first === teamId) return event.scoring.first;
  if (placements.second === teamId) return event.scoring.second;
  if (placements.third === teamId) return event.scoring.third;
  return 0;
}

export type TeamStanding = {
  team: Team;
  totalPoints: number;
  eventWins: number;
  medals: { gold: number; silver: number; bronze: number };
  byEvent: Record<string, number>;
};

export function computeStandings(state: OlympicsState): TeamStanding[] {
  const byTeam = new Map<string, TeamStanding>();

  for (const team of state.teams) {
    byTeam.set(team.id, {
      team,
      totalPoints: 0,
      eventWins: 0,
      medals: { gold: 0, silver: 0, bronze: 0 },
      byEvent: {},
    });
  }

  for (const event of olympicsEvents) {
    const result = getEventResult(state, event.id);
    for (const team of state.teams) {
      const pts = getEventTeamPoints(event, result, team.id);
      if (pts <= 0) continue;
      const standing = byTeam.get(team.id);
      if (!standing) continue;
      standing.totalPoints += pts;
      standing.byEvent[event.id] = pts;
      if (result.placements.first === team.id) {
        standing.eventWins += 1;
        standing.medals.gold += 1;
      } else if (result.placements.second === team.id) {
        standing.medals.silver += 1;
      } else if (result.placements.third === team.id) {
        standing.medals.bronze += 1;
      }
    }
  }

  return [...byTeam.values()].sort((a, b) => {
    if (b.totalPoints !== a.totalPoints) return b.totalPoints - a.totalPoints;
    if (b.eventWins !== a.eventWins) return b.eventWins - a.eventWins;
    return a.team.name.localeCompare(b.team.name);
  });
}

export function createTeam(name: string, memberCount = 5): Team {
  const index = getOlympicsSnapshot().teams.length;
  return {
    id: newId(),
    name,
    members: Array.from({ length: memberCount }, () => ""),
    color: teamColors[index % teamColors.length],
  };
}

export function shuffleIntoTeams(
  playerNames: string[],
  teamSize: number,
): Team[] {
  const names = playerNames
    .map((n) => n.trim())
    .filter(Boolean)
    .sort(() => Math.random() - 0.5);
  const teamCount = Math.ceil(names.length / teamSize);
  const teams: Team[] = [];

  for (let i = 0; i < teamCount; i++) {
    const members = names.slice(i * teamSize, (i + 1) * teamSize);
    while (members.length < teamSize) members.push("");
    teams.push({
      id: newId(),
      name: `Team ${i + 1}`,
      members,
      color: teamColors[i % teamColors.length],
    });
  }

  return teams;
}

export function isEventScored(event: OlympicsEvent, result: EventResult): boolean {
  if (event.scoring.type === "custom") {
    return Object.values(result.customScores).some((v) => v > 0);
  }
  return Boolean(result.placements.first);
}

export function formatScoring(event: OlympicsEvent): string {
  if (event.scoring.type === "custom") return "Custom";
  const { first, second, third } = event.scoring;
  return `1st ${first} · 2nd ${second} · 3rd ${third}`;
}
