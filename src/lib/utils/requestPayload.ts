import { Request } from "express";
import { HttpMethod } from "../../types/types";

export const requestPayload = <T>(req: Request) => {
  const payloadToCheck = {
    GET: "params",
    POST: "body",
    PUT: "body",
    PATCH: "body",
    DELETE: "params"
  } as const
  const thisMethod = req.method as HttpMethod
  return req[payloadToCheck[thisMethod]] as T
}