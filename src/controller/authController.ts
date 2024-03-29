import { NextFunction, Request, Response } from "express";
import AuthCase from "@FitTrackr/use_cases/authCase";
import { Credentials } from "@FitTrackr/types/credentials.interface";

export default class AuthController
{
    constructor(
        private useCase = new AuthCase()
    ) {}

    public auth = (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as Credentials

        this.useCase.auth(body)
            .then(token => res.json(token))
            .catch(err => next(err));
    } 
}