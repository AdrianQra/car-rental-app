import { Request, Response } from "express";
import { ValidateError } from "tsoa";

export const errorHandler = (
    err: unknown,
    req: Request,
    res: Response,
  ): Response | void => {
    if (err instanceof ValidateError) {
      console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
      return res.status(422).json({
        message: "Validation Failed",
        details: err?.fields,
      });
    }
    if (err instanceof Error) {
      return res.status(500).json({
        message: "Internal Server Error",
      });
    }
  }