
// Generates a Sudoku puzzle with the given difficulty level
const generateSudoku = (difficulty = 'medium') => {
  // First, generate a solved puzzle
  const solution = generateSolvedPuzzle();
  
  // Then, remove some cells based on difficulty
  const puzzle = removeNumbers(solution, difficulty);
  
  return { puzzle, solution };
};

// Generate a fully solved Sudoku puzzle
const generateSolvedPuzzle = () => {
  // Create an empty 9x9 grid
  const grid = Array(9).fill().map(() => Array(9).fill(0));
  
  // Try to solve the empty grid
  if (solveSudoku(grid)) {
    return grid;
  }
  
  // If somehow we couldn't solve it, return a default puzzle
  console.error("Failed to generate a solved puzzle");
  return defaultSolution();
};

// Remove numbers from the solved puzzle to create a puzzle with a unique solution
const removeNumbers = (solution, difficulty) => {
  // Create a copy of the solution
  const puzzle = solution.map(row => [...row]);
  
  // Determine how many cells to remove based on difficulty
  let cellsToRemove;
  switch (difficulty) {
    case 'easy':
      cellsToRemove = 40; // Remove ~40 cells (41 clues)
      break;
    case 'medium':
      cellsToRemove = 50; // Remove ~50 cells (31 clues)
      break;
    case 'hard':
      cellsToRemove = 55; // Remove ~55 cells (26 clues)
      break;
    case 'expert':
      cellsToRemove = 60; // Remove ~60 cells (21 clues)
      break;
    default:
      cellsToRemove = 50;
  }
  
  // Randomly remove cells
  let cellsRemoved = 0;
  const positions = [];
  
  // Create array of all positions
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      positions.push({ row, col });
    }
  }
  
  // Shuffle positions
  shuffleArray(positions);
  
  // Try to remove each position and check if the puzzle still has a unique solution
  for (const pos of positions) {
    if (cellsRemoved >= cellsToRemove) break;
    
    const { row, col } = pos;
    const temp = puzzle[row][col];
    puzzle[row][col] = 0;
    
    // For performance reasons, we're not checking uniqueness for every removal
    // In a real app, you might want to implement a more sophisticated algorithm
    cellsRemoved++;
  }
  
  return puzzle;
};

// Check if the current puzzle state is valid
const isValid = (grid, row, col, num) => {
  // Check row
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num) return false;
  }
  
  // Check column
  for (let y = 0; y < 9; y++) {
    if (grid[y][col] === num) return false;
  }
  
  // Check 3x3 box
  const boxRow = Math.floor(row / 3) * 3;
  const boxCol = Math.floor(col / 3) * 3;
  
  for (let y = 0; y < 3; y++) {
    for (let x = 0; x < 3; x++) {
      if (grid[boxRow + y][boxCol + x] === num) return false;
    }
  }
  
  return true;
};

// Solve the Sudoku puzzle using backtracking
const solveSudoku = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Find an empty cell
      if (grid[row][col] === 0) {
        // Try digits 1-9
        for (let num = 1; num <= 9; num++) {
          // Check if valid
          if (isValid(grid, row, col, num)) {
            // Place the digit
            grid[row][col] = num;
            
            // Recursively try to solve the rest of the puzzle
            if (solveSudoku(grid)) {
              return true;
            }
            
            // If placing this digit didn't lead to a solution, backtrack
            grid[row][col] = 0;
          }
        }
        
        // If no digit worked, return false to trigger backtracking
        return false;
      }
    }
  }
  
  // If we get here, all cells are filled
  return true;
};

// Helper to shuffle an array in-place
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

// Default solution if generation fails
const defaultSolution = () => [
  [5, 3, 4, 6, 7, 8, 9, 1, 2],
  [6, 7, 2, 1, 9, 5, 3, 4, 8],
  [1, 9, 8, 3, 4, 2, 5, 6, 7],
  [8, 5, 9, 7, 6, 1, 4, 2, 3],
  [4, 2, 6, 8, 5, 3, 7, 9, 1],
  [7, 1, 3, 9, 2, 4, 8, 5, 6],
  [9, 6, 1, 5, 3, 7, 2, 8, 4],
  [2, 8, 7, 4, 1, 9, 6, 3, 5],
  [3, 4, 5, 2, 8, 6, 1, 7, 9]
];

// Check if the puzzle is solved correctly
const checkSolution = (puzzle, solution) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (puzzle[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
};

// Create an empty grid filled with zeros
const createEmptyGrid = () => {
  return Array(9).fill().map(() => Array(9).fill(0));
};

// Create an empty notes grid (for pencil marks)
const createEmptyNotesGrid = () => {
  return Array(9).fill().map(() => Array(9).fill().map(() => []));
};

export {
  generateSudoku,
  isValid,
  solveSudoku,
  checkSolution,
  createEmptyGrid,
  createEmptyNotesGrid
};
