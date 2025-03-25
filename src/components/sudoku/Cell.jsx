
import React, { useState, useEffect } from 'react';
import { cn } from '../../lib/utils';

const Cell = ({
  value,
  notes,
  rowIndex,
  colIndex,
  isInitial,
  isSelected,
  isSameValue,
  isHighlighted,
  hasError,
  onClick,
  ariaLabel
}) => {
  const [appear, setAppear] = useState(false);
  
  useEffect(() => {
    // Stagger the animation a bit based on position
    const timeout = setTimeout(() => {
      setAppear(true);
    }, (rowIndex + colIndex) * 15);
    
    return () => clearTimeout(timeout);
  }, [rowIndex, colIndex]);
  
  // Determine if this cell is at a 3x3 grid boundary
  const isRightBorder = (colIndex + 1) % 3 === 0 && colIndex < 8;
  const isBottomBorder = (rowIndex + 1) % 3 === 0 && rowIndex < 8;
  
  return (
    <div
      className={cn(
        'sudoku-cell',
        isInitial ? 'sudoku-cell-initial' : 'sudoku-cell-filled',
        isSelected && 'ring-2 ring-primary',
        isSameValue && !isSelected && 'sudoku-cell-same-value',
        isHighlighted && !isSelected && !isSameValue && 'sudoku-cell-highlight',
        hasError && 'sudoku-cell-error',
        isRightBorder && 'border-r-[1.5px] border-r-gray-400',
        isBottomBorder && 'border-b-[1.5px] border-b-gray-400',
        // If this is at the border of a 3x3 grid
        (rowIndex === 2 || rowIndex === 5) && 'border-b-grid-3x3',
        (colIndex === 2 || colIndex === 5) && 'border-r-grid-3x3',
        appear ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-300'
      )}
      onClick={onClick}
      aria-label={ariaLabel}
      role="button"
      tabIndex="0"
    >
      {value ? (
        <span className={cn(appear && value !== 0 && 'animate-scale-in')}>
          {value !== 0 ? value : ''}
        </span>
      ) : notes && notes.length > 0 ? (
        <div className="sudoku-notes">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <div key={num} className="flex items-center justify-center">
              {notes.includes(num) ? num : ''}
            </div>
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default Cell;
