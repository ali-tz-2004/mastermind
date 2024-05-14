export enum Colors {
  Red = "red",
  Green = "green",
  White = "#c4c4c4",
  Blue = "blue",
  Yellow = "#cfcf02",
  Black = "#000",
}

export interface IColor {
  key: number;
  value: Colors;
}

export interface ICell {
  index: number;
  mainCells: InnerCell[];
  resultCells: InnerCell[];
  isDone: boolean;
}

export interface InnerCell {
  Index: number;
  StatusColor?: Colors;
}

export interface ICheck {
  index: number;
  margin: number;
  visible: boolean;
}
