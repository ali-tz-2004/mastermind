export enum Colors {
  Red = "#da1212",
  Green = "#147414",
  White = "#b1b0b0",
  Blue = "#2929a0",
  Yellow = "#bebe2e",
  Black = "#1f1f1f",
}

export enum ColorsResult {
  White = "#c4c4c4",
  Black = "#000",
}

export enum GameOver {
  Win,
  Lose,
  Playing,
}

export interface IColor {
  key: number;
  value: Colors;
}

export interface IPuzzleCell {
  index: number;
  StatusColor: Colors;
}

export interface ICell {
  index: number;
  mainCells: InnerCell[];
  resultCells: InnerResultCell[];
  isFill: boolean;
  isDone: boolean;
}

export interface InnerCell {
  Index: number;
  StatusColor?: Colors;
}

export interface InnerResultCell {
  Index: number;
  StatusColor?: ColorsResult;
}

export interface ICheck {
  index: number;
  margin: number;
  visible: boolean;
}
