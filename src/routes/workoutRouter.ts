import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
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

        /**
         * @swagger
         * /api/workouts:
         *  post:
         *      tags:
         *          - Workout
         *      produces:
         *          - application/json
         *      summary: Add new workout
         *      requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          name:
         *                              type: string
         *                          user_id:
         *                              type: number
         *      responses:
         *          200:
         *              description: new Workout added
         */
        router.route('/').post(authMiddleware, controller.add);

        return router;
    }
}