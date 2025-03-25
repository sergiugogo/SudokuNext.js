
import React from 'react';
import { cn } from '../../lib/utils';
import { Pencil, Eraser, Undo, Lightbulb } from 'lucide-react';
import Button from '../ui/Button';

const Controls = ({ 
  onNumberClick, 
  onEraseClick, 
  onHintClick, 
  onUndoClick,
  onToggleNotes,
  selectedCell,
  gameMode,
  remainingHints = 3,
  canUndo = false 
}) => {
  return (
    <div className="mt-6 px-4">
      <div className="sudoku-controls mb-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((number) => (
          <button
            key={number}
            className={cn(
              "sudoku-number-button",
              gameMode === 'notes' && "bg-accent"
            )}
            onClick={() => onNumberClick(number)}
            disabled={!selectedCell}
            aria-label={`Input number ${number}`}
          >
            {number}
          </button>
        ))}
      </div>
      
      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <Button
          variant="outline"
          size="default"
          className={cn(
            "flex items-center gap-2", 
            gameMode === 'notes' && "bg-accent text-accent-foreground"
          )}
          onClick={onToggleNotes}
          disabled={!selectedCell}
          aria-label="Toggle notes mode"
        >
          <Pencil size={16} />
          <span>Notes</span>
        </Button>
        
        <Button
          variant="outline"
          size="default"
          className="flex items-center gap-2"
          onClick={onEraseClick}
          disabled={!selectedCell}
          aria-label="Erase cell"
        >
          <Eraser size={16} />
          <span>Erase</span>
        </Button>
        
        <Button
          variant="outline"
          size="default"
          className="flex items-center gap-2"
          onClick={onUndoClick}
          disabled={!canUndo}
          aria-label="Undo last move"
        >
          <Undo size={16} />
          <span>Undo</span>
        </Button>
        
        <Button
          variant="outline"
          size="default"
          className="flex items-center gap-2"
          onClick={onHintClick}
          disabled={remainingHints <= 0 || !selectedCell}
          aria-label="Get a hint"
        >
          <Lightbulb size={16} />
          <span>Hint ({remainingHints})</span>
        </Button>
      </div>
    </div>
  );
};

export default Controls;
