import * as React from "react";
import * as ReactDOM from "react-dom";
import styled from "styled-components";

import { Hello } from "./components/Hello";

// https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/basic_type_example
// https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/react/index.d.ts

interface SudokuContextData {
  grid: Grid;
}

// https://reactjs.org/docs/context.html
// https://www.carlrippon.com/react-context-with-typescript-p4/
// use undefined with non-null assertion as a lazy way to get around the type
// safety checks
// could maybe use partial type? https://fettblog.eu/typescript-react/context/
const SudokuContext = React.createContext<SudokuContextData>({grid: undefined!});

class Cell {
  row: number;
  col: number;
  value: number;

  constructor(row: number, col: number, value: number) {
    this.row = row;
    this.col = col;
    this.value = value;
  }
}


class Grid {
  rows: Cell[][];

  constructor(puzzle: string) {
    this.rows = [];

    for (let r = 0; r < 9; r++) {
      let row = new Array<Cell>(9);
      for (let c = 0; c < 9; c++) {
        let value = puzzle[r*9+c] === "." ? 0 : parseInt(puzzle[r*9+c]);
        row[c] = new Cell(r, c, value);
      }
      this.rows.push(row);
    }
  }

  getValue(row: number, col: number): number {
    return this.rows[row][col].value;
  }
}

interface SudokuSquareProps {
  row: number;
  col: number;
}

interface SudokuSquareState {}

const StyledSudokuSquare = styled.td.attrs<SudokuSquareProps>(props => ({
  // value: "a",
}))`
  height: 2em;
  width: 2em;
  border: 1px solid #CCC;
  text-align: center;
  outline: none;
`;

const StyledSudokuInput = styled.input.attrs<SudokuSquareProps>(props => ({
  // value: "a",
}))`
  font-size: 1em;
  width: 1em;
  border: none;
  text-align: center;
  outline: none;
`;

const SudokuSquare: React.FunctionComponent<SudokuSquareProps> = ({ value, row, col }) => {
  const sudokuContextData: SudokuContextData = React.useContext(SudokuContext);
  const v: number = sudokuContextData.grid.getValue(row, col);
  return (
    <StyledSudokuSquare>
      <StyledSudokuInput
        type="text"
        value={v === 0 ? "" : v.toString()}
        maxLength={1} />
    </StyledSudokuSquare>
  );
}

interface SudokuBoardProps {
  grid: Grid;
}

const StyledSudokuBoard = styled.table.attrs<SudokuBoardProps>(props => ({
}))`
  border: 3px solid #008A73;
  border-collapse: collapse;
  margin: 20px auto;
`;

const SudokuBoard: React.FunctionComponent<SudokuBoardProps> = ({ grid }) => {
  // https://www.taniarascia.com/using-context-api-in-react/
  // notice how the context object is passed to useContext (not the return type)
  const sudokuContextData: SudokuContextData = React.useContext(SudokuContext);
  return (
    <StyledSudokuBoard>
      <tbody>
        { sudokuContextData.grid.rows.map((row, r) => (
            <tr key={r} >
                { row.map((cell, c) => (
                  <SudokuSquare value={cell.value} row={r} col={c} />
                )) }
            </tr>
        )) }
      </tbody>
    </StyledSudokuBoard>
  );
}


interface SudokuProps {
  puzzle: string;
}

interface SudokuState {
  grid: Grid;
}

class Sudoku extends React.Component<SudokuProps, SudokuState> {

  constructor(props: Readonly<SudokuProps>) {
    super(props);
    this.state = {grid: new Grid(props.puzzle)};
  }

  render() {
    // need to use double curly braces for value -- not quite sure why yet
    // https://fettblog.eu/typescript-react/context/
    return (
      <div>
        <h1>Sudoku Solver</h1>
        <SudokuContext.Provider value={ {
          grid: this.state.grid
        } }>
          <SudokuBoard grid={this.state.grid} />
        </SudokuContext.Provider>
      </div>
    )
  }
}

ReactDOM.render(
  <Sudoku puzzle="4.....8.5.3..........7......2.....6.....8.4......1.......6.3.7.5..2.....1.4......" />,
  document.getElementById("example")
);
