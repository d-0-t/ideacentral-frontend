import rootReducer from "../redux/reducers/index";
import { KeywordType } from "./typesOfKeyword";
import { UserDocument } from "./typesOfModels/UserType";

export type KeyValueAnyType = {
  [key: string]: any;
};

export type InitialKeywordState = {
  keyword: KeywordType;
};

export type InitialThemeState = {
  theme: string;
};

export type InitialMyUserState = {
  myUser: UserDocument | null;
};

export type SearchPropType = {
  keyword: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type RootState = ReturnType<typeof rootReducer>;
