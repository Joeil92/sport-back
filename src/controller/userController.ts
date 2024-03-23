import { NextFunction, Request, Response } from "express";
import UserCase from "@FitTrackr/use_cases/userCase";

export default class UserController
{
    constructor(
        private useCase = new UserCase()
    ) {}

    public add = (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        return this.useCase.add(body)
            .then(user => res.json({
                data: user,
                message: "User has been created !"
            }))
            .catch(err => next(err));
    }

    public uploadAvatar = (req: Request, res: Response, next: NextFunction) => {
        const avatar = req.file;
        console.log(avatar);
    }

    public findById = (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;

        return this.useCase.findById(userId)
            .then(user => res.json(user))
            .catch(err => next(err));
    };

    public findAll = (req: Request, res: Response, next: NextFunction) => {
        return this.useCase.findAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }
}