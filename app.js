let editMode = false;
let decimalAllowed = true;
let operandable = false;
let stringNumber = '0';
let numberOnScreen = 0;
let totalAmount = 0;
let operand = '';
let inputs = document.querySelectorAll('input');

document.querySelector('.screen').innerHTML = stringNumber;

inputs.forEach(input => 
    input.addEventListener('click', inputButton => {
        if (operandable && input.value === "=") {
            performOperand();
            operandable = false;
            operand = '';
            document.querySelector('.screen').innerHTML = totalAmount;
            numberOnScreen = 0;
        }
        else if (input.value === "C") {
            clear();
        }
        else if (input.className == "operand" && input.value !== "=") {
            if (operand.length !== 0) {
                operandFunction(input.value);
            }
            else {
                operandFunction(input.value);
                totalAmount = numberOnScreen;
                numberOnScreen = 0;
                editMode = false;
                operandable = true;
            }
        } 
        else if (input.value !== "=") {
            if (editMode) {
                stringNumber += input.value.toString();
            }
            if (numberOnScreen === 0) {
                stringNumber = input.value.toString();       
                console.log(stringNumber); 
                editMode = true;
            }
            numberOnScreen = convertToIntOrFloat(stringNumber);
            document.querySelector('.screen').innerHTML = stringNumber;
        }
    }
    )
);

function convertToIntOrFloat(number) {
    switch(number.indexOf('.') == -1) {
        case true: 
            return parseInt(number);
        case false:
            return parseFloat(number);
    }
}

function operandFunction(operandSymbol) {
    switch(operandSymbol) {
        case "÷":
            operand = 'divide';
            break;
        case "×":
            operand = 'multiply';
            break;
        case "-":
            operand = 'subtract';
            break;
        case "+":
            operand = 'add';
            break;
        case "=":
            operand = 'equals';
            break;
    }
}

function performOperand() {
    switch(operand) {
        case "divide":
            totalAmount = totalAmount / numberOnScreen;
            break;
        case "multiply":
            totalAmount *= numberOnScreen;
            break;
        case "subtract":
            totalAmount -= numberOnScreen;
            break;
        case "add":
            totalAmount += numberOnScreen;
            break;
    }
    console.log(totalAmount);
}

function clear() {
    editMode = false;
    decimalAllowed = true;
    operandable = false;
    stringNumber = '0';
    numberOnScreen = 0;
    totalAmount = 0;
    operand = '';
    document.querySelector('.screen').innerHTML = stringNumber;
}


