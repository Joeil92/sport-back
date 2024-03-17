import express from "express";
import authMiddleware from "../middleware/authMiddleware";
import WorkoutController from "../controller/workoutController";

export default class WorkoutRouter
{
    constructor(
        private controller = new WorkoutController()
    ) {}

    /**
     * @swagger
     * tags:
     *  - name: Workout
     *    description: APIs related to workout model
     */
    public routes() {
        const router = express.Router();
        const controller = this.controller;

        router.route('/').post(authMiddleware, controller.add);

        return router;
    }
}