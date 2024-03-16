import express from "express";
import AuthController from "../controller/authController";

export default class AuthRouter {
    constructor(
        private controller = new AuthController()
    ) { }
    
    /**
    * @swagger
    * tags:
    *   - name: Authentication
    *     description: APIs related to user authentication
    */
    public routes() {
        const router = express.Router();
        const controller = this.controller;

        /**
         * @swagger
         * /auth:
         *  post:
         *    tags:
         *      - Authentication
         *    produces:
         *      - application/json
         *    summary: Generate authentication token
         *    requestBody:
         *      required: true
         *      content:
         *        application/json:
         *          schema:
         *            type: object
         *            properties:
         *              email:
         *                type: string
         *              password:
         *                type: string
         *    responses:
         *      200:
         *          description: Auth token
         *      400:
         *          description: Bad request
         */
        router.route('/').post(controller.auth);

        return router;
    }
}