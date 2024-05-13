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
import { Colors, ICell, ICheck, IColor } from "./utils/Models";
import { FaCircleCheck } from "react-icons/fa6";

function App() {
  const [Cells, setCells] = useState<ICell[]>([]);
  const [CellsCheck, setCellsCheck] = useState<ICell[]>([]);

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

  const fillSelectCell = (index: number) => {
    const temp = [...Cells];
    let cellIndex = temp.findIndex((x) => x.Index == index);
    if (cellIndex) {
      temp[cellIndex].StatusColor = colorCell?.value;
      setCells(temp);
    }
  };

  const fillDesign = () => {
    let tempCells: ICell[] = [];
    let tempCellsCheck: ICell[] = [];
    let tempCheck: ICheck[] = [];

    const countCells = 44;
    const countCheck = 10;
    let marginCount = 10;

    for (let i = countCells; i >= 1; i--) {
      tempCells.push({ Index: i });
    }
    setCells(tempCells);

    for (let i = countCells; i >= 1; i--) {
      tempCellsCheck.push({ Index: i });
    }
    setCellsCheck(tempCellsCheck);

    for (let i = 1; i <= countCheck; i++) {
      tempCheck.push({ margin: marginCount, visible: false });
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
            {Cells?.map((x) => (
              <Nut
                key={x.Index}
                marginBottom={x.Index > 40 ? spaceCells : 0}
                backgroundColorCell={x.StatusColor}
                onClick={() => fillSelectCell(x.Index)}
              >
                {x.Index}
              </Nut>
            ))}
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
            {CellsCheck?.map((x) => (
              <NutSmall
                key={x.Index}
                marginBottom={x.Index > 40 ? spaceCells : 0}
                className={x.Index > 40 ? "empty" : ""}
              ></NutSmall>
            ))}
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
