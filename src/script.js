const calculator = {op_wait: false, operator: null, valuesd: "0", operand1: null};

function takeinput(digit) {
  const { valuesd, op_wait } = calculator;

  if (op_wait === true) {
    calculator.valuesd = digit;
    calculator.op_wait = false;
  } 
  else 
  {
    calculator.valuesd =
      valuesd === "0" ? digit : valuesd + digit;
  }
}


function calculation(operand1, Operand2, operator) 
{
  if (operator === "+") 
  {
    return operand1 + Operand2;
  } 
  else if (operator === "*") 
  {
    return operand1 * Operand2;
  } 
  else if (operator === "/") 
  {
    return operand1 / Operand2;
  }
  else if (operator === "-")
   {
    return operand1 - Operand2;
  } 

  return Operand2;
}

function handleOperator(nextOperator) {
  const { operand1, valuesd, operator } = calculator;
  const inputValue = parseFloat(valuesd);

  if (operator && calculator.op_wait) {
    calculator.operator = nextOperator;
    return;
  }

  if (operand1 == null && !isNaN(inputValue)) {
    calculator.operand1 = inputValue;
  } else if (operator) {
    const result = calculation(operand1, inputValue, operator);

    calculator.valuesd = `${parseFloat(result.toFixed(7))}`;
    calculator.operand1 = result;
  }

  calculator.op_wait = true;
  calculator.operator = nextOperator;
}


function updateDisplay() 
{
  const display = document.querySelector(".calculator-screen");
  display.value = calculator.valuesd;
}


function inputDecimal(dot) 
{
  if (calculator.op_wait === true) 
  
  {
    calculator.valuesd = "0.";
    calculator.op_wait = false;
    return;
  }

  if (!calculator.valuesd.includes(dot)) 
  {
    calculator.valuesd += dot;
  }
}

function reset() 
{
  calculator.valuesd = "0";
  calculator.operand1 = null;
  calculator.op_wait = false;
  calculator.operator = null;
}


updateDisplay();

const keys = document.querySelector(".calculator-keys");
keys.addEventListener("click", (event) => {
  const { target } = event;
  const { value } = target;
  if (!target.matches("button")) {
    return;
  }

  switch (value) {  
    case ".":
      inputDecimal(value);
      break; 
    case "=":
    case "*":
    case "+":
    case "-": 
    case "/":
      handleOperator(value);
      break;

    case "all-clear":
      reset();
      break;
    default:
      if (Number.isInteger(parseFloat(value))) {
        takeinput(value);
      }
  }

  updateDisplay();
});
