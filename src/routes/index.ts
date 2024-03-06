import { Express } from "express";
import userRouter from "./userRouter";

export default function routes(app: Express) {
    app.use('/api/users', new userRouter().routes());
}