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

        /**
         * @swagger
         * /users:
         *   post:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
        */
        router.route('/').post(controller.add);

        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of JSONPlaceholder users
         *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
        */
        router.route('/').get(authMiddleware, controller.findAll);

        return router;
    }
}