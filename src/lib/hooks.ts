// import { useState } from "react";
// import { Operator, valuesState } from "./types";



// export const useCalcFunctions = (
//   type: string,
//   value: number | string | Operator
// ) => {
//   const [values, setValues] = useState<valuesState>({
//     display: "",
//     waitingForOperand: true,
//     result: 0,
//     operator: undefined,
//     equation: "",
//   });
//   let tempValue: number = values.display
//     ? values.display.endsWith("%")
//       ? parseFloat(values.display) / 100
//       : Number(values.display)
//     : values.result;
//   let displayOperator: string;

//   const handleEquation = (
//     tempValue: number,
//     operator?: Operator,
//     displayOperator?: string
//   ) => {
//     const handleOperator = (result: number) => {
//       setValues({
//         ...values,
//         display: "",
//         result: result,
//         operator: operator,
//         waitingForOperand: true,
//         equation:
//           values.equation +
//           tempValue +
//           (operator !== undefined ? displayOperator : ""),
//       });
//     };

//     switch (values.operator) {
//       case "+":
//         handleOperator(values.result + tempValue);
//         break;
//       case "-":
//         handleOperator(values.result - tempValue);
//         break;
//       case "*":
//         handleOperator(values.result * tempValue);
//         break;
//       case "/":
//         handleOperator(values.result / tempValue);
//         break;
//     }
//   };

//   switch (type) {
//     case "number":
//       setValues({ ...values, display: values.display.toString() + value });

//       if (values.waitingForOperand) {
//         setValues({
//           ...values,
//           display: values.display.toString() + value,
//           waitingForOperand: false,
//         });
//       }
//       break;
//     case "operator":
//       displayOperator =
//         value === "+" || value === "-"
//           ? value
//           : value === "*"
//           ? "×"
//           : value === "/"
//           ? "÷"
//           : "";

//       if (values.operator === undefined) {
//         //compare values and set type of value to be operator
//         //if(value === "+" | "-" | "*" | "/" | "=" | "%" ? ){

//         setValues({
//           ...values,
//           operator: value as Operator,
//           display: "",
//           waitingForOperand: false,
//           result: tempValue,
//           equation: roundedValue(tempValue, 3) + displayOperator,
//         });
//         // }
//       } else if (values.waitingForOperand) {
//         let newEquation: string = values.equation.replace(/[+-×÷]$/g, "");
//         setValues({
//           ...values,
//           display: "",
//           operator: value as Operator,
//           equation: newEquation + displayOperator,
//         });
//       } else {
//         handleEquation(tempValue, value as Operator, displayOperator);
//       }
//       break;
//     case "equal":
//       !values.equation && values.operator === undefined
//         ? setValues({ ...values, result: tempValue })
//         : handleEquation(tempValue);
//       break;
//     case "clear":
//       setValues({
//         ...values,
//         display: "",
//         operator: undefined,
//         waitingForOperand: true,
//         result: 0,
//         equation: "",
//       });
//       break;
//     case "+/-":
//       values.display
//         ? setValues({ ...values, display: (-tempValue).toString() })
//         : setValues({ ...values, result: -values.result });
//       break;
//     case "percentage":
//       setValues({ ...values, display: tempValue.toString() + "%" });
//       break;
//   }

//   return [values];

//   //   type PropsState = {
//   //     tempValue: number;
//   //     operator?: Operator;
//   //     displayOperator?: string;
//   //   };
// };
