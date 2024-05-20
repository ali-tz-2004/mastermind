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
  IPuzzleCell,
  InnerCell,
  InnerResultCell,
} from "./utils/Models";
import { FaCircleCheck } from "react-icons/fa6";
import { getRandomInt } from "./utils/Utils";

function App() {
  const [Cells, setCells] = useState<ICell[][]>([]);
  const [CellsPuzzle, setCellsPuzzle] = useState<IPuzzleCell[]>([]);
  const [colorCell, setColorCell] = useState<IColor>();
  const [level, setLevel] = useState<number>(1);
  const [indexCell, setIndexCell] = useState<number>(0);
  const [checked, setChecked] = useState<ICheck[]>([]);

  const [selectedKey, setSelectedKey] = useState<number>();
  const [gameOver, setGameOver] = useState<GameOver>(GameOver.Playing);

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
    indexChild: number
  ) => {
    if (gameOver == GameOver.Win || gameOver == GameOver.Lose) return;

    const temp = [...Cells];

    if (temp[index][indexParent].isDone) return;

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
  };

  const fillDesignCells = () => {
    let tempCells: ICell[][] = [];
    let tempCellsChildren: ICell[] = [];
    let tempCheck: ICheck[] = [];

    const countCells = 9;
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

  const comparison = (temp: ICell[][]) => {
    let index = 0;
    let statusColor: Colors[] = [];
    for (let i = 0; i < 4; i++) {
      if (
        CellsPuzzle[i].StatusColor ===
          temp[indexCell][0].mainCells[i].StatusColor &&
        !statusColor.some(
          (x) => x === temp[indexCell][0].mainCells[i].StatusColor
        )
      ) {
        temp[indexCell][0].resultCells[index].StatusColor = ColorsResult.Black;
        index++;
        statusColor.push(temp[indexCell][0].mainCells[i].StatusColor!);
      }
    }
    if (statusColor.length === 4) {
      setGameOver(GameOver.Win);
      setCells(temp);
      return;
    }
    for (let i = 0; i < 4; i++) {
      if (
        CellsPuzzle.some(
          (x) => x.StatusColor === temp[indexCell][0].mainCells[i].StatusColor
        ) &&
        !statusColor.some(
          (x) => x === temp[indexCell][0].mainCells[i].StatusColor
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

  const reset = () => {
    const temp = [...Cells];
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 4; j++) {
        temp[i][0].mainCells[j].StatusColor = undefined;
        temp[i][0].resultCells[j].StatusColor = undefined;
        temp[i][0].isFill = false;
        temp[i][0].isDone = false;
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
    reset();
    setColorCell(undefined);
    setGameOver(GameOver.Playing);
    setIndexCell(0);
    setLevel(1);
    fillPuzzleCells();
  };

  const getRandomColors = (
    colorCount: number = 4,
    temp: IColor[] = [],
    index: number = 0
  ): IColor[] => {
    if (temp.length == colorCount) return temp;

    var randomColorKey = getRandomInt(ColorsCells.length);

    if (temp.some((x) => x.key == randomColorKey)) {
      return getRandomColors(colorCount, temp, index);
    }
    temp[index] = ColorsCells.find((x) => x.key == randomColorKey)!;
    return getRandomColors(colorCount, temp, index + 1);
  };

  const fillPuzzleCells = () => {
    let puzzleCell: IPuzzleCell[] = [];
    let randomColors = getRandomColors();

    randomColors.forEach((element, i) => {
      puzzleCell.push({ index: i, StatusColor: element.value });
    });

    setCellsPuzzle(puzzleCell);
  };

  useEffect(() => {
    fillDesignCells();
    fillPuzzleCells();
  }, []);

  return (
    <Main>
      <Panel>
        <PlayGame>
          <Nuts>
            {CellsPuzzle.map((x) => (
              <Nut
                key={x.index}
                backgroundColorCell={
                  gameOver === GameOver.Playing ? undefined : x.StatusColor
                }
              ></Nut>
            ))}
            {Cells?.map((z, index) =>
              z.map((y, indexParent) =>
                y.mainCells.map((x, indexChild) => (
                  <Nut
                    key={x.Index}
                    // backgroundColorCell={
                    //   index !== 0 || gameOver !== GameOver.Playing
                    //     ? x.StatusColor
                    //     : undefined
                    // }
                    backgroundColorCell={x.StatusColor}
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
