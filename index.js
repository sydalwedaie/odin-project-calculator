const displayPanel = document.querySelector(".display-panel .result");
const memoryBtns = document.querySelector(".memory-buttons");
const numbersBtns = document.querySelector(".numbers-buttons");
const opsBtns = document.querySelector(".ops-buttons");

const state = {
  num1: 0,
  num2: 0,
  operator: null,
  result: 0,
  calculationStage: "first",
  memory: 0,
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
  let numberContent = parseFloat(number);
  let numberExpo = numberContent.toExponential();

  if (numberContent.toString().length <= 12) {
    displayPanel.textContent = numberContent;
  } else if (numberExpo.toString().length <= 12) {
    displayPanel.textContent = numberExpo;
  } else {
    displayPanel.textContent = numberContent.toExponential(6);
  }
}

// Event Listeners

memoryBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-memory-set")) {
    state.memory = parseFloat(state.result || state.num2 || state.num1);
    displayPanel.classList.add("memory-indicator");
  }
  if (e.target.classList.contains("btn-memory-recal")) {
    if (state.calculationStage === "first") {
      state.num1 = state.memory.toString();
    } else if (state.calculationStage === "second") {
      state.num2 = state.memory.toString();
    }
    updateDisplay(state.memory);
  }
});

numbersBtns.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    handleNumberPress(e.target.dataset.value, state);
    console.table(state);
  }
});

opsBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("ops-math")) {
    const operator = e.target.id.split("-")[1];
    handleOperatorPress(operator, state);
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

document.addEventListener("keypress", (e) => {
  if (parseInt(e.key) >= 0 || parseInt(e.key) <= 9) {
    handleNumberPress(e.key, state);
  }

  if (e.key === "Enter") {
    e.preventDefault();
    handleEqualPress(state);
  }

  switch (e.key) {
    case "+":
      handleOperatorPress("add", state);
      break;
    case "-":
      handleOperatorPress("subtract", state);
      break;
    case "*":
      handleOperatorPress("multiply", state);
      break;
    case "/":
      handleOperatorPress("divide", state);
      break;
  }
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

function handleOperatorPress(operator, state) {
  if (state.calculationStage === "second" && state.num2) {
    state.result = operate(state.num1, state.num2, state.operator);
    state.num1 = state.result;
    state.num2 = 0;
    updateDisplay(state.result);
  }
  state.calculationStage = "second";
  state.operator = operator;
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
