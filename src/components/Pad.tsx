import { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../config";
import { digits } from "../lib/digits";
import normalize from "../lib/normalize";
import { Operator, valuesState } from "../lib/types";



export default function Pad() {
  const [values, setValues] = useState<valuesState>({
    display: "",
    waitingForOperand: true,
    result: 0,
    operator: undefined,
    equation: "",
  });

  const roundedValue = (value: number, digits: number) =>
    Math.round(value * 10 ** digits) / 10 ** digits;

  const handleAllFunctions = (type: string, value: any) => {
    let tempValue: number = values.display
      ? values.display.endsWith("%")
        ? parseFloat(values.display) / 100
        : Number(values.display)
      : values.result;
    let displayOperator: string;

    switch (type) {
      case "number":
        setValues({ ...values, display: values.display.toString() + value });

        if (values.waitingForOperand) {
          setValues({
            ...values,
            display: values.display.toString() + value,
            waitingForOperand: false,
          });
        }
        break;
      case "operator":
        displayOperator =
          ((value === "+" || value === "-") && value) ||
          (value === "*" && "×") ||
          (value === "/" && "÷");

        if (typeof values.operator == "undefined") {
          setValues({
            ...values,
            operator: value,
            display: "",
            waitingForOperand: false,
            result: tempValue,
            equation: roundedValue(tempValue, 3) + displayOperator,
          });
        } else if (values.waitingForOperand) {
          let newEquation: string = values.equation.replace(/[+-×÷]$/g, "");
          setValues({
            ...values,
            display: "",
            operator: value,
            equation: newEquation + displayOperator,
          });
        } else {
          handleEquation(tempValue, value, displayOperator);
        }
        break;
      case "equal":
        !values.equation && values.operator === undefined
          ? setValues({ ...values, result: tempValue })
          : handleEquation(tempValue);
        break;
      case "clear":
        setValues({
          ...values,
          display: "",
          operator: undefined,
          waitingForOperand: true,
          result: 0,
          equation: "",
        });
        break;
      case "+/-":
        values.display
          ? setValues({ ...values, display: (-tempValue).toString() })
          : setValues({ ...values, result: -values.result });
        break;
      case "percentage":
        setValues({ ...values, display: tempValue.toString() + "%" });
        break;
    }
  };

  const handleEquation = (
    tempValue: number,
    operator?: Operator,
    displayOperator?: string
  ) => {
    
    const handleOperator = (result: number) => {
      setValues({
        ...values,
        display: "",
        result: result,
        operator: operator,
        waitingForOperand: true,
        equation:
          values.equation +
          tempValue +
          (operator !== undefined ? displayOperator : ""),
      });
    };

    switch (values.operator) {
      case "+":
        handleOperator(values.result + tempValue);
        break;
      case "-":
        handleOperator(values.result - tempValue);
        break;
      case "*":
        handleOperator(values.result * tempValue);
        break;
      case "/":
        handleOperator(values.result / tempValue);
        break;
    }
  };

  return (
    <View style={[styles.container, styles.viewBottom]}>
      <View style={styles.display}>
        <Text
          ellipsizeMode="head"
          numberOfLines={2}
          style={[styles.resultText, { fontSize: normalize(50) }]}
        >
          {values.equation}
          {values.display}
        </Text>
      </View>
      <View style={styles.display}>
        <Text
          style={styles.equationText}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {roundedValue(values.result, 2)}
        </Text>
      </View>
      {digits.map((digit: any, index: number) => (
        <TouchableOpacity
          key={index}
          style={[
            digit.type === "operator"
              ? styles.operators
              : digit.type === "number"
              ? styles.number
              : styles.accent,
            styles.digits,
          ]}
          onPress={() => handleAllFunctions(digit.type, digit.value)}
        >
          <Text
            style={
              digit.type === "number"
                ? styles.smallTextDark
                : styles.smallTextLight
            }
          >
            {digit.title}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
    flexDirection: "row",
    flexWrap: "wrap",
    width: "90%",
  },

  number: {
    backgroundColor: colors.white,
  },

  operators: {
    backgroundColor: colors.blue,
  },

  accent: {
    backgroundColor: colors.btnGray,
  },

  digits: {
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "19%",
    justifyContent: "center",
    alignItems: "center",
    width: 72,
    height: 72,
    margin: "2%",
    borderRadius: 24,
  },

  smallTextLight: {
    fontSize: 32,
    color: colors.white,
  },
  smallTextDark: {
    fontSize: 32,
    color: colors.black,
  },

  viewBottom: {
    position: "absolute",
    bottom: 50,
  },

  display: {
    width: "100%",
  },

  resultText: {
    color: colors.gray,
    fontWeight: "300",
    alignSelf: "flex-end",
  },

  equationText: {
    fontSize: 96,
    color: colors.blue,
    fontWeight: "300",
    alignSelf: "flex-end",
  },
});
