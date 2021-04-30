// DOM variables
const modal = document.getElementById("modal");
const modalAction = document.getElementById("modal__action");
const gameFrame = document.getElementById("game__frame");

// Game variables
const playerOne = "X";
const playerTwo = "O";
let currentPlayer;
let cells;
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initial launch of the game
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

const resetGame = () => {
  gameFrame.innerHTML = "";
  cells = [null, null, null, null, null, null, null, null, null];
  currentPlayer = playerOne;
};

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

const listenToClicks = () => {
  const cellsArray = Array.from(document.querySelectorAll(".cell"));
  cellsArray.forEach((cell) => {
    cell.addEventListener(
      "click",
      () => {
        cell.innerHTML = currentPlayer;
        cell.classList.add(currentPlayer);
        cells[cell.id] = currentPlayer;
        console.log(cells);
        checkForWin();
        checkForDraw();
        swapPlayer();
      },
      { once: true }
    );
  });
};

const checkForWin = () => {
  for (winningCombination of winningCombinations) {
    if (
      cells[winningCombination[0]] === currentPlayer &&
      cells[winningCombination[1]] === currentPlayer &&
      cells[winningCombination[2]] === currentPlayer
    ) {
      endOfGame(`"${currentPlayer}" WINS !`);
    }
  }
};

const checkForDraw = () => {
  let sum = 0;
  cells.forEach((cell) => {
    if (cell !== null) {
      sum++;
    }
  });
  if (sum === 9) {
    endOfGame(`It's a draw !`);
  }
};

const swapPlayer = () => {
  if (currentPlayer === playerOne) {
    currentPlayer = playerTwo;
  } else {
    currentPlayer = playerOne;
  }
};

const endOfGame = (text) => {
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
