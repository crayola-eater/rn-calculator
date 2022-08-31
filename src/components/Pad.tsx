import { Text, TouchableOpacity, View } from "react-native";
import { StyleSheet } from "react-native";
import { colors } from "../config";
import useCalculator from "../hooks/use-calculator";
import { digits } from "../lib/digits";
import normalize from "../lib/normalize";

export default function Pad() {
  const { values, handleAllFunctions, roundedValue } = useCalculator();

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
        <Text style={styles.equationText} numberOfLines={1} ellipsizeMode="head">
          {roundedValue(values.result, 2)}
        </Text>
      </View>
      {digits.map((digit, index) => (
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
          onPress={() => handleAllFunctions(digit)}
        >
          <Text style={digit.type === "number" ? styles.smallTextDark : styles.smallTextLight}>
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
