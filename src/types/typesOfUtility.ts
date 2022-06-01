export type AuthType = {
  admin: boolean;
  banned: boolean;
  email: string;
  iat: number;
  id: string;
  username: string;
};

export type ErrorResponseType = {
  status: string | number;
  statusText: string;
  message: string;
};