import { useEffect, useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../config";
import { Operator } from "../lib/types";

type valuesState = {
  display: string;
  waitingForOperand: boolean;
  result: number;
  operator: Operator | undefined;
  equation: string;
};

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

  const handleFunctions = (type: string, value: any) => {
    let tempValue: number = values.display
      ? Number(values.display)
      : values.result;
    let displayOperator: string;
    console.log(value);

    switch (type) {
      case "number":
        setValues({ ...values, display: values.display.toString() + value });
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
        } else {
          handleEquation(tempValue, value, displayOperator);
        }

        break;
      case "equal":
        handleEquation(tempValue);

        break;
      case "clear":
        onClear();
        break;
      case "+/-":
        values.display
          ? setValues({ ...values, display: (-tempValue).toString() })
          : setValues({ ...values, result: -values.result });
        console.log("===", values);
        break;
      case "percentage":
        console.log("====================================");
        break;
    }
  };

  const handleEquation = (
    tempValue: number,
    operator?: Operator,
    displayOperator?: string
  ) => {
    switch (values.operator) {
      case "+":
        setValues({
          ...values,
          display: "",
          result: values.result + tempValue,
          operator: operator,
          waitingForOperand: true,
          equation:
            values.equation +
            tempValue +
            (operator !== undefined ? displayOperator : ""),
        });
        break;
      case "-":
        setValues({
          ...values,
          display: "",
          result: values.result - tempValue,
          operator: operator,
          waitingForOperand: true,
          equation:
            values.equation +
            tempValue +
            (operator !== undefined ? displayOperator : ""),
        });
        break;
      case "*":
        setValues({
          ...values,
          display: "",
          result: values.result * tempValue,
          operator: operator,
          waitingForOperand: true,
          equation:
            values.equation +
            tempValue +
            (operator !== undefined ? displayOperator : ""),
        });
        break;
      case "/":
        setValues({
          ...values,
          display: "",
          result: values.result / tempValue,
          operator: operator,
          waitingForOperand: true,
          equation:
            values.equation +
            tempValue +
            (operator !== undefined ? displayOperator : ""),
        });
        break;
    }
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const onClear = () => {
    setValues({
      ...values,
      display: "",
      operator: undefined,
      waitingForOperand: true,
      result: 0,
      equation: "",
    });
  };

  let digits: any = [
    { type: "clear", value: "C", title: "AC" },
    { type: "+/-", value: "+/-", title: "±" },
    { type: "percentage", value: "%", title: "﹪" },
    { type: "operator", value: "/", title: "÷" },
    { type: "number", value: 7, title: "7" },
    { type: "number", value: 8, title: "8" },
    { type: "number", value: 9, title: "9" },
    { type: "operator", value: "*", title: "×" },
    { type: "number", value: 4, title: "4" },
    { type: "number", value: 5, title: "5" },
    { type: "number", value: 6, title: "6" },
    { type: "operator", value: "-", title: "-" },
    { type: "number", value: 1, title: "1" },
    { type: "number", value: 2, title: "2" },
    { type: "number", value: 3, title: "3" },
    { type: "operator", value: "+", title: "+" },
    { type: "number", value: ".", title: "." },
    { type: "number", value: 0, title: "0" },
    { type: "delete", value: "del", title: "⌫" },
    { type: "equal", value: "=", title: "=" },
  ];

  return (
    <View style={[styles.container, styles.viewBottom]}>
      <View style={styles.display}>
        <Text style={styles.resultText}>{values.equation}</Text>
      </View>
      <View style={styles.display}>
        <Text
          style={styles.equationText}
          numberOfLines={1}
          ellipsizeMode="head"
        >
          {values.display ? values.display : roundedValue(values.result, 2)}
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
          onPress={() => handleFunctions(digit.type, digit.value)}
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
    fontSize: 70,
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
