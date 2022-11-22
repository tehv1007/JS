const restart = document.querySelector(".restart-button");
const score = document.querySelector(".score");
const playerScore = document.querySelector(".score-player");
const computerScore = document.querySelector(".score-computer");
const choices = document.querySelectorAll(".choice");
const modal = document.querySelector(".modal");
const result = document.querySelector(".modal-content");

let scoreBand = {
  player: 0,
  computer: 0,
};

// event
choices.forEach((item) => item.addEventListener("click", play));
window.addEventListener("click", (event) => {
  if (event.target == modal) modal.style.display = "none";
});

// play game
function play(event) {
  const playerChoice = event.target.id;
  const computerChoice = getComputerChoice();
  const winner = getWinner(playerChoice, computerChoice);
  showResult(winner, computerChoice);

  console.log(playerChoice, computerChoice, winner);
}

// get computer choice
function getComputerChoice() {
  const random = Math.random();
  if (random <= 0.33) return "rock";
  else if (random <= 0.66) return "scissors";
  else return "paper";
}

// get winner
function getWinner(player, computer) {
  if (player === computer) return "draw";
  else if (player === "rock") {
    if (computer === "scissors") return "player";
    else if (computer === "paper") return "computer";
  } else if (player === "scissors") {
    if (computer === "paper") return "player";
    else if (computer === "rock") return "computer";
  } else if (player === "paper") {
    if (computer === "rock") return "player";
    else if (computer === "scissors") return "computer";
  }
}

// Show modal
function showResult(winner, computerChoice) {
  modal.style.display = "block";
  if (winner === "player") {
    scoreBand.player += 1;

    result.innerHTML = `
    <h1>You Win!</h1>
    <i class="choice fa-regular fa-hand-${computerChoice} fa-5x"></i>
    <p>Computer choose <strong>${computerChoice.toUpperCase()}</strong></p>
    <i class="fa-regular fa-award"></i>`;
  } else if (winner === "computer") {
    scoreBand.computer += 1;

    result.innerHTML = `
    <h1>You Lose!</h1>
    <i class="choice fa-regular fa-hand-${computerChoice} fa-5x"></i>
    <p>Computer choose <strong>${
      computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    }</strong></p>`;
  } else {
    result.innerHTML = `<h1>Draw!</h1>
    <i class="choice fa-regular fa-hand-${computerChoice} fa-5x"></i>
    <p>Computer choose <strong>${
      computerChoice.charAt(0).toUpperCase() + computerChoice.slice(1)
    }</strong></p>`;
  }

  playerScore.innerHTML = `Player: ${scoreBand.player}`;
  computerScore.innerHTML = `Computer: ${scoreBand.computer}`;
}

// restart game
restart.addEventListener("click", restartGame);

function restartGame() {
  // reset score
  scoreBand.player = 0;
  scoreBand.computer = 0;

  //   show score
  score.innerHTML = `
    <div class="score-player">Player: 0</div>
    <div class="score-computer">Computer: 0</div>
  `;

  //   open modal
  modal.style.display = "block";
  result.innerHTML = `<h1>Restart Game!</h1>`;
}
