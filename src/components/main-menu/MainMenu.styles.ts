import styled from "styled-components";
import Background from "../../assets/images/background-2.png";

export const MainMenuContainer = styled.main`
  min-height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 24px;
  box-sizing: border-box;

  background-image: url(${Background});

  direction: rtl;

  @media (max-width: 768px) {
    background-size: cover;
    background-position: center;
  }
`;

export const Logo = styled.h1`
  margin: 0;

  font-size: 56px;
  font-weight: 800;

  color: #fff;

  text-align: center;

  @media (max-width: 600px) {
    font-size: 42px;
  }
`;

export const Subtitle = styled.p`
  margin: 12px 0 40px;

  color: rgba(255, 255, 255, 0.75);

  font-size: 18px;
`;

export const MenuButtons = styled.div`
  width: min(360px, 100%);

  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const MenuButton = styled.button`
  width: 100%;
  min-height: 58px;

  border: none;
  border-radius: 12px;

  background: #a52a2a;
  color: #fff;

  font-size: 17px;
  font-weight: 700;

  cursor: pointer;

  transition:
    transform 0.15s ease,
    opacity 0.15s ease;

  &:hover {
    opacity: 0.9;
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const DifficultyText = styled.span`
  display: block;

  margin-top: 4px;

  font-size: 12px;
  font-weight: 400;

  opacity: 0.75;
`;
