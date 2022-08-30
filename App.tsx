import { useState } from "react";
import { SafeAreaView, StyleSheet, Switch } from "react-native";
import { Pad } from "./src/components";
import { colors, ThemeContext } from "./src/config";

export default function App() {
  const [theme, setTheme] = useState("light");
  const isLight = theme === "light" ? true : false;

  return (
    <ThemeContext.Provider value={theme}>
      <SafeAreaView
        style={
          isLight
            ? styles.container
            : [styles.container, { backgroundColor: "black" }]
        }
      >
        <Switch
          value={theme === "dark"}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={isLight ? "#f5dd4b" : "#f4f3f4"}
          onValueChange={() => setTheme(isLight ? "dark" : "light")}
        />

        <Pad />
      </SafeAreaView>
    </ThemeContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
