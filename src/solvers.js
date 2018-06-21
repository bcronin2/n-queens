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

    findNSolutionHelper(board, 0, 'rooks');
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
  var solutionCount = countNSolutionHelper(board, 0, 'rooks');

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
    
    findNSolutionHelper(board, 0, 'queens');
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
  var solutionCount = countNSolutionHelper(board, 0, 'queens');

  // console.log('RECURSIVE CALLS FOR COUNTING ' + n + ' QUEENS SOLUTIONS: window.calls');

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};


// HELPERS

const checkerNames = {
  rooks: 'hasAnyRooksConflicts', 
  queens: 'hasAnyQueenConflictsOn'
};

window.findNSolutionHelper = function(board, rowIndex, type) {
  // window.calls++;
  for (var i = 0; i < board.get('n'); i++) {
    board.togglePiece(rowIndex, i);
    if (rowIndex && board[checkerNames[type]](rowIndex, i)) {
      board.togglePiece(rowIndex, i);
    } else {     
      if (rowIndex < board.get('n') - 1) {
        var result = findNSolutionHelper(board, rowIndex + 1, type);
        if (result) {
          return true;
        } else {
          board.togglePiece(rowIndex, i);
        }
      } else {
        return true;
      }
    }
  }
};

window.countNSolutionHelper = function(board, rowIndex, type) {
  // window.calls++;
  var count = 0;
  for (var i = 0; i < board.get('n'); i++) {
    board.togglePiece(rowIndex, i);
    if (rowIndex && board[checkerNames[type]](rowIndex, i)) {
      board.togglePiece(rowIndex, i);
    } else {     
      if (rowIndex < board.get('n') - 1) {
        count += countNSolutionHelper(board, rowIndex + 1, type);
      } else {
        count++;
      }
      board.togglePiece(rowIndex, i);
    }
  }
  return count;
};

// window.findNSolutionHelperBitwise = function(board, rowIndex) {
 
// };

// window.countNSolutionHelperBitwise = function(board, rowIndex) {
 
// };

