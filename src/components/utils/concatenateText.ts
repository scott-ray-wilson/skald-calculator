export const concatenateText = (values: string[]) => {
  if (values.length === 1) {
    return values[0];
  }

  return values
    .map((value, index) => {
      return index === values.length - 2
        ? `${value} `
        : index < values.length - 2
          ? `${value}, `
          : `and ${value}`;
    })
    .join("");
};
