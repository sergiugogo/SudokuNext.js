
// Check if a number placement is valid in the current puzzle state
const isValidPlacement = (grid, row, col, num) => {
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

// Solve the puzzle using backtracking
const solvePuzzle = (grid) => {
  const solution = grid.map(row => [...row]);
  
  if (solveBacktracking(solution)) {
    return solution;
  }
  
  return null; // No solution found
};

// Helper function for the backtracking solver
const solveBacktracking = (grid) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Find an empty cell
      if (grid[row][col] === 0) {
        // Try digits 1-9
        for (let num = 1; num <= 9; num++) {
          // Check if valid
          if (isValidPlacement(grid, row, col, num)) {
            // Place the digit
            grid[row][col] = num;
            
            // Recursively try to solve the rest
            if (solveBacktracking(grid)) {
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
  
  // If we get here, the puzzle is solved
  return true;
};

// Get all possible values for a cell
const getPossibleValuesForCell = (grid, row, col) => {
  const possibilities = [];
  
  if (grid[row][col] !== 0) return possibilities; // Cell already filled
  
  for (let num = 1; num <= 9; num++) {
    if (isValidPlacement(grid, row, col, num)) {
      possibilities.push(num);
    }
  }
  
  return possibilities;
};

// Find a hint (a correct value for a specific cell)
const getHint = (currentGrid, solution, row, col) => {
  if (currentGrid[row][col] !== 0) return null; // Cell already filled
  return solution[row][col];
};

// Check for errors in the current player's solution
const findErrors = (currentGrid, solution) => {
  const errors = Array(9).fill().map(() => Array(9).fill(false));
  
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      // Only check non-empty cells that don't match the solution
      if (currentGrid[row][col] !== 0 && currentGrid[row][col] !== solution[row][col]) {
        errors[row][col] = true;
      }
    }
  }
  
  return errors;
};

// Check if the entire puzzle is valid (no duplicates in rows, columns, or boxes)
const isPuzzleValid = (grid) => {
  // Check rows
  for (let row = 0; row < 9; row++) {
    const rowNumbers = new Set();
    for (let col = 0; col < 9; col++) {
      const num = grid[row][col];
      if (num !== 0) {
        if (rowNumbers.has(num)) return false;
        rowNumbers.add(num);
      }
    }
  }
  
  // Check columns
  for (let col = 0; col < 9; col++) {
    const colNumbers = new Set();
    for (let row = 0; row < 9; row++) {
      const num = grid[row][col];
      if (num !== 0) {
        if (colNumbers.has(num)) return false;
        colNumbers.add(num);
      }
    }
  }
  
  // Check 3x3 boxes
  for (let boxRow = 0; boxRow < 3; boxRow++) {
    for (let boxCol = 0; boxCol < 3; boxCol++) {
      const boxNumbers = new Set();
      for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
          const currentRow = boxRow * 3 + row;
          const currentCol = boxCol * 3 + col;
          const num = grid[currentRow][currentCol];
          if (num !== 0) {
            if (boxNumbers.has(num)) return false;
            boxNumbers.add(num);
          }
        }
      }
    }
  }
  
  return true;
};

// Check if the puzzle is complete (all cells filled) and correct
const isPuzzleComplete = (grid, solution) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0 || grid[row][col] !== solution[row][col]) {
        return false;
      }
    }
  }
  return true;
};

export {
  isValidPlacement,
  solvePuzzle,
  getPossibleValuesForCell,
  getHint,
  findErrors,
  isPuzzleValid,
  isPuzzleComplete
};
