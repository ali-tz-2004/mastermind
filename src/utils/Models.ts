export enum Colors {
  Red = "red",
  Green = "green",
  White = "#c4c4c4",
  Blue = "blue",
  Yellow = "#dada00",
  Black = "#000",
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
