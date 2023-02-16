let btns = document.querySelectorAll(".btn");
let display = document.querySelector(".display");
//Global variable for equation to be kept track of
let equation = [];

//Add event listeners to buttons in DOM
for (let btn of btns) {
  btn.addEventListener("click", btnChecker);
}

//Create basic operations to perform
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

//Determine which operation to perform based on operator
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

//Check content of button clicked
function btnChecker() {
  //Create strings for number options and operator options
  let numbers = "0123456789.";
  let operators = "+-*/%";

  //Check if content is a number
  if (numbers.includes(this.textContent)) {
    isNum(this.textContent);
  }
  //Check if content is an operator
  if (operators.includes(this.textContent)) {
    isOperator(this.textContent);
  }
  //If it's an equals sign, solve equation
  if (this.textContent === "=") {
    //If there is only one number and one operator, pass number in as both arguments
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
  //Clear equation being built if A/C
  if (this.textContent === "A/C") {
    equation = [];
    display.textContent = 0;
  }
  //Change sign of number, number determined by current length of equation array
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
  //Nothing in equation array, push number into the array
  if (equation.length === 0) {
    equation.push(num);
    //Display current number
    display.textContent = equation[0];
    //If there's already a number in the equation array
  } else if (equation.length === 1) {
    //Concatenate number to what is currently in equation array
    if (num !== "." || !equation[0].includes(num)) {
      equation[0] = equation[0].concat(num);
    }
    //Display number
    display.textContent = equation[0];
  }
  //If equation array has a number and an operator
  if (equation.length >= 2) {
    //If there is no second number yet
    if (equation.length === 2) {
      equation.push(num);
      //If there is a second number already started
    } else {
      if (num !== "." || !equation[2].includes(num)) {
        equation[2] = equation[2].concat(num);
      }
    }
    //Display second number
    display.textContent = equation[2];
  }
}

function isOperator(operator) {
  //If there's a number already in equation array
  if (equation.length === 1) {
    equation[1] = operator;
    //If the equation array is full, solve what has previously been passed in
  } else if (equation.length === 3) {
    let result = operate(equation[1], equation[0], equation[2]).toFixed(2);
    //Set result to the first number
    equation[0] = result;
    //Set the new operator
    equation[1] = operator;
    //Remove previous second number
    equation.pop();
    //Display result
    display.textContent = result;
  }
}
