import { useState } from "react";
import { Difficulty } from "../../utils/Models";
import HelpModal from "../help-modal/HelpModal";
import {
  DifficultyText,
  Logo,
  MainMenuContainer,
  MenuButton,
  MenuButtons,
  Subtitle,
} from "./MainMenu.styles";
import { Capacitor } from "@capacitor/core";
import { App as CapacitorApp } from "@capacitor/app";

interface MainMenuProps {
  difficulty: Difficulty;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onStartGame: () => void;
}

function MainMenu({
  difficulty,
  onDifficultyChange,
  onStartGame,
}: MainMenuProps) {
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const difficultyLabels: Record<Difficulty, string> = {
    easy: "آسان",
    normal: "متوسط",
    hard: "سخت",
  };

  const handleDifficulty = () => {
    const difficulties: Difficulty[] = ["easy", "normal", "hard"];

    const currentIndex = difficulties.indexOf(difficulty);
    const nextIndex = (currentIndex + 1) % difficulties.length;

    onDifficultyChange(difficulties[nextIndex]);
  };

  const handleExit = async () => {
    if (Capacitor.isNativePlatform()) {
      await CapacitorApp.exitApp();
    }
  };

  return (
    <MainMenuContainer>
      <Logo>فکر و بکر</Logo>

      <Subtitle>رمز مخفی را پیدا کن!</Subtitle>

      <MenuButtons>
        <MenuButton type="button" onClick={onStartGame}>
          شروع بازی
        </MenuButton>

        <MenuButton type="button" onClick={handleDifficulty}>
          تعیین سطح سختی
          <DifficultyText>{difficultyLabels[difficulty]}</DifficultyText>
        </MenuButton>

        <MenuButton type="button" onClick={() => setIsHelpOpen(true)}>
          راهنمای بازی
        </MenuButton>

        {Capacitor.isNativePlatform() && (
          <MenuButton type="button" onClick={handleExit}>
            خروج
          </MenuButton>
        )}
      </MenuButtons>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </MainMenuContainer>
  );
}

export default MainMenu;
