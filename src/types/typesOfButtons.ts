export type ButtonFunctionType = {
  classToApply: string;
  buttonText: string;
  isItDisabled: boolean;
  clickFunction: () => void;
};

export type ButtonNavigationType = {
  linkToPath: string;
  classToApply: string;
  buttonText: string;
};
