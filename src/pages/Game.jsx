
import React, { useState, useEffect, useCallback } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import Board from '../components/sudoku/Board';
import Controls from '../components/sudoku/Controls';
import GameStats from '../components/sudoku/GameStats';
import Select from '../components/ui/Select';
import Button from '../components/ui/Button';
import { Play, Pause, RotateCcw, Save, Clock } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { 
  generateSudoku, 
  createEmptyGrid,
  createEmptyNotesGrid,
  checkSolution 
} from '../utils/sudokuGenerator';
import { 
  isValidPlacement, 
  getHint, 
  findErrors, 
  isPuzzleComplete 
} from '../utils/sudokuSolver';
import { 
  deepCopy,
  saveToLocalStorage,
  loadFromLocalStorage
} from '../lib/utils';

const difficultyOptions = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
  { value: 'expert', label: 'Expert' }
];

const Game = () => {
  // Game state
  const [puzzle, setPuzzle] = useState(null);
  const [solution, setSolution] = useState(null);
  const [playerAnswers, setPlayerAnswers] = useState(createEmptyGrid());
  const [selectedCell, setSelectedCell] = useState(null);
  const [gameMode, setGameMode] = useState('normal'); // 'normal' or 'notes'
  const [difficulty, setDifficulty] = useState('medium');
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'paused', 'complete'
  const [mistakes, setMistakes] = useState(0);
  const [remainingHints, setRemainingHints] = useState(3);
  const [moveHistory, setMoveHistory] = useState([]);
  const [errors, setErrors] = useState(null);
  
  // Initialize a new game
  const startNewGame = useCallback(() => {
    const { puzzle, solution } = generateSudoku(difficulty);
    setPuzzle(puzzle);
    setSolution(solution);
    setPlayerAnswers({
      ...createEmptyGrid(),
      notes: createEmptyNotesGrid()
    });
    setSelectedCell(null);
    setGameMode('normal');
    setGameState('playing');
    setMistakes(0);
    setRemainingHints(3);
    setMoveHistory([]);
    setErrors(null);
  }, [difficulty]);
  
  // Handle cell selection
  const handleCellSelect = (row, col) => {
    setSelectedCell({ row, col });
  };
  
  // Handle number input
  const handleNumberInput = (number) => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    
    // Make a copy of current answers
    const newAnswers = deepCopy(playerAnswers);
    
    // Store the current state for undo
    const previousState = {
      answers: deepCopy(playerAnswers),
      selectedCell: { ...selectedCell }
    };
    
    if (gameMode === 'normal') {
      // In normal mode, enter the number
      newAnswers[row][col] = number;
      
      // Check if the move is valid
      if (number !== solution[row][col]) {
        // Incorrect move
        setMistakes(prev => {
          const newMistakes = prev + 1;
          if (newMistakes >= 3) {
            toast.error('Game over! Too many mistakes.');
            // You could show the solution or restart
          }
          return newMistakes;
        });
        
        // Update errors
        const newErrors = findErrors(newAnswers, solution);
        setErrors(newErrors);
      } else {
        // Clear error for this cell if it was marked as error before
        if (errors && errors[row][col]) {
          const newErrors = deepCopy(errors);
          newErrors[row][col] = false;
          setErrors(newErrors);
        }
        
        // Check if puzzle is complete
        const mergedGrid = puzzle.map((puzzleRow, r) => 
          puzzleRow.map((cell, c) => 
            cell !== 0 ? cell : newAnswers[r][c]
          )
        );
        
        if (isPuzzleComplete(mergedGrid, solution)) {
          setGameState('complete');
          toast.success('Congratulations! You solved the puzzle!');
        }
      }
    } else {
      // In notes mode, toggle the number in notes
      if (!newAnswers.notes) {
        newAnswers.notes = createEmptyNotesGrid();
      }
      
      const currentNotes = newAnswers.notes[row][col] || [];
      const noteIndex = currentNotes.indexOf(number);
      
      if (noteIndex === -1) {
        // Add note
        newAnswers.notes[row][col] = [...currentNotes, number].sort((a, b) => a - b);
      } else {
        // Remove note
        newAnswers.notes[row][col] = currentNotes.filter(n => n !== number);
      }
    }
    
    setPlayerAnswers(newAnswers);
    setMoveHistory(prev => [...prev, previousState]);
  };
  
  // Handle erasing a cell
  const handleErase = () => {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    
    // Make a copy of current answers
    const newAnswers = deepCopy(playerAnswers);
    
    // Store the current state for undo
    const previousState = {
      answers: deepCopy(playerAnswers),
      selectedCell: { ...selectedCell }
    };
    
    // Erase the cell
    newAnswers[row][col] = 0;
    
    // Also erase notes if they exist
    if (newAnswers.notes && newAnswers.notes[row][col]) {
      newAnswers.notes[row][col] = [];
    }
    
    setPlayerAnswers(newAnswers);
    setMoveHistory(prev => [...prev, previousState]);
    
    // Update errors
    if (errors && errors[row][col]) {
      const newErrors = deepCopy(errors);
      newErrors[row][col] = false;
      setErrors(newErrors);
    }
  };
  
  // Handle getting a hint
  const handleHint = () => {
    if (!selectedCell || remainingHints <= 0) return;
    
    const { row, col } = selectedCell;
    
    // Get the correct value for this cell
    const hintValue = getHint(playerAnswers, solution, row, col);
    
    if (hintValue) {
      // Make a copy of current answers
      const newAnswers = deepCopy(playerAnswers);
      
      // Store the current state for undo
      const previousState = {
        answers: deepCopy(playerAnswers),
        selectedCell: { ...selectedCell }
      };
      
      // Set the correct value
      newAnswers[row][col] = hintValue;
      
      setPlayerAnswers(newAnswers);
      setMoveHistory(prev => [...prev, previousState]);
      setRemainingHints(prev => prev - 1);
      
      // Update errors
      if (errors && errors[row][col]) {
        const newErrors = deepCopy(errors);
        newErrors[row][col] = false;
        setErrors(newErrors);
      }
      
      toast.success('Hint applied!');
      
      // Check if puzzle is complete
      const mergedGrid = puzzle.map((puzzleRow, r) => 
        puzzleRow.map((cell, c) => 
          cell !== 0 ? cell : newAnswers[r][c]
        )
      );
      
      if (isPuzzleComplete(mergedGrid, solution)) {
        setGameState('complete');
        toast.success('Congratulations! You solved the puzzle!');
      }
    }
  };
  
  // Handle undoing a move
  const handleUndo = () => {
    if (moveHistory.length === 0) return;
    
    const lastMove = moveHistory[moveHistory.length - 1];
    setPlayerAnswers(lastMove.answers);
    setSelectedCell(lastMove.selectedCell);
    setMoveHistory(prev => prev.slice(0, -1));
    
    // Update errors
    const newErrors = findErrors(lastMove.answers, solution);
    setErrors(newErrors);
  };
  
  // Toggle notes mode
  const handleToggleNotes = () => {
    setGameMode(prev => prev === 'normal' ? 'notes' : 'normal');
  };
  
  // Toggle game pause
  const handleTogglePause = () => {
    setGameState(prev => prev === 'playing' ? 'paused' : 'playing');
  };
  
  // Save game
  const handleSaveGame = () => {
    const gameData = {
      puzzle,
      solution,
      playerAnswers,
      difficulty,
      remainingHints,
      mistakes,
      timestamp: Date.now()
    };
    
    saveToLocalStorage('sudoku-game', gameData);
    toast.success('Game saved!');
  };
  
  // Load a saved game
  const handleLoadGame = () => {
    const savedGame = loadFromLocalStorage('sudoku-game');
    
    if (savedGame) {
      setPuzzle(savedGame.puzzle);
      setSolution(savedGame.solution);
      setPlayerAnswers(savedGame.playerAnswers);
      setDifficulty(savedGame.difficulty);
      setRemainingHints(savedGame.remainingHints);
      setMistakes(savedGame.mistakes);
      setGameState('playing');
      setSelectedCell(null);
      setGameMode('normal');
      setMoveHistory([]);
      
      const newErrors = findErrors(savedGame.playerAnswers, savedGame.solution);
      setErrors(newErrors);
      
      toast.success('Game loaded!');
    } else {
      toast.error('No saved game found.');
    }
  };
  
  // Change difficulty
  const handleDifficultyChange = (value) => {
    setDifficulty(value);
  };
  
  // Start a new game when component mounts or difficulty changes
  useEffect(() => {
    if (gameState === 'menu') {
      // Check for saved game on initial load
      const savedGame = loadFromLocalStorage('sudoku-game');
      if (savedGame) {
        // Show option to continue or start new
      }
    }
  }, [gameState]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-10 px-4">
        <div className="container max-w-lg mx-auto">
          {gameState === 'menu' ? (
            <div className="glass p-8 rounded-xl animate-fade-in">
              <h1 className="text-3xl font-bold text-center mb-6">Sudoku</h1>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">
                  Difficulty
                </label>
                <Select
                  options={difficultyOptions}
                  value={difficulty}
                  onChange={handleDifficultyChange}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-4">
                <Button onClick={startNewGame} className="w-full py-3">
                  New Game
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={handleLoadGame} 
                  className="w-full py-3"
                >
                  Load Saved Game
                </Button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-4 flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm font-medium text-muted-foreground mr-2">
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTogglePause}
                    className="h-8 px-2"
                    aria-label={gameState === 'playing' ? 'Pause game' : 'Resume game'}
                  >
                    {gameState === 'playing' ? <Pause size={16} /> : <Play size={16} />}
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSaveGame}
                    className="h-8 px-2"
                    aria-label="Save game"
                  >
                    <Save size={16} />
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGameState('menu')}
                    className="h-8 px-2"
                    aria-label="Return to menu"
                  >
                    <RotateCcw size={16} />
                  </Button>
                </div>
              </div>
              
              <GameStats 
                mistakes={mistakes}
                maxMistakes={3}
                gameStarted={gameState !== 'menu'}
                gamePaused={gameState === 'paused'}
                gameCompleted={gameState === 'complete'}
              />
              
              {gameState === 'paused' ? (
                <div className="glass p-8 rounded-xl text-center animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">Game Paused</h2>
                  <p className="mb-6 text-muted-foreground">
                    Take a break and come back when you're ready.
                  </p>
                  <Button onClick={handleTogglePause}>
                    Resume Game
                  </Button>
                </div>
              ) : gameState === 'complete' ? (
                <div className="glass p-8 rounded-xl text-center animate-fade-in">
                  <h2 className="text-2xl font-bold mb-4">Puzzle Completed!</h2>
                  <p className="mb-6 text-muted-foreground">
                    Congratulations on solving the puzzle!
                  </p>
                  <Button onClick={() => setGameState('menu')}>
                    Return to Menu
                  </Button>
                </div>
              ) : puzzle ? (
                <>
                  <Board
                    puzzle={puzzle}
                    solution={solution}
                    playerAnswers={playerAnswers}
                    selectedCell={selectedCell}
                    onCellSelect={handleCellSelect}
                    gameMode={gameMode}
                    errors={errors}
                  />
                  
                  <Controls
                    onNumberClick={handleNumberInput}
                    onEraseClick={handleErase}
                    onHintClick={handleHint}
                    onUndoClick={handleUndo}
                    onToggleNotes={handleToggleNotes}
                    selectedCell={selectedCell}
                    gameMode={gameMode}
                    remainingHints={remainingHints}
                    canUndo={moveHistory.length > 0}
                  />
                </>
              ) : (
                <div className="text-center p-8">
                  <div className="animate-pulse-soft">Loading puzzle...</div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Game;
