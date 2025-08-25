import { ApiResponse } from "../../types/types";

export const successResponse = <T>(data: T, message = "OK"): ApiResponse<T> => {
  return {
    status: "success",
    message,
    result: { data },
  };
};

export const errorResponse = (message = "Something went wrong"): ApiResponse<null> => {
  return {
    status: "error",
    message,
  };
};