import { ApiResponse } from "../../types/types";

export const successResponse = <T>(data: T, message = "OK"): ApiResponse<T> => {
  const obj: ApiResponse<T> = {
    status: "success",
    message,
  };
  if (data) obj.result = { data }
  return obj
};

export const errorResponse = (message = "Something went wrong"): ApiResponse<null> => {
  return {
    status: "error",
    message,
  };
};