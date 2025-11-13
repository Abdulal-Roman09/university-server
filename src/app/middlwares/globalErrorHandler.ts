import { ErrorRequestHandler } from "express";
import { TErrorSources } from "../interface/error";
import handleZodError from "../errors/handleZodError";
import config from "../config";
import { ZodError } from "zod";

// Global Error Handler Middleware
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {

  let statusCode = 500;
  let message = "Something went wrong";
  let errorSources: TErrorSources = [{
    path: '',
    message: 'Something went Wrong'
  }

  ]
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  });
};

export default globalErrorHandler;
/*
success
message
errorSources:[
  path:'',
  message:''
]
stack
*/