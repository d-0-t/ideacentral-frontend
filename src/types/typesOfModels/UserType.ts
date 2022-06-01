import { CommentDocument } from "./CommentType";
import { IdeaDocument } from "./IdeaType";

export type UserContactLinkType = {
  title: string;
  url: string;
  public: boolean;
};

export type UserPersonalInfoType = {
  avatar: string;
  name: {
    firstName: string;
    lastName: string;
    public: boolean;
  };
  birthday: {
    date: Date;
    public: boolean;
  };
  location: {
    country: {
      name: string;
      public: boolean;
    };
  };
  bio: string;
  contacts: {
    email: {
      data: string;
      public: boolean;
    };
    phone: {
      data: string;
      public: boolean;
    };
    links: UserContactLinkType[];
  };
};

export type UserDocument = Document & {
  _id: string;
  login: {
    username: string;
    email: string;
    password: string;
    admin: boolean;
    banned: boolean;
    reports: string[];
  };
  personal: UserPersonalInfoType;
  ideas: string[] | Partial<IdeaDocument>[];
  interactions: {
    favorites: string[] | Partial<IdeaDocument>[];
    comments: string[] | Partial<CommentDocument>[];
    upvotes: string[] | Partial<IdeaDocument>[];
    downvotes: string[] | Partial<IdeaDocument>[];
  };
  messages: {
    penpal: string | Partial<UserDocument>;
    messages: string[];
    read: boolean;
  }[];
  power: number;
  follow: {
    followers: {
      count: number;
      users: string[] | Partial<UserDocument>[];
    };
    following: {
      count: number;
      users: string[] | Partial<UserDocument>[];
    };
  };
};
