export type OlympicsSession = "AM" | "Afternoon" | "Evening" | "Special";

export type OlympicsScoring =
  | { type: "placement"; first: number; second: number; third: number }
  | { type: "custom" };

export type OlympicsEvent = {
  id: string;
  name: string;
  session: OlympicsSession;
  instructions: string;
  scoring: OlympicsScoring;
};

export const TEAM_SIZE = 5;

export const olympicsEvents: OlympicsEvent[] = [
  {
    id: "cornhole-am",
    name: "Cornhole",
    session: "AM",
    instructions: "Single elimination games",
    scoring: { type: "placement", first: 10, second: 5, third: 3 },
  },
  {
    id: "3v3-basketball",
    name: "3v3 Basketball",
    session: "AM",
    instructions: "Single elimination games",
    scoring: { type: "placement", first: 10, second: 5, third: 3 },
  },
  {
    id: "3-point-contest",
    name: "3 Point Contest",
    session: "AM",
    instructions: "Cumulate score, 10 shots per team member",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "pickleball",
    name: "Pickleball",
    session: "AM",
    instructions: "Pick 2, single elimination",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "combine",
    name: "Combine",
    session: "Afternoon",
    instructions: "Cumulative reps at 135 on bench",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "home-run-derby",
    name: "Home Run Derby",
    session: "Afternoon",
    instructions: "10 pitches, cumulative home runs across entire team",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "tug-of-war",
    name: "Tug of War",
    session: "Afternoon",
    instructions: "4v4",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "puzzle-for-time",
    name: "Puzzle for Time",
    session: "Afternoon",
    instructions: "300 pieces for time",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "beersbee",
    name: "Beersbee",
    session: "Afternoon",
    instructions: "Pick 2 to compete",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "cornhole-pm",
    name: "Cornhole",
    session: "Afternoon",
    instructions: "Pick 2 to compete",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "dizzy-bat-relay",
    name: "Dizzy Bat Relay",
    session: "Evening",
    instructions: "Cumulative team for time",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "mario-kart",
    name: "Mario Kart Challenge",
    session: "Evening",
    instructions: "Pick champion to play",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "flip-cup",
    name: "Flip Cup",
    session: "Evening",
    instructions: "Best of 3",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "nba-2k",
    name: "NBA 2K Challenge",
    session: "Evening",
    instructions: "Pick champion to play, single elimination",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "beer-pong",
    name: "Beer Pong",
    session: "Evening",
    instructions: "Pick 2 to compete, single elimination",
    scoring: { type: "placement", first: 5, second: 3, third: 1 },
  },
  {
    id: "rage-cage",
    name: "Rage Cage",
    session: "Evening",
    instructions: "Pick 4 to compete, kill cup eliminates 2 from team",
    scoring: { type: "placement", first: 10, second: 5, third: 3 },
  },
  {
    id: "nathan-jeopardy",
    name: "Nathan Jeopardy",
    session: "Special",
    instructions: "Custom scoring",
    scoring: { type: "custom" },
  },
];

export const sessionOrder: OlympicsSession[] = [
  "AM",
  "Afternoon",
  "Evening",
  "Special",
];

export const sessionLabels: Record<OlympicsSession, string> = {
  AM: "Morning",
  Afternoon: "Afternoon",
  Evening: "Evening",
  Special: "Special",
};

export const teamColors = [
  "#ef4444",
  "#3b82f6",
  "#22c55e",
  "#eab308",
  "#a855f7",
  "#f97316",
  "#06b6d4",
  "#ec4899",
];
