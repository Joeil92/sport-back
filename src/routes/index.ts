import { Express } from "express";
import UserRouter from "./userRouter";
import AuthRouter from "./authRouter";
import WorkoutRouter from "./workoutRouter";

export default function routes(app: Express) {
    app.use('/auth', new AuthRouter().routes());
    app.use('/api/users', new UserRouter().routes());
    app.use('/api/workouts', new WorkoutRouter().routes());
}