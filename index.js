const displayPanel = document.querySelector(".display-panel .result");
const numbersBtns = document.querySelector(".numbers-buttons");
const opsBtns = document.querySelector(".ops-buttons");

let num1 = 0;
let num2 = 0;
let operator = null;
let result = 0;

let calculationStage = "first"; // [first, second, result]

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

numbersBtns.addEventListener("click", (e) => {
  if (!e.target.tagName === "BUTTON") return;
  const numberPressed = e.target.dataset.value;

  switch (calculationStage) {
    case "first":
      num1 += numberPressed;
      updateDisplay(num1);
      break;
    case "second":
      num2 += numberPressed;
      updateDisplay(num2);
      break;
    case "result":
      num1 = numberPressed;
      calculationStage = "first";
      updateDisplay(num1);
      break;
  }

  console.table(num1, operator, num2, result, `(state: ${calculationStage})`);
});

opsBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("ops-math")) {
    if (calculationStage === "second") {
      result = operate(num1, num2, operator);
      num1 = result;
      num2 = 0;
      updateDisplay(result);
    }
    calculationStage = "second";
    operator = e.target.id.split("-")[1];
  }

  if (e.target.id === "btn-equal" && calculationStage === "second") {
    result = operate(num1, num2, operator);
    num1 = result;
    num2 = 0;
    calculationStage = "result";
    updateDisplay(result);
  }

  if (e.target.id === "btn-del") {
    if (calculationStage === "first" && num1) {
      num1 = num1.slice(0, -1);
      updateDisplay(num1);
    } else if (calculationStage === "second" && num2) {
      num2 = num2.slice(0, -1);
      updateDisplay(num2);
    }
  }

  if (e.target.id === "btn-ac") {
    num1 = 0;
    num2 = 0;
    operator = null;
    result = 0;
    calculationStage = "first";
    updateDisplay(0);
    console.clear();
  }

  console.table(
    num1,
    operator,
    num2,
    "=",
    result,
    `(state: ${calculationStage})`
  );
});
