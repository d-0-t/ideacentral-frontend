import { KeyValueAnyType } from "../types/typesOfState";

// This function compares two objects and returns only the fields that have been changed
export default function dataChangeFilter(
  original: KeyValueAnyType,
  submitted: KeyValueAnyType
) {
  const isObject = (obj: KeyValueAnyType) => obj && typeof obj === "object";

  let newObj: KeyValueAnyType = {};

  Object.keys(submitted).forEach((key) => {
    if (key === "links") {
      newObj[key] = submitted[key];
      return;
    }
    if (!isObject(submitted[key])) {
      if (submitted[key] !== original[key]) {
        newObj[key] = submitted[key];
      }
    } else {
      let deeperCheck = dataChangeFilter(original[key], submitted[key]);
      if (isObject(deeperCheck) && Object.keys(deeperCheck).length !== 0)
        newObj[key] = dataChangeFilter(original[key], submitted[key]);
    }
  });
  return newObj;
}
