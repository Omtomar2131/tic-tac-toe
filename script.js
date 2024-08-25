let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector(".reset");
let newGameBtn = document.querySelector(".new-game");
let winnerMessage = document.querySelector(".winner");
let msgContainer = document.querySelector(".msgcontainer");
let turnO = true;
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Function to check if there is a winner
const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [pos1, pos2, pos3] = pattern;
    let pos1Val = boxes[pos1].textContent;
    let pos2Val = boxes[pos2].textContent;
    let pos3Val = boxes[pos3].textContent;

    if (pos1Val && pos1Val === pos2Val && pos1Val === pos3Val) {
      gameActive = false;
      showWinner(pos1Val);
      return;
    }
  }

  // Check for draw condition (if all boxes are filled)
  const allFilled = [...boxes].every(box => box.textContent !== "");
  if (allFilled && gameActive) {
    showWinner("Draw");
    gameActive = false;
  }
};

// Function to display the winner message
const showWinner = (winner) => {
  if (winner === "Draw") {
    winnerMessage.textContent = `It's a draw!`;
  } else {
    winnerMessage.textContent = `Congratulations! Player ${winner} Wins!`;
  }
  msgContainer.classList.remove("hide");
};

// Function to handle box clicks
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (gameActive && box.textContent === "") {
      box.textContent = turnO ? "O" : "X";
      turnO = !turnO;
      checkWinner();
    }
  });
});

// Function to reset the game
const resetGame = () => {
  boxes.forEach((box) => {
    box.textContent = "";
    box.disabled = false;
  });
  msgContainer.classList.add("hide");
  gameActive = true;
  turnO = true; // Reset turn to player O
};

// Reset button event listener
resetBtn.addEventListener("click", resetGame);

// New game button event listener
newGameBtn.addEventListener("click", resetGame);
