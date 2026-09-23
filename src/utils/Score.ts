import { Difficulty } from "./Models";

const BASE_SCORE: Record<Difficulty, number> = {
  easy: 100,
  normal: 200,
  hard: 300,
};

const ATTEMPT_PENALTY: Record<Difficulty, number> = {
  easy: 5,
  normal: 10,
  hard: 15,
};

export const calculateScore = (
  difficulty: Difficulty,
  usedAttempts: number,
): number => {
  const baseScore = BASE_SCORE[difficulty];
  const penalty = ATTEMPT_PENALTY[difficulty];

  return Math.max(0, baseScore - usedAttempts * penalty);
};
