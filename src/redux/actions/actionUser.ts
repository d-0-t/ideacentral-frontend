import { GetUserType } from "../../types/typesOfAction";
import { UserDocument } from "../../types/typesOfModels/UserType";

const GET_MYUSER = "GET_MYUSER";

export function getMyUser(myUser: UserDocument): GetUserType {
  return {
    type: GET_MYUSER,
    payload: {
      myUser,
    },
  };
}
