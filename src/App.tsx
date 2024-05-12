import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
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
import { Colors, IColor } from "./utils/Models";

interface ICell {
  Index: number;
  StatusColor?: Colors;
}

function App() {
  const [Cells, setCells] = useState<ICell[]>([]);
  const [CellsCheck, setCellsCheck] = useState<ICell[]>([]);

  const [colorCell, setColorCell] = useState<IColor>();

  const spaceCells = 30;

  const SelectCell = (isChecked: boolean, key: number) => {
    if (isChecked) {
      const cell = ColorsCells.find((x) => x.key == key);
      setColorCell(cell);
    }
  };

  const fillCell = (index: number) => {
    const temp = [...Cells];
    let cellIndex = temp.findIndex((x) => x.Index == index);
    if (cellIndex) {
      temp[cellIndex].StatusColor = colorCell?.value;
      setCells(temp);
    }
  };

  useEffect(() => {
    var tempCells: ICell[] = [];
    for (let i = 44; i >= 1; i--) {
      tempCells.push({ Index: i });
    }
    setCells(tempCells);

    var tempCellsCheck: ICell[] = [];
    for (let i = 44; i >= 1; i--) {
      tempCellsCheck.push({ Index: i });
    }
    setCellsCheck(tempCellsCheck);
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
                onClick={() => fillCell(x.Index)}
              ></Nut>
            ))}
            <Tag></Tag>
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
