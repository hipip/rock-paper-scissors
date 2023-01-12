function getComputerChoice() {
  const choices = ["rock", "paper", "scissors"];
  return choices[Math.round(Math.random() * 2)];
}

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    return [0, `It's a Draw !`];
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return [1, `You Win! ${playerSelection} beats ${computerSelection}`];
  } else {
    return [-1, `You Lose! ${computerSelection} beats ${playerSelection}`];
  }
}

function game() {
  let playerScore = 0,
    computerScore = 0;
  for (let i = 0; i < 5; i++) {
    do {
      var userChoice = prompt("rock, paper or scissors ? ");
    } while (
      userChoice !== "rock" &&
      userChoice !== "paper" &&
      userChoice !== "scissors"
    );
    const computerChoice = getComputerChoice();
    const resultArr = playRound(userChoice, computerChoice);
    const status = resultArr[0];
    const str = resultArr[1];

    if (status === 1) playerScore++;
    else if (status === -1) computerScore++;
    alert(str);
  }

  if (playerScore > computerScore) alert("Congratz you won !");
  else if (playerScore < computerScore) alert("you lose ;( !");
  else alert("it's a draw");
}

game();
