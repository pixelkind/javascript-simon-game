let fields = [];
let activeColors = ["#F806C4", "#6D4F41", "#FFFF00", "#0000FF"];
let inactiveColors = ["#DC8FCA", "#CA957D", "#ffffba", "#bae1ff"];
let startButton;
let colors = [];
let userColors = [];
let isItUsersTurn = false;

function loadHandler() {
  for (let i = 0; i < 4; i++) {
    let field = document.getElementById("field" + (i + 1));
    field.style.backgroundColor = inactiveColors[i];
    // field.addEventListener("click", clickHandler);
    field.addEventListener("mousedown", pressedHandler);
    field.addEventListener("mouseup", releasedHandler);
    fields.push(field);
  }

  startButton = document.getElementById("startButton");
  startButton.addEventListener("click", startGameHandler);
}

function pressedHandler(event) {
  if (isItUsersTurn) {
    let fieldIndex = parseInt(event.target.dataset.fieldIndex);
    let field = fields[fieldIndex];
    field.style.backgroundColor = activeColors[fieldIndex];
  }
}

function releasedHandler(event) {
  if (isItUsersTurn) {
    let fieldIndex = parseInt(event.target.dataset.fieldIndex);
    let field = fields[fieldIndex];
    field.style.backgroundColor = inactiveColors[fieldIndex];

    userColors.push(fieldIndex);

    let lastIndex = userColors.length - 1;
    if (colors[lastIndex] !== userColors[lastIndex]) {
      alert("YOU FAILED!\nGAME OVER!");
    } else if (colors.length === userColors.length) {
      nextRound();
    }
  }
}

// function clickHandler(event) {
//   if (isItUsersTurn) {
//     let fieldIndex = parseInt(event.target.dataset.fieldIndex);
//     userColors.push(fieldIndex);

//     let lastIndex = userColors.length - 1;
//     if (colors[lastIndex] !== userColors[lastIndex]) {
//       alert("YOU FAILED!\nGAME OVER!");
//     } else if (colors.length === userColors.length) {
//       nextRound();
//     }
//   }
// }

function nextRound() {
  userColors = [];
  let randomField = createRandomIndex();
  colors.push(randomField);
  isItUsersTurn = false;
  playColor(0);
}

function createRandomIndex() {
  let randomNumber = Math.floor(Math.random() * fields.length);
  return randomNumber;
}

function startGameHandler() {
  colors = [];
  userColors = [];
  console.log("Game has started");
  let randomField = createRandomIndex();
  colors.push(randomField);

  // randomField = createRandomIndex();
  // colors.push(randomField);
  // randomField = createRandomIndex();
  // colors.push(randomField);
  // randomField = createRandomIndex();
  // colors.push(randomField);

  playColor(0);
}

function playColor(index) {
  let fieldIndex = colors[index];
  let field = fields[fieldIndex];

  field.style.backgroundColor = activeColors[fieldIndex];

  setTimeout(function () {
    resetColor(index);

    if (colors.length > index + 1) {
      setTimeout(function () {
        playColor(index + 1);
      }, 200);
    } else {
      isItUsersTurn = true;
    }
  }, 1000);
}

function resetColor(index) {
  let fieldIndex = colors[index];
  let field = fields[fieldIndex];

  field.style.backgroundColor = inactiveColors[fieldIndex];
}

window.addEventListener("load", loadHandler);
