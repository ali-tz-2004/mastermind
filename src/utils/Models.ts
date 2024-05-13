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
  Index: number;
  StatusColor?: Colors;
}

export interface ICheck {
  margin: number;
  visible: boolean;
}
