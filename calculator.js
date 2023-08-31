function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function operate(operator, firstNumber, secondNumber) {
    let result = 0;
    switch (operator) {
        case "+":
            result = add(firstNumber, secondNumber);
            break;
        case "-":
            result = subtract(firstNumber, secondNumber);
            break;
        case "*":
            result = multiply(firstNumber, secondNumber);
            break;
        case "/":
            result = divide(firstNumber, secondNumber);
            break;
    }
    return result;
}

// Display functions

function refreshDisplay (newValue) {
    const display = document.getElementById("display");
    const pDisplay = display.firstElementChild;
    pDisplay.textContent = newValue;
}

// Main functionality

function getFirstNumber (event, operateObj) {
    // if 1st entry
    // TODO: check if nog operator and not 0 - strip zero from beginning
    const value = event.target.id;
    if (!operateObj.number1) {
        operateObj.number1 = "";
    }
    operateObj.number1 = operateObj.number1 + value;
    refreshDisplay(operateObj.number1);
}
function getOperator(event, operateObj) {};
function getSecondNumber(event, operateObj) {};
function getResult(operateObj) {};

// Event listener

const buttons = document.querySelectorAll("button");
let operateObj = {};
buttons.forEach(button => button.addEventListener(
    "click",
    function (e) {
        // while e.target.id is a number
        getFirstNumber(e, operateObj);
    }
));