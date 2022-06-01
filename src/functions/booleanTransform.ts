export const booleanTransform = (value: string | boolean) => {
  if (value === "true") return true;
  if (value === "false") return false;
  return value;
};
