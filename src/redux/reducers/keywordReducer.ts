import { GetKeywordType } from "../../types/typesOfAction";
import { InitialKeywordState } from "../../types/typesOfState";

const initialState: InitialKeywordState = {
  keyword: "",
};

export default function keywordReducer(
  state = initialState,
  action: GetKeywordType
) {
  switch (action.type) {
    case "GET_KEYWORD":
      return {
        ...state,
        keyword: action.payload.keyword
      };
    default:
      return state;
  }
}
