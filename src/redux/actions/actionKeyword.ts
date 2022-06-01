import { GetKeywordType } from "../../types/typesOfAction";
import { KeywordType } from "../../types/typesOfKeyword";

const GET_KEYWORD = "GET_KEYWORD";

export function getKeyword(keyword: KeywordType): GetKeywordType {
  return {
    type: GET_KEYWORD,
    payload: {
      keyword,
    },
  };
}
