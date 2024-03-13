import express from "express";
import UserController from "../controller/userController";
import authMiddleware from "../middleware/authMiddleware";

export default class UserRouter {
    constructor(
        private controller = new UserController()
    ) { }

    public routes() {
        const router = express.Router();
        const controller = this.controller;

        router.route('/').post(controller.add);

        router.route('/').get(authMiddleware, controller.findAll);

        return router;
    }
}