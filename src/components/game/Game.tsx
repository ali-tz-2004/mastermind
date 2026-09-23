import React, { useCallback, useEffect, useState } from "react";
import { ColorsCells } from "../../utils/Colors";
import {
  ICell,
  IPuzzleCell,
  IColor,
  ICheck,
  GameOver,
  InnerCell,
  InnerResultCell,
  Colors,
  ColorsResult,
  Difficulty,
} from "../../utils/Models";
import { getRandomInt } from "../../utils/Utils";
import HelpModal from "../help-modal/HelpModal";
import {
  Main,
  Panel,
  HelpButton,
  PlayGame,
  Nuts,
  Nut,
  Tag,
  Check,
  IconImage,
  NutsSmall,
  NutSmall,
  NutSmallOut,
  TagsPanel,
  TagCell,
  EndGame,
  BackButton,
  Score,
} from "./Game.styles";
import { FaArrowLeft, FaCircleCheck } from "react-icons/fa6";
import { calculateScore } from "../../utils/Score";

interface GameProps {
  difficulty: Difficulty;
  onBackToMenu: () => void;
}

const Game = ({ difficulty, onBackToMenu }: GameProps) => {
  const [cells, setCells] = useState<ICell[][]>([]);
  const [cellsPuzzle, setCellsPuzzle] = useState<IPuzzleCell[]>([]);
  const [colorCell, setColorCell] = useState<IColor>();
  const [level, setLevel] = useState<number>(1);
  const [indexCell, setIndexCell] = useState<number>(0);
  const [checked, setChecked] = useState<ICheck[]>([]);

  const [selectedKey, setSelectedKey] = useState<number>();
  const [gameOver, setGameOver] = useState<GameOver>(GameOver.Playing);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [score, setScore] = useState<number>(0);

  const difficultyConfig = {
    easy: {
      colorCount: 4,
      attempts: 10,
    },
    normal: {
      colorCount: 4,
      attempts: 8,
    },
    hard: {
      colorCount: 4,
      attempts: 6,
    },
  };

  const currentDifficulty = difficultyConfig[difficulty];

  const SelectCell = (isChecked: boolean, key: number) => {
    if (isChecked) {
      const cell = ColorsCells.find((x) => x.key === key);
      setColorCell(cell);
      setSelectedKey(key);
    }
  };

  const showActiveChecked = (index: number) => {
    let temp = [...checked];
    let check = temp.find((x) => x.index === index);
    check!.visible = true;
    setChecked(temp);
  };

  const fillSelectCell = (
    index: number,
    indexParent: number,
    indexChild: number,
  ) => {
    if (gameOver === GameOver.Win || gameOver === GameOver.Lose) return;

    const temp = [...cells];

    if (temp[index][indexParent].isDone) return;

    if (temp[index][indexParent].index > level) return;

    temp[index][indexParent].mainCells[indexChild].StatusColor =
      colorCell?.value;

    const isChecked = temp[index][indexParent].mainCells.some(
      (x) => !x.StatusColor,
    );

    if (!isChecked) {
      temp[index][indexParent].isFill = true;
      showActiveChecked(temp[index][indexParent].index);
      setIndexCell(index);
    }

    setCells(temp);
  };

  const fillDesignCells = useCallback(() => {
    let tempCells: ICell[][] = [];
    let tempCellsChildren: ICell[] = [];
    let tempCheck: ICheck[] = [];

    const countCells = currentDifficulty.attempts;
    const countCellsChild = 4;
    const countCheck = currentDifficulty.attempts;
    let marginCount = 10;

    for (let i = countCells; i >= 1; i--) {
      tempCellsChildren = [];

      let mainCells: InnerCell[] = [];
      let resultCells: InnerResultCell[] = [];

      for (let j = 1; j <= countCellsChild; j++) {
        mainCells.push({ Index: j });
        resultCells.push({ Index: j });
      }

      tempCellsChildren.push({
        index: i,
        mainCells,
        resultCells,
        isFill: false,
        isDone: false,
      });

      tempCells.push(tempCellsChildren);
    }

    setCells(tempCells);

    for (let i = 1; i <= countCheck; i++) {
      tempCheck.push({
        index: i,
        margin: marginCount,
        visible: false,
      });

      marginCount += 40;
    }

    setChecked(tempCheck);
  }, [currentDifficulty.attempts]);

  const comparison = (temp: ICell[][]) => {
    let index = 0;
    let statusColor: Colors[] = [];
    for (let i = 0; i < currentDifficulty.colorCount; i++) {
      if (
        cellsPuzzle[i].StatusColor ===
          temp[indexCell][0].mainCells[i].StatusColor &&
        !statusColor.some(
          (x) => x === temp[indexCell][0].mainCells[i].StatusColor,
        )
      ) {
        temp[indexCell][0].resultCells[index].StatusColor = ColorsResult.Black;
        index++;
        statusColor.push(temp[indexCell][0].mainCells[i].StatusColor!);
      }
    }
    if (statusColor.length === currentDifficulty.colorCount) {
      setGameOver(GameOver.Win);
      setCells(temp);
      return;
    }
    for (let i = 0; i < currentDifficulty.colorCount; i++) {
      if (
        cellsPuzzle.some(
          (x) => x.StatusColor === temp[indexCell][0].mainCells[i].StatusColor,
        ) &&
        !statusColor.some(
          (x) => x === temp[indexCell][0].mainCells[i].StatusColor,
        )
      ) {
        temp[indexCell][0].resultCells[index].StatusColor = ColorsResult.White;
        index++;
        statusColor.push(temp[indexCell][0].mainCells[i].StatusColor!);
      }
    }

    setCells(temp);
  };

  const onCheck = (index: number) => {
    const temp = [...cells];
    temp[indexCell][0].isDone = true;

    const newLevel = level + 1;

    const currentScore = calculateScore(difficulty, level);

    setScore(currentScore);

    comparison(temp);

    setLevel(newLevel);
    setCells(temp);

    if (index === currentDifficulty.attempts && gameOver === GameOver.Playing) {
      setGameOver(GameOver.Lose);
    }
  };

  const reset = () => {
    const temp = [...cells];
    for (let i = 0; i < currentDifficulty.attempts; i++) {
      for (let j = 0; j < 4; j++) {
        temp[i][0].mainCells[j].StatusColor = undefined;
        temp[i][0].resultCells[j].StatusColor = undefined;
        temp[i][0].isFill = false;
        temp[i][0].isDone = false;
      }
    }
    setCells(temp);

    let tempCheck: ICheck[] = [...checked];
    for (let i = 0; i < currentDifficulty.attempts; i++) {
      tempCheck[i].visible = false;
    }
    setChecked(tempCheck);

    setSelectedKey(undefined);
  };

  const playAgain = () => {
    reset();
    setColorCell(undefined);
    setGameOver(GameOver.Playing);
    setIndexCell(0);
    setLevel(1);
    setScore(0);
    fillPuzzleCells();
  };

  const getRandomColors = useCallback(
    (
      colorCount: number = 4,
      temp: IColor[] = [],
      index: number = 0,
    ): IColor[] => {
      if (temp.length === colorCount) return temp;

      var randomColorKey = getRandomInt(ColorsCells.length);

      if (temp.some((x) => x.key === randomColorKey)) {
        return getRandomColors(colorCount, temp, index);
      }
      temp[index] = ColorsCells.find((x) => x.key === randomColorKey)!;
      return getRandomColors(colorCount, temp, index + 1);
    },
    [],
  );

  const fillPuzzleCells = useCallback(() => {
    let puzzleCell: IPuzzleCell[] = [];
    let randomColors = getRandomColors(currentDifficulty.colorCount);

    randomColors.forEach((element, i) => {
      puzzleCell.push({
        index: i,
        StatusColor: element.value,
      });
    });

    setCellsPuzzle(puzzleCell);
  }, [getRandomColors, currentDifficulty.colorCount]);

  useEffect(() => {
    fillDesignCells();
    fillPuzzleCells();
  }, [fillDesignCells, fillPuzzleCells]);

  return (
    <Main>
      <BackButton
        type="button"
        onClick={onBackToMenu}
        aria-label="بازگشت به منو"
      >
        <FaArrowLeft size={12} />
        <span>منو</span>
      </BackButton>
      <Panel>
        <Score>امتیاز: {score}</Score>
        <HelpButton
          type="button"
          onClick={() => setIsHelpOpen(true)}
          aria-label="راهنمای بازی"
        >
          ?
        </HelpButton>

        <PlayGame>
          <Nuts>
            {cellsPuzzle.map((x) => (
              <Nut
                key={x.index}
                backgroundColorCell={
                  gameOver === GameOver.Playing ? undefined : x.StatusColor
                }
              ></Nut>
            ))}
            {cells?.map((z, index) =>
              z.map((y, indexParent) =>
                y.mainCells.map((x, indexChild) => (
                  <Nut
                    key={x.Index}
                    backgroundColorCell={x.StatusColor}
                    onClick={() =>
                      fillSelectCell(index, indexParent, indexChild)
                    }
                  ></Nut>
                )),
              ),
            )}
            {gameOver === GameOver.Playing ? <Tag></Tag> : null}
            <Check>
              {checked.map((x) =>
                x.visible ? (
                  <IconImage bottom={x.margin} onClick={() => onCheck(x.index)}>
                    <FaCircleCheck color="#a52a2a" size={20} />
                  </IconImage>
                ) : null,
              )}
            </Check>
          </Nuts>
          <NutsSmall>
            {cells?.map((z) =>
              z.map((y) =>
                y.resultCells.map((x) => (
                  <NutSmall
                    key={x.Index}
                    className={
                      y.index > currentDifficulty.attempts ? "empty" : ""
                    }
                  >
                    {x.StatusColor ? (
                      <NutSmallOut
                        backgroundColorCell={x.StatusColor}
                      ></NutSmallOut>
                    ) : null}
                  </NutSmall>
                )),
              ),
            )}
          </NutsSmall>
        </PlayGame>
        <TagsPanel>
          {ColorsCells.map((x) => (
            <TagCell
              name="tagCell"
              type="radio"
              key={x.key}
              color={x.value}
              checked={selectedKey === x.key}
              onChange={(e) => SelectCell(e.target.checked, x.key)}
            ></TagCell>
          ))}
        </TagsPanel>
        {gameOver === GameOver.Win ? (
          <EndGame>
            <div className="gameOver">برنده شدید!</div>
            <button onClick={playAgain}>بازی دوباره</button>
          </EndGame>
        ) : null}

        {gameOver === GameOver.Lose ? (
          <EndGame>
            <div className="gameOver">باختید!</div>

            <button onClick={playAgain}>بازی دوباره</button>
          </EndGame>
        ) : null}
      </Panel>
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />
    </Main>
  );
};

export default Game;
