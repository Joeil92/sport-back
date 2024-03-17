import { NextFunction, Request, Response } from "express";
import UserCase from "../use_cases/userCase";

export default class UserController
{
    constructor(
        private useCase = new UserCase()
    ) {}

    public add = async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body;

        return await this.useCase.add(body)
            .then(user => res.json({
                data: user,
                message: "User has been created !"
            }))
            .catch(err => next(err));
    }

    public findById = async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;

        return await this.useCase.findById(userId)
            .then(user => res.json(user))
            .catch(err => next(err));
    };

    public findAll = async (req: Request, res: Response, next: NextFunction) => {
        return await this.useCase.findAll()
            .then(users => res.json(users))
            .catch(err => next(err));
    }
}