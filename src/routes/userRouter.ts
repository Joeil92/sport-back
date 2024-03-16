import express from "express";
import UserController from "../controller/userController";
import authMiddleware from "../middleware/authMiddleware";

export default class UserRouter {
    constructor(
        private controller = new UserController()
    ) { }

    /**
    * @swagger
    * tags:
    *   - name: User
    *     description: APIs related to user model
    */
    public routes() {
        const router = express.Router();
        const controller = this.controller;

        /**
         * @swagger
         * /users:
         *   post:
         *     tags:
         *      - User
         *     produces:
         *      - application/json
         *     summary: Add new user
         *     parameters:
         *        - name: email
         *          in: body
         *          required: true
         *          type: string
         *        - name: password
         *          in: body
         *          required: true
         *          type: string   
         *        - name: firstname
         *          in: body
         *          required: true
         *          type: string
         *        - name: lastname
         *          in: body
         *          required: true
         *          type: string
         *        - name: phone
         *          in: body
         *          required: true
         *          type: string 
         *        - name: weigth
         *          in: body
         *          type: number 
         *        - name: size
         *          in: body
         *          type: number 
         *        - name: imageUrl
         *          in: body
         *          type: string
         *        - name: roles
         *          in: body
         *          type: string[]
        */
        router.route('/').post(controller.add);

        /**
         * @swagger
         * /users/:id:
         *   get:
         *     tags:
         *      - User
         *     summary: Retrieve user
         */
        router.route('/:id').get(controller.findById);

        /**
         * @swagger
         * /users:
         *   get:
         *     tags:
         *      - User
         *     summary: Retrieve a list of users
        */
        router.route('/').get(authMiddleware, controller.findAll);

        return router;
    }
}