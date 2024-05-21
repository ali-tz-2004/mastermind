import styled, { keyframes } from "styled-components";
import imgPanel from "../assets/images/Panel.jpg";
import imgBackground from "../assets/images/Background.jpg";
import { Colors, ColorsResult } from "../utils/Models";

interface INut {
  marginBottom?: number;
  backgroundColorCell?: Colors;
}

interface INutResult {
  marginBottom?: number;
  backgroundColorCell?: ColorsResult;
}

interface ITagCell {
  color: string;
}

interface IIconImage {
  bottom: number;
}

const shadowColor = "#000000a8";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

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
  padding-top: 53px;
  .empty {
    opacity: 0;
  }
`;

export const Nut = styled.div<INut>`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  background-image: url(${imgBackground});
  box-shadow: inset 5px 5px 5px 2px #000, 2px 2px 5px 1px #000000;
  border: 3.5px solid #00000030;
  transition: background-color 0.3s, box-shadow 0.3s, border 0.3s;

  ${({ backgroundColorCell }) =>
    backgroundColorCell &&
    `
    background: #fff;
    box-shadow: inset -2px -2px 5px 7px ${backgroundColorCell}, 2px 2px 5px 1px #000;
    border: 0 solid ${backgroundColorCell};
  `};

  display: flex;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  cursor: pointer;
  color: white;
  animation: ${fadeIn} 300ms ease-in-out;
`;

export const NutSmall = styled.div<INutResult>`
  height: 10px;
  width: 10px;
  border-radius: 50%;
  background-image: url(${imgBackground});
  box-shadow: inset 2px 2px 2px 1px #000;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  border: 2px solid #00000030;
  position: relative;
  /* animation: ${pulse} 1s infinite; */
  animation: ${fadeIn} 300ms ease-in-out;
`;

export const NutSmallOut = styled.div<INutResult>`
  position: absolute;
  background-color: ${({ backgroundColorCell }) =>
    `${backgroundColorCell === ColorsResult.White ? "#fff" : "#494949"}`};
  height: 11px;
  width: 11px;
  border-radius: 50%;
  top: -3px;
  left: -3px;
  box-shadow: inset -2px -2px 5px 0.5px
      ${({ backgroundColorCell }) => `${backgroundColorCell}`},
    5px 5px 5px 1px #000;
  animation: ${fadeIn} 300ms ease-in-out;
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
    `inset -2px -2px 5px 6px ${color}, 2px 2px 5px 1px #000`};
  cursor: pointer;
  transition: transform 200ms;
  &:hover {
    transform: scale(1.1);
  }
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
  bottom: ${({ bottom }) => `${bottom}px`};
  right: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const EndGame = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #000;
  opacity: 75%;
  color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: #fff;

  animation: show 150ms ease-in-out;
  transition: opacity 500ms ease-in-out, transform 500ms ease-in-out;
  @keyframes show {
    0% {
      opacity: 0.5;
      transform: scale(0);
    }
    100% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .gameOver {
    font-size: 50px;
  }

  button {
    margin-top: 1rem;
    background-color: transparent;
    border: 3px solid #fff;
    padding: 7px 18px;
    border-radius: 5px;
    color: #fff;
    border-radius: 10px;
  }
`;
