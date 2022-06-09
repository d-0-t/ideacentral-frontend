import { UserDocument } from "./UserType";

export type CommentDocument = Document & {
  _id: string;
  author: string | Partial<UserDocument>;
  idea: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
};
