/// to select elemnts from HTMl
const numButtons = document.querySelectorAll(".numbers");
const operators = document.querySelectorAll(".operator");
const delet = document.querySelector(".delete");
const clear = document.querySelector(".clear");
const displayBottom = document.querySelector(".display1");
const displayTop = document.querySelector(".display2");
const equalBtn = document.querySelector(".equal");

// set initial variables
let operation;
let curValue = "";
let prevValue = "";

// get the value when btns clicked

function getNumberClicked(number) {
  if (number == "." && curValue.includes(".")) return;
  if (curValue == "0" && number != ".") {
    curValue = number;
    return;
  }
  curValue += number;
  console.log(curValue);
  console.log(prevValue);
}

// to update display
function updateDisplay() {
  displayBottom.innerText = curValue;
  if (operation != null) {
    displayTop.innerText = `${prevValue} ${operation}`;
  }
}

/// to set the operator
function setOperator(operator) {
  if (curValue === "") {
    operation = operator;
    return;
  }
  if (prevValue !== "") {
    calculate();
  }
  operation = operator;
  prevValue = curValue;
  curValue = "";
}

// adding event listenner to Num buttons
Array.from(numButtons).forEach((btn) => {
  btn.addEventListener("click", () => {
    getNumberClicked(btn.innerHTML);
    updateDisplay();
  });
});

// adding event listenner to operators buttons

Array.from(operators).forEach((button) => {
  button.addEventListener("click", () => {
    setOperator(button.innerText);
    updateDisplay();
  });
});

function calculate() {
  let result;
  let current = parseFloat(curValue);
  let previous = parseFloat(prevValue);
  if (isNaN(current) || isNaN(prevValue)) return;
  switch (operation) {
    case "+":
      result = previous + current;
      break;
    case "-":
      result = previous - current;
      break;
    case "/":
      result = previous / current;
      break;
    case "*":
      result = previous * current;
      break;
    default:
      break;
  }
  curValue = result;
  operation = undefined;
  prevValue = "";
}

// add event listenner to the equal btn
equalBtn.addEventListener("click", (button) => {
  calculate();
  updateDisplay();
});
