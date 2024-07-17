const displayElement = document.querySelector(".calculator-input");
const buttonsContainer = document.querySelector(".calculator-keys");

let currentDisplay = "0";
let firstValue = null;
let currentOperator = null;
let isSecondValue = false;

updateDisplay();

function updateDisplay() {
    displayElement.value = currentDisplay;
}

buttonsContainer.addEventListener("click", (event) => {
    const button = event.target;

    if (!button.matches("button")) return;

    if (button.classList.contains("operator")) {
        handleOperator(button.value);
        updateDisplay();
        return;
    }

    if (button.classList.contains("decimal")) {
        handleDecimal();
        updateDisplay();
        return;
    }

    if (button.classList.contains("clear")) {
        clearAll();
        updateDisplay();
        return;
    }

    handleNumber(button.value);
    updateDisplay();
});

const handleNumber = (number) => {
    if (isSecondValue) {
        currentDisplay = number;
        isSecondValue = false;
    } else {
        currentDisplay = currentDisplay === "0" ? number : currentDisplay + number;
    }
};

function handleDecimal() {
    if (!currentDisplay.includes('.')) {
        currentDisplay += '.';
    }
}

function clearAll() {
    currentDisplay = "0";
}

function handleOperator(nextOperator) {
    const currentValue = parseFloat(currentDisplay);

    if (firstValue === null) {
        firstValue = currentValue;
    } else if (currentOperator) {
        const result = compute(firstValue, currentValue, currentOperator);
        currentDisplay = String(result);
        firstValue = result;
    }

    isSecondValue = true;
    currentOperator = nextOperator;
}

function compute(firstOperand, secondOperand, operator) {
    switch (operator) {
        case '+':
            return firstOperand + secondOperand;
        case '-':
            return firstOperand - secondOperand;
        case 'x':
            return firstOperand * secondOperand;
        case '/':
            return firstOperand / secondOperand;
        default:
            return secondOperand;
    }
}
