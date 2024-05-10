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

interface ICell {
  Index: number;
}

function App() {
  const [Cells, setCells] = useState<ICell[]>();
  const [CellsCheck, setCellsCheck] = useState<ICell[]>();

  const spaceCells = 30;

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

    console.log(btoa("1"));
  }, []);
  return (
    <Main>
      <Panel>
        <PlayGame>
          <Nuts>
            {Cells?.map((x) => (
              <Nut marginBottom={x.Index > 40 ? spaceCells : 0}>{}</Nut>
            ))}
            <Tag></Tag>
          </Nuts>
          <NutsSmall>
            {CellsCheck?.map((x) => (
              <NutSmall
                marginBottom={x.Index > 40 ? spaceCells : 0}
                className={x.Index > 40 ? "empty" : ""}
              ></NutSmall>
            ))}
          </NutsSmall>
        </PlayGame>
        <TagsPanel></TagsPanel>
        <TagCell></TagCell>
      </Panel>
    </Main>
  );
}

export default App;
