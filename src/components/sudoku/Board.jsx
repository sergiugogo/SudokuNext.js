
import React, { useState, useEffect } from 'react';
import Cell from './Cell';

const Board = ({ puzzle, solution, onCellSelect, selectedCell, gameMode, playerAnswers, errors }) => {
  const [board, setBoard] = useState([]);
  
  useEffect(() => {
    if (puzzle) {
      setBoard(puzzle);
    }
  }, [puzzle]);
  
  const handleCellClick = (rowIndex, colIndex) => {
    // Only allow selecting cells that aren't filled in the initial puzzle
    if (puzzle[rowIndex][colIndex] === 0) {
      onCellSelect(rowIndex, colIndex);
    }
  };
  
  const isCellHighlighted = (rowIndex, colIndex, selectedRow, selectedCol) => {
    if (selectedRow === null || selectedCol === null) return false;
    
    // Same row or column or 3x3 box
    const sameRow = rowIndex === selectedRow;
    const sameCol = colIndex === selectedCol;
    const sameBox = 
      Math.floor(rowIndex / 3) === Math.floor(selectedRow / 3) && 
      Math.floor(colIndex / 3) === Math.floor(selectedCol / 3);
    
    return sameRow || sameCol || sameBox;
  };
  
  const isSameValue = (rowIndex, colIndex, selectedRow, selectedCol) => {
    if (selectedRow === null || selectedCol === null) return false;
    
    const selectedCellValue = 
      playerAnswers[selectedRow][selectedCol] || 
      puzzle[selectedRow][selectedCol];
    
    if (!selectedCellValue) return false;
    
    const currentCellValue = 
      playerAnswers[rowIndex][colIndex] || 
      puzzle[rowIndex][colIndex];
    
    return selectedCellValue === currentCellValue && currentCellValue !== 0;
  };
  
  const hasError = (rowIndex, colIndex) => {
    return errors && errors[rowIndex] && errors[rowIndex][colIndex];
  };
  
  return (
    <div className="sudoku-board mx-auto max-w-md">
      {board.map((row, rowIndex) => (
        <React.Fragment key={`row-${rowIndex}`}>
          {row.map((cell, colIndex) => {
            const isInitial = puzzle[rowIndex][colIndex] !== 0;
            const value = playerAnswers[rowIndex][colIndex] || puzzle[rowIndex][colIndex];
            const isSelected = 
              selectedCell && 
              selectedCell.row === rowIndex && 
              selectedCell.col === colIndex;
              
            return (
              <Cell
                key={`cell-${rowIndex}-${colIndex}`}
                value={value}
                notes={gameMode === 'notes' ? playerAnswers.notes?.[rowIndex]?.[colIndex] || [] : []}
                rowIndex={rowIndex}
                colIndex={colIndex}
                isInitial={isInitial}
                isSelected={isSelected}
                isHighlighted={isCellHighlighted(rowIndex, colIndex, selectedCell?.row, selectedCell?.col)}
                isSameValue={isSameValue(rowIndex, colIndex, selectedCell?.row, selectedCell?.col)}
                hasError={hasError(rowIndex, colIndex)}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                ariaLabel={`Cell at row ${rowIndex + 1}, column ${colIndex + 1}${value ? `, value ${value}` : ', empty'}`}
              />
            );
          })}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Board;
