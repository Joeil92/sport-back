import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import WorkoutController from "../controller/workoutController";

export default class WorkoutRouter
{
    constructor(
        private controller = new WorkoutController()
    ) {}

    public routes() {
        const router = express.Router();
        const controller = this.controller;

        router.route('/').post(controller.add);

        return router;
    }
}