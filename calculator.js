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
        case "×":
            result = multiply(firstNumber, secondNumber);
            break;
        case "÷":
            result = divide(firstNumber, secondNumber);
            break;
    }
    return result;
}

// Display functions

function refreshDisplay (newValue) {
    const pDisplay = document.getElementById("display").firstElementChild;
    pDisplay.textContent = newValue;
}

function convertOperator (operator) {
    switch (operator) {
        case "add":
            operator = "+";
            break;
        case "subtract":
            operator = "-";
            break;
        case "multiply":
            operator = "×";
            break;
        case "divide":
            operator = "÷";
            break;
        case "equals":
            operator = "=";
            break;
    }
    return operator;
}
// Event listener

const buttons = document.querySelectorAll("button");
let operateObj = {};
buttons.forEach(button => button.addEventListener(
    "click",
    function (e) {
        const inputValue = convertOperator(e.target.id);
        console.log(inputValue);
        console.table(operateObj);
        let displayValue = "";
        // get left term
        if (!operateObj.number1 && /[0-9]/.test(inputValue)) {
            operateObj.number1 = inputValue;
            refreshDisplay(inputValue);
        }
        // keep getting left term if no operator has been inputted
        else if (!operateObj.operator && /[0-9]/.test(inputValue)) {
            operateObj.number1 = operateObj.number1 + inputValue;
            refreshDisplay(operateObj.number1);
        }
        // get operator (first time? What if second or third time?)
        else if (operateObj.number1 && !operateObj.number2 && /[\+÷×-]/.test(inputValue)) {
            operateObj.operator = inputValue;
            console.log("getting operator")
            displayValue = operateObj.number1 + " " + inputValue;
            refreshDisplay(displayValue);
        }
        // get number 2
        else if (!operateObj.number2 && /[0-9]/.test(inputValue)) {
            operateObj.number2 = inputValue;
            displayValue = `${operateObj.number1} ${operateObj.operator} ${operateObj.number2}`;
            refreshDisplay(displayValue);
        }
        // keep getting number2
        else if (operateObj.number2 && /[0-9]/.test(inputValue)) {
            operateObj.number2 = operateObj.number2 + inputValue;
            displayValue = `${operateObj.number1} ${operateObj.operator} ${operateObj.number2}`;
            refreshDisplay(displayValue);
            console.log("still n 2");
        }
        // if input equals second time an operator or =, then calculate result
        else if (operateObj.number2 && /[\+÷×-]/.test(inputValue)) {
            const terms = [parseInt(operateObj.number1), parseInt(operateObj.number2)];
            operateObj.number1 = operate(operateObj.operator, terms[0], terms[1]);
            refreshDisplay(operateObj.number1);
            console.log("finally");
            // re-initialize
            operateObj.operator = inputValue;
            delete operateObj.number2;
        }
        else if (inputValue == "clear")
        {
            refreshDisplay("0.00");
            operateObj = {};
        }
        else if (inputValue == "=")
        {
            const terms = [parseInt(operateObj.number1), parseInt(operateObj.number2)];
            result = operate(operateObj.operator, terms[0], terms[1]);
            refreshDisplay(result);
            operateObj = {};
        }
    }
));