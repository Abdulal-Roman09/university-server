import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validation = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
      });
      next();
    } catch (err) {
      next(err);
    }
  };
};
export default validation