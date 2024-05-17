import { useEffect, useState } from "react";
import "./App.css";
import {
  Check,
  EndGame,
  IconImage,
  Main,
  Nut,
  NutSmall,
  NutSmallOut,
  Nuts,
  NutsSmall,
  Panel,
  PlayGame,
  Tag,
  TagCell,
  TagsPanel,
} from "./components/StyledComponents";
import { ColorsCells } from "./utils/Colors";
import {
  Colors,
  ColorsResult,
  GameOver,
  ICell,
  ICheck,
  IColor,
  InnerCell,
  InnerResultCell,
} from "./utils/Models";
import { FaCircleCheck } from "react-icons/fa6";
import { getRandomInt } from "./utils/Utils";
import { resourceUsage } from "process";

function App() {
  const [Cells, setCells] = useState<ICell[][]>([]);
  const [colorCell, setColorCell] = useState<IColor>();
  const [level, setLevel] = useState<number>(1);
  const [indexCell, setIndexCell] = useState<number>(0);
  const [checked, setChecked] = useState<ICheck[]>([]);
  const [executed, setExecuted] = useState(false);
  const [randomNumbers, setRandomNumbers] = useState<number[]>([]);
  const [isEnd, setIsEnd] = useState<boolean>(false);

  const [selectedKey, setSelectedKey] = useState<number>();
  const [gameOver, setGameOver] = useState<GameOver>(GameOver.Playing);

  const spaceCells = 30;

  const SelectCell = (isChecked: boolean, key: number) => {
    if (isChecked) {
      const cell = ColorsCells.find((x) => x.key === key);
      setColorCell(cell);
      setSelectedKey(key);
    }
  };

  const showActiveChecked = (index: number) => {
    let temp = [...checked];
    let check = temp.filter((x) => x.index === index)[0];
    check.visible = true;
    setChecked(temp);
  };

  const fillSelectCell = (
    index: number,
    indexParent: number,
    indexChild: number,
    isQuestion: boolean = false
  ) => {
    debugger;
    if (isEnd) return;
    if (!isQuestion && index === 0) return;

    const temp = [...Cells];

    if (temp[index][indexParent].isDone) return;

    if (index === 0) {
      fillQuestionCell(temp, index, indexParent, indexChild);
    } else {
      if (temp[index][indexParent].index > level) return;

      temp[index][indexParent].mainCells[indexChild].StatusColor =
        colorCell?.value;

      const isChecked = temp[index][indexParent].mainCells.some(
        (x) => !x.StatusColor
      );

      if (!isChecked) {
        temp[index][indexParent].isFill = true;
        showActiveChecked(temp[index][indexParent].index);
        setIndexCell(index);
      }

      setCells(temp);
    }
  };

  const fillDesign = () => {
    let tempCells: ICell[][] = [];
    let tempCellsChildren: ICell[] = [];
    let tempCheck: ICheck[] = [];

    const countCells = 10;
    const countCellsChild = 4;
    const countCheck = 9;
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
        mainCells: mainCells,
        resultCells: resultCells,
        isFill: false,
        isDone: false,
        isQuestion: i === 10 ? true : false,
        statusGame: GameOver.Playing,
      });
      tempCells.push(tempCellsChildren);
    }

    setCells(tempCells);

    for (let i = 1; i <= countCheck; i++) {
      tempCheck.push({ index: i, margin: marginCount, visible: false });
      marginCount += 40;
    }
    setChecked(tempCheck);
  };

  const endGame = (gameOver: GameOver) => {
    if (gameOver === GameOver.Win) {
      setGameOver(GameOver.Win);
    }
  };

  const comparison = (temp: ICell[][]) => {
    const isQuestion = temp[0][0].isQuestion === true;

    if (isQuestion) {
      let index = 0;
      let statusColor: Colors[] = [];
      for (let i = 0; i < 4; i++) {
        if (
          temp[0][0].mainCells[i].StatusColor ===
            temp[indexCell][0].mainCells[i].StatusColor &&
          !statusColor.some(
            (x) => x === temp[indexCell][0].mainCells[i].StatusColor
          )
        ) {
          temp[indexCell][0].resultCells[index].StatusColor =
            ColorsResult.Black;
          index++;
          statusColor.push(temp[indexCell][0].mainCells[i].StatusColor!);
        }
      }
      if (statusColor.length === 4) {
        temp[indexCell][0].statusGame = GameOver.Win;
        setCells(temp);
        endGame(GameOver.Win);
        setIsEnd(true);
        return;
      }
      for (let i = 0; i < 4; i++) {
        if (
          temp[0][0].mainCells.some(
            (x) => x.StatusColor === temp[indexCell][0].mainCells[i].StatusColor
          ) &&
          !statusColor.some(
            (x) => x === temp[indexCell][0].mainCells[i].StatusColor
          )
        ) {
          temp[indexCell][0].resultCells[index].StatusColor =
            ColorsResult.White;
          index++;
          statusColor.push(temp[indexCell][0].mainCells[i].StatusColor!);
        }
      }
    }

    setCells(temp);
  };

  const onCheck = (index: number) => {
    const temp = [...Cells];
    temp[indexCell][0].isDone = true;
    const newLevel = level + 1;
    comparison(temp);
    setLevel(newLevel);
    setCells(temp);
    if (index === 9 && gameOver === GameOver.Playing) {
      setGameOver(GameOver.Lose);
    }
  };

  const fillQuestionCell = (
    temp: ICell[][],
    index: number,
    indexParent: number,
    indexChild: number
  ) => {
    const randomNumber = getRandomInt(6);
    if (randomNumbers.some((x) => x === randomNumber)) {
      fillQuestionCell(temp, index, indexParent, indexChild);
    } else {
      const color = ColorsCells.find((x) => x.key === randomNumber)?.value;
      temp[index][indexParent].mainCells[indexChild].StatusColor = color;
      randomNumbers.push(randomNumber);
      setRandomNumbers([...randomNumbers, randomNumber]);

      setCells(temp);
    }
  };

  const reset = () => {
    const temp = [...Cells];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 4; j++) {
        temp[i][0].mainCells[j].StatusColor = undefined;
        temp[i][0].resultCells[j].StatusColor = undefined;
        temp[i][0].isFill = false;
        temp[i][0].isDone = false;
        temp[i][0].statusGame = GameOver.Playing;
      }
    }
    setCells(temp);

    let tempCheck: ICheck[] = [...checked];
    for (let i = 0; i <= 8; i++) {
      tempCheck[i].visible = false;
    }
    setChecked(tempCheck);

    setSelectedKey(undefined);
  };

  const playAgain = () => {
    debugger;
    reset();
    setColorCell(undefined);
    setGameOver(GameOver.Playing);
    setIsEnd(false);
    setIndexCell(0);
    setLevel(1);
    setRandomNumbers([]);
    setExecuted(false);
  };

  const fillQuestion = () => {
    if (Cells.length > 0 && !executed) {
      for (let i = 0; i < 4; i++) {
        fillSelectCell(0, 0, i, true);
      }
      setExecuted(true);
    }
  };

  useEffect(() => {
    fillDesign();
  }, []);

  useEffect(() => {
    fillQuestion();
  }, [Cells, executed]);

  return (
    <Main>
      <Panel>
        <PlayGame>
          <Nuts>
            {Cells?.map((z, index) =>
              z.map((y, indexParent) =>
                y.mainCells.map((x, indexChild) => (
                  <Nut
                    key={x.Index}
                    marginBottom={x.Index > 40 ? spaceCells : 0}
                    backgroundColorCell={
                      index !== 0 || gameOver !== GameOver.Playing
                        ? x.StatusColor
                        : undefined
                    }
                    onClick={() =>
                      fillSelectCell(index, indexParent, indexChild)
                    }
                  ></Nut>
                ))
              )
            )}
            {gameOver === GameOver.Playing ? <Tag></Tag> : null}
            <Check>
              {checked.map((x) =>
                x.visible ? (
                  <IconImage bottom={x.margin} onClick={() => onCheck(x.index)}>
                    <FaCircleCheck color="#a52a2a" size={20} />
                  </IconImage>
                ) : null
              )}
            </Check>
          </Nuts>
          <NutsSmall>
            {Cells?.map((z) =>
              z.map((y) =>
                y.resultCells.map((x) => (
                  <NutSmall
                    key={x.Index}
                    marginBottom={x.Index > 40 ? spaceCells : 0}
                    className={y.index > 9 ? "empty" : ""}
                  >
                    {x.StatusColor ? (
                      <NutSmallOut
                        backgroundColorCell={x.StatusColor}
                      ></NutSmallOut>
                    ) : null}
                  </NutSmall>
                ))
              )
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
            You Are
            <br />
            <div className="gameOver">Win</div>
            <button onClick={playAgain}>play again</button>
          </EndGame>
        ) : null}
        {gameOver === GameOver.Lose ? (
          <EndGame>
            You Are
            <br />
            <div className="gameOver">Lose</div>
            <button onClick={playAgain}>play again</button>
          </EndGame>
        ) : null}
      </Panel>
    </Main>
  );
}

export default App;
