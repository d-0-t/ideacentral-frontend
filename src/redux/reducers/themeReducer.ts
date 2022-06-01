import { GetThemeType } from "../../types/typesOfAction";
import { InitialThemeState } from "../../types/typesOfState";

const initialState: InitialThemeState = {
  theme: "",
};

export default function themeReducer(
  state = initialState,
  action: GetThemeType
) {
  switch (action.type) {
    case "GET_THEME":
      return {
        ...state,
        theme: action.payload.theme,
      };
    default:
      return state;
  }
}
