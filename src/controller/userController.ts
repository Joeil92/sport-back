import { NextFunction, Request, Response } from "express";
import UserCase from "@FitTrackr/use_cases/userCase";
import path from 'path';

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
        const userId = req.params.id;
        const avatar = req.file;

        return this.useCase.updateAvatar(userId, avatar)
            .then(() => res.json('Avatar has been updated !'))
            .catch(err => next(err));
    }

    public updateSize = (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        const size = req.body.size;

        return this.useCase.updateSize(userId, size)
        .then(() => res.json('Size has been updated !'))
        .catch(err => next(err));
    }

    public updateWeight = (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        const weight = req.body.weight;

        return this.useCase.updateWeight(userId, weight)
            .then(() => res.json('Weight has been updated !'))
            .catch(err => next(err));
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

    public avatar = (req: Request, res: Response, next: NextFunction) => {
        const filePath = req.params.fileName;
        const pathDestination = path.join(__dirname, '..', process.env.FILE_PATH + 'avatars/' + filePath);

        return res.sendFile(pathDestination);
    }
}