import styled from "styled-components";

export const HelpButton = styled.button`
  position: absolute;

  top: 8px;
  right: 8px;

  width: 24px;
  height: 24px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 2px solid #ffffff80;
  border-radius: 50%;

  background: #00000040;

  color: #fff;

  font-size: 15px;
  font-weight: bold;

  cursor: pointer;

  transition:
    background-color 150ms ease,
    transform 150ms ease,
    border-color 150ms ease;

  &:hover {
    background: #00000070;
    border-color: #fff;
    transform: scale(1.1);
  }
`;

export const HelpOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(4px);
`;

export const HelpModalContainer = styled.div`
  position: relative;

  width: min(100%, 420px);
  max-height: 90vh;

  overflow-y: auto;

  padding: 28px;

  border-radius: 14px;

  background: linear-gradient(145deg, #3c3c3c, #242424);

  color: #fff;

  direction: rtl;
  text-align: right;

  box-shadow:
    0 20px 50px rgba(0, 0, 0, 0.6),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
`;

export const HelpCloseButton = styled.button`
  position: absolute;

  top: 10px;
  left: 12px;

  width: 32px;
  height: 32px;

  display: flex;
  align-items: center;
  justify-content: center;

  border: 0;
  border-radius: 50%;

  background: rgba(255, 255, 255, 0.08);

  color: #fff;

  font-size: 24px;
  line-height: 1;

  cursor: pointer;

  transition:
    background 150ms ease,
    transform 150ms ease;

  &:hover {
    background: rgba(255, 255, 255, 0.18);
    transform: scale(1.05);
  }
`;

export const HelpTitle = styled.h2`
  margin: 0 0 16px;

  font-size: 24px;
  font-weight: 700;

  text-align: center;
`;

export const HelpIntro = styled.p`
  margin: 0 0 24px;

  color: #ddd;

  font-size: 15px;
  line-height: 1.9;

  text-align: center;
`;

export const HelpSection = styled.div`
  margin-top: 22px;

  h3 {
    margin: 0 0 10px;

    font-size: 16px;
    font-weight: 700;
  }

  p {
    margin: 0;

    color: #d1d1d1;

    font-size: 14px;
    line-height: 1.9;
  }

  ol {
    margin: 0;
    padding-right: 22px;

    color: #d1d1d1;

    font-size: 14px;
    line-height: 2;
  }
`;

export const HelpResult = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  margin-top: 12px;
  padding: 10px 12px;

  border-radius: 8px;

  background: rgba(255, 255, 255, 0.06);

  div {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  strong {
    font-size: 14px;
  }

  span:not(.dot) {
    color: #bbb;

    font-size: 12px;
  }
`;

export const HelpDot = styled.span<{ color: string }>`
  flex: 0 0 auto;

  width: 16px;
  height: 16px;

  border-radius: 50%;

  background: ${({ color }) => color};

  box-shadow:
    inset -2px -2px 4px rgba(0, 0, 0, 0.5),
    1px 1px 3px rgba(0, 0, 0, 0.5);
`;

export const HelpAction = styled.button`
  width: 100%;

  margin-top: 26px;
  padding: 10px 16px;

  border: 0;
  border-radius: 8px;

  background: #27bad4;

  color: #fff;

  font-size: 14px;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 150ms ease,
    transform 150ms ease;

  &:hover {
    background: #20a9c1;
    transform: translateY(-1px);
  }
`;
