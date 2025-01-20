const displayPanel = document.querySelector(".display-panel .result");
const numbersBtns = document.querySelector(".numbers-buttons");
const opsBtns = document.querySelector(".ops-buttons");

const state = {
  num1: 0,
  num2: 0,
  operator: null,
  result: 0,
  calculationStage: "first",
};

function operate(num1, num2, operator) {
  switch (operator) {
    case "add":
      return parseFloat(num1) + parseFloat(num2);
    case "subtract":
      return parseFloat(num1) - parseFloat(num2);
    case "multiply":
      return parseFloat(num1) * parseFloat(num2);
    case "divide":
      return parseFloat(num1) / parseFloat(num2);
  }
}

function updateDisplay(number) {
  displayPanel.textContent = parseFloat(number);
}

// Event Listeners

numbersBtns.addEventListener("click", (e) => {
  if (!e.target.tagName === "BUTTON") return;
  handleNumberPress(e.target.dataset.value, state);

  console.table(state);
});

opsBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("ops-math")) {
    handleOperatorPress(e, state);
  }

  if (e.target.id === "btn-equal" && state.calculationStage === "second") {
    handleEqualPress(state);
  }

  if (e.target.id === "btn-del") {
    handleDeletePress(state);
  }

  if (e.target.id === "btn-ac") {
    handleAcPress(state);
  }

  console.table(state);
});

// Event Handlers

function handleNumberPress(number, state) {
  switch (state.calculationStage) {
    case "first":
      state.num1 += number;
      updateDisplay(state.num1);
      break;
    case "second":
      state.num2 += number;
      updateDisplay(state.num2);
      break;
    case "result":
      state.num1 = number;
      state.calculationStage = "first";
      updateDisplay(state.num1);
      break;
  }
}

function handleOperatorPress(event, state) {
  if (state.calculationStage === "second" && state.num2) {
    state.result = operate(state.num1, state.num2, state.operator);
    state.num1 = state.result;
    state.num2 = 0;
    updateDisplay(state.result);
  }
  state.calculationStage = "second";
  state.operator = event.target.id.split("-")[1];
}

function handleEqualPress(state) {
  state.result = operate(state.num1, state.num2, state.operator);
  state.num1 = state.result;
  state.num2 = 0;
  state.calculationStage = "result";
  updateDisplay(state.result);
}

function handleDeletePress(state) {
  if (state.calculationStage === "first" && state.num1) {
    state.num1 = state.num1.slice(0, -1) || 0;
    updateDisplay(state.num1);
  } else if (state.calculationStage === "second" && state.num2) {
    state.num2 = state.num2.slice(0, -1) || 0;
    updateDisplay(state.num2);
  }
}

function handleAcPress(state) {
  state.num1 = 0;
  state.num2 = 0;
  state.operator = null;
  state.result = 0;
  state.calculationStage = "first";
  updateDisplay(0);
  console.clear();
}
