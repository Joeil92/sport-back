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
         *     summary: Add new user
        */
        router.route('/').post(controller.add);

        /**
         * @swagger
         * /users/:id:
         *   get:
         *     summary: Retrieve user
         */
        router.route('/:id').get(controller.findById);

        /**
         * @swagger
         * /users:
         *   get:
         *     summary: Retrieve a list of users
        */
        router.route('/').get(authMiddleware, controller.findAll);

        return router;
    }
}