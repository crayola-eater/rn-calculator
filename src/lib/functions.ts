export const roundedValue = (value: number, digits: number) =>
  Math.round(value * 10 ** digits) / 10 ** digits;
