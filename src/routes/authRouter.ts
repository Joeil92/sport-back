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
         *    parameters:
         *      - name: email
         *        in: body
         *        required: true
         *        type: string
         *      - name: password
         *        in: body
         *        required: true
         *        type: string
         */
        router.route('/').post(controller.auth);

        return router;
    }
}