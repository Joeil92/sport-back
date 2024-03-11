import { NextFunction, Request, Response } from "express";
import WorkoutCase from "../use_case/workoutCase";
import { WorkoutBody } from "../shared/types/workout.interface";

export default class WorkoutController
{
    constructor(
        private useCase = new WorkoutCase()
    ) {}

    public add = async (req: Request, res: Response, next: NextFunction) => {
        const body = req.body as WorkoutBody

        return this.useCase.add(body)
            .then(workout => res.json({
                message: 'Workout has been added',
                data: workout
            }))
            .catch(err => next(err));
    }
}