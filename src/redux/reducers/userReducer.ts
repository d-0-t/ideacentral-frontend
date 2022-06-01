import { GetUserType } from "../../types/typesOfAction";
import { InitialMyUserState } from "../../types/typesOfState";

const initialState: InitialMyUserState = {
  myUser: null,
};

export default function myUserReducer(
  state = initialState,
  action: GetUserType
) {
  switch (action.type) {
    case "GET_MYUSER":
      return {
        ...state,
        myUser: action.payload.myUser,
      };
    default:
      return state;
  }
}
