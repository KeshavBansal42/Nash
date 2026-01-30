import { ZodType, ZodError } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
  (schemas: ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      req.body = schemas.parse(req.body);

      next();
    } catch (err) {
      if (err instanceof ZodError) {
        return res.status(400).json({
          message: "Request validation failed",
          errors: err.issues.map((issue) => ({
            path: issue.path.join("."),
            message: issue.message,
          })),
        });
      }

      next(err);
    }
  };
