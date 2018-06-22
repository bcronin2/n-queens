/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other
// TIME COMPLEXITY: O(n) (recursive calls to findNSolutionHelper)
window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  if (n > 0) {
    // window.calls = 0;
    var availableCols = initializeAvailableCols(n);
    findNRooksSolutionHelper(board, 0, availableCols);
  }
  // console.log('RECURSIVE CALLS FOR FINDING ' + n + ' ROOKS SOLUTION: ' + window.calls);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
// TIME COMPLEXITY: O(n!) (recursive calls to countNSolutionHelper)
window.countNRooksSolutions = function(n) {
  if (n <= 1) {
    return 1;
  }
  // window.calls = 0;
  var board = new Board({n: n});
  var availableCols = initializeAvailableCols(n);  
  var solutionCount = countNRooksSolutionHelper(board, 0, availableCols);
  // console.log('RECURSIVE CALLS FOR COUNTING ' + n + ' ROOKS SOLUTIONS: ' + window.calls);
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
// TIME COMPLEXITY: O(n^2) (recursive calls to findNSolutionHelper)
window.findNQueensSolution = function(n) {
  var board = new Board({n: n});
  if (n > 0) {
    // window.calls = 0;
    var availableCols = initializeAvailableCols(n);
    var availableMajorDiagonals = initializeAvailableMajorDiagonals(n);  
    var availableMinorDiagonals = initializeAvailableMinorDiagonals(n);     
    findNQueensSolutionHelper(board, 0, availableCols, availableMajorDiagonals, availableMinorDiagonals);
  }
  // console.log('RECURSIVE CALLS FOR FINDING ' + n + ' QUEENS SOLUTION: window.calls');
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(board.rows()));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
// TIME COMPLEXITY: O(~2.5^n) (recursive calls to countNSolutionHelper)
window.countNQueensSolutions = function(n) {
  if (n <= 0) {
    return 1;
  }
  // window.calls = 0;
  var board = new Board({n: n});
  var availableCols = initializeAvailableCols(n);
  var availableMajorDiagonals = initializeAvailableMajorDiagonals(n);  
  var availableMinorDiagonals = initializeAvailableMinorDiagonals(n);    
  var solutionCount = countNQueensSolutionHelper(board, 0, availableCols, availableMajorDiagonals, availableMinorDiagonals);
  // console.log('RECURSIVE CALLS FOR COUNTING ' + n + ' QUEENS SOLUTIONS: window.calls');
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// HELPERS

window.initializeAvailableCols = function(n) {
  var availableCols = {};
  for (var i = 0; i < n; i++) {
    availableCols[i] = true;
  }
  return availableCols;
};

window.initializeAvailableMajorDiagonals = function(n) {
  var availableMajorDiagonals = {};
  for (var i = -n + 1; i < n; i++) {
    availableMajorDiagonals[i] = true;
  }
  return availableMajorDiagonals;
};

window.initializeAvailableMinorDiagonals = function(n) {
  var availableMinorDiagonals = {};
  for (var i = 0; i < 2 * n - 1; i++) {
    availableMinorDiagonals[i] = true;
  }
  return availableMinorDiagonals;
};

window.findNRooksSolutionHelper = function(board, rowIndex, availableCols) {
  // window.calls++;
  for (var i = 0; i < board.get('n'); i++) {
    if (availableCols[i]) {
      board.togglePiece(rowIndex, i);
      availableCols[i] = false;
      if (rowIndex < board.get('n') - 1) {
        if (findNRooksSolutionHelper(board, rowIndex + 1, availableCols)) {
          return true;
        } else {
          board.togglePiece(rowIndex, i);
          availableCols[i] = true;
        }
      } else {
        return true;
      }
    }
  }
};

window.countNRooksSolutionHelper = function(board, rowIndex, availableCols) {
  // window.calls++;
  var count = 0;
  for (var i = 0; i < board.get('n'); i++) {
    if (availableCols[i]) {
      board.togglePiece(rowIndex, i);
      availableCols[i] = false;
      if (rowIndex < board.get('n') - 1) {
        count += countNRooksSolutionHelper(board, rowIndex + 1, availableCols);        
      } 
      board.togglePiece(rowIndex, i);
      availableCols[i] = true;
      if (rowIndex === board.get('n') - 1) {
        return 1;
      }
    }
  }
  return count;
};

window.findNQueensSolutionHelper = function(board, rowIndex, availableCols, availableMajorDiagonals, availableMinorDiagonals) {
  // window.calls++;
  for (var i = 0; i < board.get('n'); i++) {
    if (availableCols[i] && availableMajorDiagonals[i - rowIndex] && availableMinorDiagonals[i + rowIndex]) {
      board.togglePiece(rowIndex, i);
      availableCols[i] = false;
      availableMajorDiagonals[i - rowIndex] = false;
      availableMinorDiagonals[i + rowIndex] = false;

      if (rowIndex < board.get('n') - 1) {
        if (findNQueensSolutionHelper(board, rowIndex + 1, availableCols, availableMajorDiagonals, availableMinorDiagonals)) {
          return true;
        } else {
          board.togglePiece(rowIndex, i);
          availableCols[i] = true;
          availableMajorDiagonals[i - rowIndex] = true;
          availableMinorDiagonals[i + rowIndex] = true;
        }
      } else {
        return true;
      }
    }
  }
};

window.countNQueensSolutionHelper = function(board, rowIndex, availableCols, availableMajorDiagonals, availableMinorDiagonals) {
  // window.calls++;
  var count = 0;
  for (var i = 0; i < board.get('n'); i++) {
    if (availableCols[i] && availableMajorDiagonals[i - rowIndex] && availableMinorDiagonals[i + rowIndex]) {
      board.togglePiece(rowIndex, i);
      availableCols[i] = false;
      availableMajorDiagonals[i - rowIndex] = false;
      availableMinorDiagonals[i + rowIndex] = false;
      if (rowIndex < board.get('n') - 1) {
        count += countNQueensSolutionHelper(board, rowIndex + 1, availableCols, availableMajorDiagonals, availableMinorDiagonals);        
      } 
      board.togglePiece(rowIndex, i);
      availableCols[i] = true;
      availableMajorDiagonals[i - rowIndex] = true;
      availableMinorDiagonals[i + rowIndex] = true;
      if (rowIndex === board.get('n') - 1) {
        return 1;
      }
    }
  }
  return count;
};
