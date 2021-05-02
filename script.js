// DOM variables
const modal = document.getElementById("modal");
const modalAction = document.getElementById("modal__action");
const gameFrame = document.getElementById("game__frame");
const snackbar = document.getElementById("snackbar");

// Game variables
const playerOne = "X";
const playerTwo = "O";
let currentPlayer; // Will hold playerOne or playerTwo
let cells; // Will be an array of nine elements representing each one of the cells
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
]; // Define the 8 possible combinations for a win

// Initial launch of the game
//// Modal is on by default at the start of app. An event listener waits for a click to hide the modal and call start game.
modalAction.addEventListener(
  "click",
  () => {
    modal.style.display = "none";
    startGame();
  },
  { once: true }
);

// START GAME
const startGame = () => {
  resetGame();
  mountBoard();
  listenToClicks();
};

// RESET GAME
//// clean html container of the game
//// defines each cell as a null value
//// defines current player to be playerOne (X)
//// displays snackbar and defines its text
const resetGame = () => {
  gameFrame.innerHTML = "";
  cells = [null, null, null, null, null, null, null, null, null];
  currentPlayer = playerOne;
  snackbar.style.display = "block";
  snackbar.innerHTML = `<p>It's <span class="${currentPlayer}">${currentPlayer}</span>'s turn</p>`;
};

// MOUNT BOARD
//// Create a div element for each cell
//// Give an unique ID for each cell
//// Give a "cell" class to each cell
//// Checks the position of the cell so the border can be adjusted (outter borders are defined to 'none')
//// Append each cell to the HTML grid
const mountBoard = () => {
  for (let i = 0; i < 9; i++) {
    const newCell = document.createElement("div");
    newCell.setAttribute("id", i);
    newCell.classList.add("cell");
    if (i === 0 || i === 1 || i === 2) {
      newCell.style.borderTop = "none";
    }
    if (i === 2 || i === 5 || i === 8) {
      newCell.style.borderRight = "none";
    }
    if (i === 6 || i === 7 || i === 8) {
      newCell.style.borderBottom = "none";
    }
    if (i === 0 || i === 3 || i === 6) {
      newCell.style.borderLeft = "none";
    }
    gameFrame.appendChild(newCell);
  }
};

// LISTEN TO CLICKS
//// For each cell, adds an eventlister for a click (that can be clicked just once)
//// When clicked, each cell will :
//////// Insert X or O in the cell html
//////// Add a class to the cell so the color is adequate for each player
//////// Add X or O to the right position in the array "cells"
//// Check for win
//// If win doesn't return true, check for draw
//// Swap current player from one to another

const listenToClicks = () => {
  const cellsArray = Array.from(document.querySelectorAll(".cell"));
  cellsArray.forEach((cell) => {
    cell.addEventListener(
      "click",
      () => {
        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer);
        cells[cell.id] = currentPlayer;
        checkForWin();
        if (!checkForWin()) {
          checkForDraw();
        }
        swapPlayer();
      },
      { once: true }
    );
  });
};

// CHECK FOR WIN
//// Loops through the winning combinations array
//////// For each combination, checks if each of the correspondant place in the cells array is hold by the current player.
//////// If it is, calls the end of game with custom text message
//////// Otherwise, returns false so we can check for a draw
const checkForWin = () => {
  for (winningCombination of winningCombinations) {
    if (
      cells[winningCombination[0]] === currentPlayer &&
      cells[winningCombination[1]] === currentPlayer &&
      cells[winningCombination[2]] === currentPlayer
    ) {
      endOfGame(
        `<p>"<span class="${currentPlayer}">${currentPlayer}</span> WINS !</p>`
      );
      return true;
    }
  }
  return false;
};

// CHECK FOR DRAW
//// Declares a cellsPlayed variable that begins at 0
//// For each element in the cells array, check if there is another thing than null. If it's the case, adds 1 to the cellsPlayed.
//// If the cellsPlayed is 9, all cells are taken and, because checkForWin wasn't successful, it's a tie.
//// Calls end of game with custom text message
const checkForDraw = () => {
  let cellsPlayed = 0;
  cells.forEach((cell) => {
    if (cell !== null) {
      cellsPlayed++;
    }
  });
  if (cellsPlayed === 9) {
    endOfGame(`It's a tie !`);
  }
};

// SWAP PLAYERS
//// Check who is the current player and assign the opposite to be the current player
//// Changes the text of snackbar
const swapPlayer = () => {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else {
    currentPlayer = playerOne;
  }
  snackbar.innerHTML = `<p>It's <span class="${currentPlayer}">${currentPlayer}</span>'s turn</p>`;
};

// END OF GAME
//// Hides snackbar
//// Display the modal
//// Give the modal a slightly different background than the default one
//// Customize the modal title with the arguments passed through
//// Generates the message for the modal content
//// Sets the button "play again" with an event listener that, when clicked, will call startGame.
const endOfGame = (text) => {
  snackbar.style.display = "none";
  modal.style.display = "flex";
  modal.style.background = "rgba(0,0,0,0.9)";
  modal.querySelector(".modal__title").innerHTML = text;
  modal.querySelector(".modal__content").innerHTML = "Wanna give another try ?";
  const modalAction = modal.querySelector(".modal__action");
  modalAction.innerHTML = "Play Again";
  modalAction.addEventListener(
    "click",
    () => {
      modal.style.display = "none";
      startGame();
    },
    { once: true }
  );
};
