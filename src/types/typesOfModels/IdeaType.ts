import { CommentDocument } from "./CommentType";
import { UserDocument } from "./UserType";

export type IdeaDocument = Document & {
  _id: string;
  author: string | Partial<UserDocument>;
  title: string;
  description: string;
  tags: string[] | string;
  published: boolean;
  anonymous: boolean;
  comments: string[] | CommentDocument[];
  stats: {
    upvotes: {
      count: number;
      users: string[] | Partial<UserDocument>[];
    };
    downvotes: {
      count: number;
      users: string[] | Partial<UserDocument>[];
    };
    favorites: {
      count: number;
      users: string[] | Partial<UserDocument>[];
    };
  };
  createdAt: Date | string;
  updatedAt: Date | string;
};
