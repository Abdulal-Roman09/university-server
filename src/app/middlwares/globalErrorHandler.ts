import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";
import config from "../config";
import { ZodError } from "zod";

const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSources = [
    {
      path: '',
      message: 'Something went wrong',
    },
  ];

  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources





  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: config.NODE_ENV === 'development' ? err : undefined,
    stack: config.NODE_ENV === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;
