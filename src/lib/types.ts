export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type Operator = "+" | "-" | "*" | "/" | "=" | "%";
export type Params = {
  tempValue: number;
  operator?: Operator;
  displayOperator?: string;
};
export type valuesState = {
  display: string;
  waitingForOperand: boolean;
  result: number;
  operator: Operator | undefined;
  equation: string;
};
