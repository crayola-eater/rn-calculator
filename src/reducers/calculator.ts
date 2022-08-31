import { roundedValue } from "../hooks/use-calculator";
import type { InputItem } from "../lib/digits";
import type { Operator, valuesState } from "../lib/types";

/**
 * The action here could be changed. Instead of `InputItem` its structure could instead be:
 *
 *    {
 *        type: "NEW_INPUT", // Or whatever you call it
 *        payload: InputItem
 *    }
 *
 * This would then allow further action types to be added easily (in the future and if needed). Have not done this for now
 * as it adds additional complexity with little immediate benefit.
 */
export default function reducer(
  prev: valuesState,
  action: InputItem
): valuesState {
  const tempValue: number = prev.display
    ? prev.display.endsWith("%")
      ? parseFloat(prev.display) / 100
      : Number(prev.display)
    : prev.result;

  switch (action.type) {
    case "number":
      return handleNumber(prev, action);
    case "operator":
      return handleOperator(prev, action, tempValue);
    case "equal":
      return handleEqual(prev, tempValue);
    case "clear":
      return handleClear(prev);
    case "+/-":
      return handlePlusOrMinus(prev, tempValue);
    case "percentage":
      return handlePercentage(prev, tempValue);
    default:
      console.warn("Unhandled action", action);
      console.warn("Returning existing state (unmodified)");
      return prev;
  }
}

export function handleNumber(prev: valuesState, item: InputItem): valuesState {
  return {
    ...prev,
    display: prev.display + item.value,
    waitingForOperand: !prev.waitingForOperand,
  };
}

export function handleOperator(
  prev: valuesState,
  item: InputItem,
  tempValue: number
): valuesState {
  if ("operator" !== item.type) {
    return prev;
  }

  const displayOperator =
    item.value === "+" || item.value === "-"
      ? item.value
      : item.value === "*"
      ? "×"
      : item.value === "/"
      ? "÷"
      : "";

  if (typeof prev.operator === "undefined") {
    return {
      ...prev,
      operator: item.value,
      display: "",
      waitingForOperand: false,
      result: tempValue,
      equation: roundedValue(tempValue, 3) + displayOperator,
    };
  }

  if (prev.waitingForOperand) {
    return {
      ...prev,
      display: "",
      operator: item.value,
      equation: prev.equation.replace(/[+-×÷]$/g, displayOperator),
    };
  }

  return handleEquation(prev, tempValue, prev.operator, displayOperator);
}

export function handleEqual(prev: valuesState, tempValue: number): valuesState {
  return !prev.equation && prev.operator === undefined
    ? { ...prev, result: tempValue }
    : handleEquation(prev, tempValue);
}

export function handleEquation(
  prev: valuesState,
  tempValue: number,
  operator?: Operator,
  displayOperator?: string
): valuesState {
  const handleOperator = (result: number) => {
    return {
      ...prev,
      display: "",
      result: result,
      operator: operator,
      waitingForOperand: true,
      equation:
        prev.equation +
        tempValue +
        (operator !== undefined ? displayOperator : ""),
    };
  };

  switch (prev.operator) {
    case "+":
      return handleOperator(prev.result + tempValue);
    case "-":
      return handleOperator(prev.result - tempValue);
    case "*":
      return handleOperator(prev.result * tempValue);
    case "/":
      return handleOperator(prev.result / tempValue);
    default:
      return prev;
  }
}

export function handleClear(prev: valuesState): valuesState {
  return {
    ...prev,
    display: "",
    operator: undefined,
    waitingForOperand: true,
    result: 0,
    equation: "",
  };
}

export function handlePlusOrMinus(
  prev: valuesState,
  tempValue: number
): valuesState {
  return prev.display
    ? { ...prev, display: (-tempValue).toString() }
    : { ...prev, result: -prev.result };
}

export function handlePercentage(prev: valuesState, tempValue: number) {
  return { ...prev, display: tempValue.toString() + "%" };
}
