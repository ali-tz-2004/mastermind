import styled from "styled-components";
import imgPanel from "../assets/images/Panel.jpg";
import imgBackground from "../assets/images/Background.jpg";
import { Colors } from "../utils/Models";

interface INut {
  marginBottom?: number;
  backgroundColorCell?: Colors;
}

interface ITagCell {
  color: string;
}

interface IIconImage {
  bottom: number;
}

const shadowColor = "#000000a8";

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Panel = styled.div`
  width: 300px;
  background-image: url(${imgPanel});
  padding: 20px;
  box-shadow: 10px 10px 30px 10px #000000cc;
  position: relative;
  outline: 5px solid #ffffff54;
`;

export const PlayGame = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Nuts = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 20px;
  column-gap: 10px;
  padding: 10px;
`;
export const NutsSmall = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  row-gap: 25px;
  column-gap: 10px;
  padding: 10px;
  .empty {
    opacity: 0;
  }
`;

export const Nut = styled.div<INut>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  ${({ backgroundColorCell }) =>
    `${
      !backgroundColorCell
        ? `background-image: url(${imgBackground});
        box-shadow: inset 5px 5px 5px 2px #000, 2px 2px 5px 1px #000000;
        border: 3.5px solid #00000030;
        `
        : `
        background: #fff;
        box-shadow: inset -2px -2px 5px 4px ${backgroundColorCell}, 2px 2px 5px 1px #000
        `
    }`};

  display: flex;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  cursor: pointer;

  color: white;
`;

export const NutSmall = styled.div<INut>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-image: url(${imgBackground});
  box-shadow: inset 2px 2px 2px 1px #000;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  border: 2px solid #00000030;
`;

export const Tag = styled.div`
  position: absolute;
  height: 30px;
  width: 140px;
  background-image: url(${imgPanel});
  box-shadow: 3px 3px 5px 1px ${shadowColor};
  top: 25px;
  left: 20px;
`;

export const TagsPanel = styled.div`
  height: 50px;
  width: 100%;
  background-image: url(${imgPanel});
  box-shadow: inset 3px 3px 5px 1px ${shadowColor};
  top: 25px;
  left: 20px;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const TagCell = styled.input<ITagCell>`
  all: unset;
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background: #fff;
  box-shadow: ${({ color }) =>
    `inset -2px -2px 5px 4px ${color}, 2px 2px 5px 1px #000`};
  cursor: pointer;
  &:checked {
    outline: 5px solid #27bad4;
  }
`;

export const Check = styled.button`
  position: absolute;
  right: 10px;
  bottom: 89px;
`;

export const IconImage = styled.div<IIconImage>`
  position: absolute;
  /* width: 30px; */
  /* height: 30px; */
  bottom: ${({ bottom }) => `${bottom}px`};
  right: 120px;
  /* background-color: red; */
  display: flex;
  align-items: center;
  justify-content: center;
`;
