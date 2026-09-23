import { Difficulty } from "./Models";

export const BEST_SCORE_KEY = "mastermind-best-score";

type BestScores = Record<Difficulty, number>;

const DEFAULT_BEST_SCORES: BestScores = {
  easy: 0,
  normal: 0,
  hard: 0,
};

export const getBestScores = (): BestScores => {
  const storedScores = localStorage.getItem(BEST_SCORE_KEY);

  if (!storedScores) {
    return DEFAULT_BEST_SCORES;
  }

  try {
    return {
      ...DEFAULT_BEST_SCORES,
      ...JSON.parse(storedScores),
    };
  } catch {
    return DEFAULT_BEST_SCORES;
  }
};

export const getBestScore = (difficulty: Difficulty): number => {
  const scores = getBestScores();

  return scores[difficulty];
};

export const updateBestScore = (
  difficulty: Difficulty,
  score: number,
): number => {
  const scores = getBestScores();

  if (score <= scores[difficulty]) {
    return scores[difficulty];
  }

  const updatedScores: BestScores = {
    ...scores,
    [difficulty]: score,
  };

  localStorage.setItem(BEST_SCORE_KEY, JSON.stringify(updatedScores));

  return score;
};
