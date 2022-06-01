type ErrorResponseType = {
  status: string | number;
  statusText: string;
  message: string;
};

export const errorResponseObjectConstructor = (err: any) => {
  let errorObject: ErrorResponseType = {
    status: err.response?.status,
    statusText: err.response?.statusText,
    message: err.response?.data?.message || err.response?.data?.error,
  };
  return errorObject;
};

export const errorUnauthorized: ErrorResponseType = {
  status: 401,
  statusText: "Unauthorized",
  message: "Unauthorized. Insufficient permissions.",
};

export const errorNotFound: ErrorResponseType = {
  status: 404,
  statusText: "Not Found",
  message: "Content not found.",
};
