import express from "express";
import UserController from "../controller/userController";
import authMiddleware from "../middlewares/authMiddleware";
import FileService from "../services/fileService";

export default class UserRouter {
    constructor(
        private controller = new UserController(),
        private upload = new FileService('avatars', ['image/jpeg', 'image/png'])
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
        const upload = this.upload.getUpload();

        /**
         * @swagger
         * /api/users:
         *   post:
         *     tags:
         *      - User
         *     produces:
         *      - application/json
         *     summary: Add new user
         *     requestBody:
         *          required: true
         *          content:
         *              application/json:
         *                  schema:
         *                      type: object
         *                      properties:
         *                          email:
         *                              type: string
         *                          pasword:
         *                              type: string
         *                          firstname:
         *                              type: string
         *                          lastname:
         *                              type: string
         *                          phone:
         *                              type: string 
         *                          weigth:
         *                              type: string
         *                          size:
         *                              type: string
         *                          imageUrl:
         *                              type: string
         *     responses:
         *      200:
         *          description: new User added
        */
        router.route('/').post(controller.add);

        /**
         * @swagger
         * /api/users/{id}/avatar:
         *  post:
         *      tags: 
         *          - User
         *      summary: Upload avatar's user
         *      parameters:
         *          - name: id
         *            in: path
         *            required: true
         *            schema:
         *              type: string
         *      responses:
         *          200:
         *              description: Upload avatar's user
        */
        router.route('/:id/avatar').post([authMiddleware, upload.single('avatar')], controller.uploadAvatar);

        /**
         * @swagger
         * /api/users/{id}:
         *   get:
         *     tags:
         *      - User
         *     summary: Retrieve user by ID
         *     parameters:
         *      - name: id
         *        in: path
         *        required: true
         *        schema: 
         *          type: string
         *     responses:
         *      200:
         *          description: Retrieve user  
         */
        router.route('/:id').get(authMiddleware, controller.findById);

        /**
         * @swagger
         * /api/users:
         *   get:
         *     tags:
         *      - User
         *     summary: Retrieve a list of users
         *     responses:
         *      200:
         *          description: Retrieve list of users
        */
        router.route('/').get(authMiddleware, controller.findAll);
        router.route('/avatars/:fileName').get([authMiddleware], controller.avatar);

        return router;
    }
}