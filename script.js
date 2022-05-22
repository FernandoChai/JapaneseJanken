const playBtn = document.querySelector("button");
const content = document.getElementById("content");

playBtn.addEventListener("click", function () {
  this.remove();
  content.classList.add("content");
  content.innerHTML =
    '<div id="computer">' +
    "<h3>Computer</h3>" +
    "<p>Score: 0</p>" +
    '<div id="computerChoice">' +
    '<img src="Assets/scissors.png" alt="" width="200px" height="120px">' +
    "</div>" +
    "</div>" +
    "<hr>" +
    '<div id="result">' +
    "<h1></h1>" +
    "</div>" +
    '<div id="human">' +
    "<h3>You</h3>" +
    "<p>Score: 0</p>" +
    '<div id="humanChoice">' +
    '<div class="top">' +
    '<img src="Assets/scissors.png" alt="" id="scissors" width="200px" height="120px">' +
    "</div>" +
    ' <div class="bottom">' +
    '<img src="Assets/rock.png" id="rock" alt="" width="200px" height="120px">' +
    '<img src="Assets/paper.png" id="paper" alt="" width="200px" height="120px">' +
    " </div>" +
    "</div>" +
    "</div>";

  const gameChoices = ["scissors", "rock", "paper"];

  function computerRun() {
    var random = Math.floor(Math.random() * 3);
    return gameChoices[random];
  }

  function doProcess(comp, user) {
    if (user === comp) return "DRAW!";
    if (user === "scissors") return comp === "rock" ? "YOU LOSE!" : "YOU WIN!";
    if (user === "rock") return comp === "paper" ? "YOU LOSE!" : "YOU WIN!";
    if (user === "paper") return comp === "scissors" ? "YOU LOSE!" : "YOU WIN!";
  }

  function compAnimation() {
    const compImg = document.querySelector("#computerChoice img");
    var i = 0;
    var time = new Date().getTime();
    setInterval(function () {
      if (new Date().getTime() - time > 1000) {
        clearInterval;
        return;
      }
      compImg.setAttribute("src", "Assets/" + gameChoices[i++] + ".png");
      if (i == gameChoices.length) i = 0;
    }, 100);
  }

  var userScoreCounter = 0;
  var compScoreCounter = 0;

  function setResultColorAndScore(gameResult) {
    if (gameResult === "YOU LOSE!") {
      compScoreCounter++;
      return "red";
    } else if (gameResult === "YOU WIN!") {
      userScoreCounter++;
      return "lightgreen";
    } else return "lightblue";
  }

  const choice = document.querySelectorAll("#humanChoice img");
  const result = document.querySelector("#result h1");
  const userScore = document.querySelector("#human p");
  const compScore = document.querySelector("#computer p");

  choice.forEach(function (userChoice) {
    userChoice.addEventListener("click", function () {
      result.innerHTML = "";
      var comp = computerRun();
      var gameResult = doProcess(comp, userChoice.id);
      result.style.color = setResultColorAndScore(gameResult);

      compAnimation();

      setTimeout(() => {
        const compImg = document.querySelector("#computerChoice img");
        compImg.setAttribute("src", "Assets/" + comp + ".png");
        result.innerHTML = gameResult;
        compScore.innerHTML = "Score: " + compScoreCounter;
        userScore.innerHTML = "Score: " + userScoreCounter;
      }, 1000);
    });
  });
});
