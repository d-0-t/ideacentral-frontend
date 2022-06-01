import { KeywordType } from "./typesOfKeyword";
import { UserDocument } from "./typesOfModels/UserType";

export type GetKeywordType = {
  type: "GET_KEYWORD";
  payload: {
    keyword: KeywordType;
  };
};

export type GetThemeType = {
  type: "GET_THEME";
  payload: {
    theme: string;
  };
};

export type GetUserType = {
  type: "GET_MYUSER";
  payload: {
    myUser: UserDocument;
  };
};
