let btns = document.querySelectorAll(".btn");
let display = document.querySelector(".display");
let equation = [];

for (let btn of btns) {
  btn.addEventListener("click", btnChecker);
}

function add(a, b) {
  return +a + +b;
}

function subtract(a, b) {
  return a - b;
}

function remainder(a, b) {
  return a % b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  }
  if (operator === "-") {
    return subtract(a, b);
  }
  if (operator === "*") {
    return multiply(a, b);
  }
  if (operator === "/") {
    return divide(a, b);
  }
  if (operator === "%") {
    return remainder(a, b);
  }
}

function btnChecker() {
  let numbers = "0123456789.";
  let operators = "+-*/%";
  if (numbers.includes(this.textContent)) {
    isNum(this.textContent);
  }
  if (operators.includes(this.textContent)) {
    isOperator(this.textContent);
  }
  if (this.textContent === "=") {
    if (equation.length === 2) {
      display.textContent = operate(
        equation[1],
        equation[0],
        equation[0]
      ).toFixed(2);
    } else {
      display.textContent = operate(
        equation[1],
        equation[0],
        equation[2]
      ).toFixed(2);
    }
    equation = [];
    equation[0] = display.textContent;
  }
  if (this.textContent === "A/C") {
    equation = [];
    display.textContent = 0;
  }
  if (this.textContent === "+/-") {
    if (equation.length === 1) {
      equation[0] = -equation[0];
      display.textContent = equation[0];
    }
    if (equation.length === 3) {
      equation[2] = -equation[2];
      display.textContent = equation[2];
    }
  }
}

function isNum(num) {
  if (equation.length === 0) {
    equation.push(num);
    display.textContent = equation[0];
  } else if (equation.length === 1) {
    if (num !== "." || !equation[0].includes(num)) {
      equation[0] = equation[0].concat(num);
    }
    display.textContent = equation[0];
  }
  if (equation.length >= 2) {
    if (equation.length === 2) {
      equation.push(num);
    } else {
      if (num !== "." || !equation[2].includes(num)) {
        equation[2] = equation[2].concat(num);
      }
    }
    display.textContent = equation[2];
  }
}

function isOperator(operator) {
  if (equation.length === 1) {
    equation[1] = operator;
  } else if (equation.length === 3) {
    let result = operate(equation[1], equation[0], equation[2]).toFixed(2);
    equation[0] = result;
    equation[1] = operator;
    equation.pop();
    display.textContent = result;
  }
}
