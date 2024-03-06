import express from "express";
import UserController from "../controller/userController";

export default class userRouter
{
    constructor(
        private controller = new UserController()
    ) {}

    public routes() {
        const router = express.Router();
        const controller = this.controller;

        router.route('/').post(controller.add);

        router.route('/').get(controller.find);

        return router;
    }
}