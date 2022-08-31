import { useReducer } from "react";
import type { InputItem } from "../lib/digits";
import calculatorReducer from "../reducers/calculator";

export const roundedValue = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;

export default function useCalculator() {
  const [state, dispatch] = useReducer(calculatorReducer, {
    display: "",
    waitingForOperand: true,
    result: 0,
    operator: undefined,
    equation: "",
  });

  const handleAllFunctions = (item: InputItem) => {
    dispatch(item);
  };

  return {
    values: state,
    handleAllFunctions,
    roundedValue,
  };
}
