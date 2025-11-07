import { Request, Response, NextFunction } from "express";
import HttpStatus from "http-status";

const notFound = (req: Request, res: Response, next: NextFunction) => {
  return res.status(HttpStatus.NOT_FOUND).json({
    success: false,
    message: "API not found",
    error: "",
  });
};

export default notFound;
