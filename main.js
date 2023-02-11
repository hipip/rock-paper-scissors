// getting some elements that we will need to modify
const splashScreen = document.querySelector(".splash-screen");
const gameUI = document.querySelector(".game-container");
const playForm = document.querySelector(".play-form");
const rpsBtns = document.querySelectorAll(".game-btn");
const circle = document.querySelector(".circle");
const overlay = document.querySelector(".overlay");
const dayTimeSpan = document.querySelector(".day-time");
const mainTitle = document.querySelector(".main-title");
const userScore = document.querySelector(".user-score");
const computerScore = document.querySelector(".computer-score");
const roundResultText = document.querySelector(".round-text");

// score variables
let scoreComputer = 0,
  scoreUser = 0;

/* Game logic functions */
function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.floor(Math.random() * choices.length)];
}

// takes a player selection and a computer one and returns [status,text]
// interpret status: 0 : draw, -1 lose, 1 win
function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return [0, `It's a Draw !`];
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return [1, `You Win! Computer Choose ${computerSelection}`];
  } else {
    return [-1, `You Lose! Computer Choose ${computerSelection}`];
  }
}

/* Game UI functions */
function getDayName(num) {
  const DAYS = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  return DAYS[num];
}

function getDaytimeName(time) {
  if (time >= 5 && time <= 12) return "morning";
  else if (time > 12 && time <= 17) return "afternoon";
  else if (time > 17 && time <= 20) return "evening";
  else return "night";
}

function applyDayTimeStyles() {
  const d = new Date();
  // get the name of today
  const day = getDayName(d.getDay());
  // get the day time : morning, afternoon, or evening
  const dayTime = getDaytimeName(d.getHours());
  // update the body background according to the current day time
  document.body.style.background = `var(--${dayTime}-bg)`;
  // updating the text in the main heading to match your current time ;)
  dayTimeSpan.innerText = getDayName(d.getDay()) + " " + getDaytimeName(d.getHours());
  // update the position of the sun (or sun)
  circle.classList.add(`sun-${dayTime}`);
  // change the color of the main heading text accordingly to time
  mainTitle.style.color = `var(--${dayTime}-text-c)`;
}

function startGameUI() {
  // UI
  splashScreen.classList.add("hide-left");
  gameUI.classList.add("show-right");
  overlay.classList.add("black");
}

function updateScore(status) {
  if (status == -1) computerScore.innerText = ++scoreComputer;
  else if (status === 1) userScore.innerText = ++scoreUser;
}

function displayRoundResult(status, text) {
  const newElem = document.createElement("div");
  newElem.classList.add("round-result");
  newElem.innerText = text;
  if (status === 0) newElem.classList.add("draw");
  else if (status == 1) newElem.classList.add("win");
  else newElem.classList.add("lose");
  gameUI.append(newElem);

  setInterval(() => {
    newElem.classList.add("hide");
  }, 1000);
  setInterval(() => {
    newElem.remove();
  }, 1600);
}

function displayWinner() {
  console.log("the winner is ");
  console.log(scoreUser === 5 ? document.querySelector(".player-name").innerText : "computer");
  scoreUser = 0;
  scoreComputer = 0;
}

function playRoundEvent(e) {
  e.preventDefault();
  const userChoice = e.currentTarget.id;
  const computerChoice = getComputerChoice();
  const roundResults = playRound(userChoice, computerChoice);
  const status = roundResults[0];
  const resultText = roundResults[1];
  updateScore(status);
  if (scoreComputer === 5 || scoreUser === 5) displayWinner();
  else displayRoundResult(status, resultText);
}

playForm.onsubmit = (e) => {
  e.preventDefault();
  if (document.querySelector(".player-name-inp").value !== "") {
    document.querySelector(".player-name").innerText = document.querySelector(".player-name-inp").value;
    startGameUI();
  }
};

rpsBtns.forEach((btn) => {
  btn.addEventListener("click", playRoundEvent);
});
