import { GetThemeType } from "../../types/typesOfAction";

const GET_THEME = "GET_THEME";

export function getTheme(theme: string): GetThemeType {
  return {
    type: GET_THEME,
    payload: {
      theme,
    },
  };
}
