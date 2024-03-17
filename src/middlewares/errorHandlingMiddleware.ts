import { NextFunction, Request, Response } from "express";

export default function errorHandlingMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    err.statusCode = err.statusCode || 400;

    return err.customMessage || err.message
    ? res.status(err.statusCode).json({
        status: err.statusCode,
        message: err.customMessage || err.message
    })
    : res.status(err.statusCode).json({ status: err.statusCode, message: err });
}