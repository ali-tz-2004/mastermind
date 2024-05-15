import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  Check,
  IconImage,
  Main,
  Nut,
  NutSmall,
  Nuts,
  NutsSmall,
  Panel,
  PlayGame,
  Tag,
  TagCell,
  TagsPanel,
} from "./components/StyledComponents";
import { ColorsCells } from "./utils/Colors";
import { Colors, ICell, ICheck, IColor, InnerCell } from "./utils/Models";
import { FaCircleCheck } from "react-icons/fa6";
import { getRandomInt } from "./utils/Utils";

function App() {
  const [Cells, setCells] = useState<ICell[][]>([]);

  const [colorCell, setColorCell] = useState<IColor>();

  const [level, setLevel] = useState<number>(0);

  const [checked, setChecked] = useState<ICheck[]>([]);

  const [executed, setExecuted] = useState(false);

  const spaceCells = 30;

  const SelectCell = (isChecked: boolean, key: number) => {
    if (isChecked) {
      const cell = ColorsCells.find((x) => x.key == key);
      setColorCell(cell);
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
    indexChild: number
  ) => {
    const temp = [...Cells];
    if (index === 0) {
      const randomNumber = getRandomInt(6);
      const color = ColorsCells.find((x) => x.key === randomNumber)?.value;
      temp[index][indexParent].mainCells[indexChild].StatusColor = color;
      setCells(temp);
    } else {
      if (temp[index][indexParent].index > 1) return;

      temp[index][indexParent].mainCells[indexChild].StatusColor =
        colorCell?.value;

      const isChecked = temp[index][indexParent].mainCells.some(
        (x) => !x.StatusColor
      );

      if (!isChecked) {
        temp[index][indexParent].isFill = true;
        showActiveChecked(temp[index][indexParent].index);
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
    const countCheck = 10;
    let marginCount = 10;

    for (let i = countCells; i >= 1; i--) {
      tempCellsChildren = [];
      let mainCells: InnerCell[] = [];
      let resultCells: InnerCell[] = [];
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

  const onCheck = () => {};

  useEffect(() => {
    fillDesign();
  }, []);

  useEffect(() => {
    if (Cells.length > 0 && !executed) {
      console.log(Cells);

      for (let i = 0; i < 4; i++) {
        fillSelectCell(0, 0, i);
      }
      setExecuted(true);
    }
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
                      index !== 0 ? x.StatusColor : undefined
                    }
                    onClick={() =>
                      fillSelectCell(index, indexParent, indexChild)
                    }
                  ></Nut>
                ))
              )
            )}
            <Tag></Tag>
            <Check>
              {checked.map((x) =>
                x.visible ? (
                  <IconImage bottom={x.margin} onClick={onCheck}>
                    <FaCircleCheck color="#a52a2a" size={20} />
                  </IconImage>
                ) : null
              )}
            </Check>
          </Nuts>
          <NutsSmall>
            {Cells?.map((z) =>
              z.map((y) =>
                y.mainCells.map((x) => (
                  <NutSmall
                    key={x.Index}
                    marginBottom={x.Index > 40 ? spaceCells : 0}
                    backgroundColorCell={x.StatusColor}
                    className={y.index > 9 ? "empty" : ""}
                    // onClick={() => fillSelectCell(x.Index)}
                  ></NutSmall>
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
              onChange={(e) => SelectCell(e.target.checked, x.key)}
            ></TagCell>
          ))}
        </TagsPanel>
      </Panel>
    </Main>
  );
}

export default App;
