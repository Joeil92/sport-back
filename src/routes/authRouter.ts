import express from "express";
import AuthController from "../controller/authController";

export default class AuthRouter
{
    constructor(
        private controller = new AuthController()
    ) {}

    public routes() {
        const router = express.Router();
        const controller = this.controller;

        router.route('/').post(controller.auth);

        return router;
    }
}