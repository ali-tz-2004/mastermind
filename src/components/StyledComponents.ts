import styled from "styled-components";
import imgPanel from "../assets/images/Panel.jpg";
import imgBackground from "../assets/images/Background.jpg";

interface INut {
  marginBottom?: number;
}

const shadowColor = "#000000a8";

export const Main = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

export const Panel = styled.div`
  /* height: 600px; */
  width: 300px;
  background-image: url(${imgPanel});
  padding: 20px;
  box-shadow: 10px 10px 30px 10px #000000cc;
  position: relative;
  outline: 5px solid #ffffff54;
  /* border: 10px solid #ffffffcc; */
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
  row-gap: 20px;
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
  background-image: url(${imgBackground});
  box-shadow: inset 5px 5px 5px 2px #000, 2px 2px 5px 1px #000000;
  display: flex;
  justify-content: center;
  margin-bottom: ${({ marginBottom }) => `${marginBottom}px`};
  border: 3.5px solid #00000030;
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
  background-color: red;
  background-image: url(${imgPanel});
  box-shadow: 3px 3px 5px 1px ${shadowColor};
  top: 25px;
  left: 20px;
`;

export const TagsPanel = styled.div`
  height: 50px;
  width: 100%;
  background-color: red;
  background-image: url(${imgPanel});
  box-shadow: inset 3px 3px 5px 1px ${shadowColor};
  top: 25px;
  left: 20px;
  margin-top: 20px;
`;

export const TagCell = styled.div`
  /* position: absolute;
  height: 30px;
  width: 140px;
  background-color: red;
  background-image: url(${imgPanel});
  box-shadow: 3px 3px 5px 1px #000;
  bottom: 0;
  left: 0; */
`;
