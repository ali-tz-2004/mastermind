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

function App() {
  const [Cells, setCells] = useState<ICell[][]>([]);

  const [colorCell, setColorCell] = useState<IColor>();

  const [level, setLevel] = useState<number>(0);

  const [checked, setChecked] = useState<ICheck[]>([]);

  const spaceCells = 30;

  const SelectCell = (isChecked: boolean, key: number) => {
    if (isChecked) {
      const cell = ColorsCells.find((x) => x.key == key);
      setColorCell(cell);
    }
  };

  const handlerActiveCheck = () => {
    const temp = [...Cells];
  };

  const fillSelectCell = (
    index: number,
    indexParent: number,
    indexChild: number
  ) => {
    const temp = [...Cells];

    if (temp[index][indexParent].index > 1) return;

    let a = temp[index][indexParent].mainCells.filter((x) => x.StatusColor);

    temp[index][indexParent].mainCells[indexChild].StatusColor =
      colorCell?.value;
    setCells(temp);
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

  useEffect(() => {
    fillDesign();
  }, []);

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
                    backgroundColorCell={x.StatusColor}
                    onClick={() =>
                      fillSelectCell(index, indexParent, indexChild)
                    }
                  >
                    {x.Index}
                  </Nut>
                ))
              )
            )}
            <Tag></Tag>
            <Check>
              {checked.map((x) =>
                x.visible ? (
                  <IconImage bottom={x.margin}>
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
                  >
                    {x.Index}
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
              onChange={(e) => SelectCell(e.target.checked, x.key)}
            ></TagCell>
          ))}
        </TagsPanel>
      </Panel>
    </Main>
  );
}

export default App;
