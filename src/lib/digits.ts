export let digits = [
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
] as const;

export type InputItem = typeof digits[number];
