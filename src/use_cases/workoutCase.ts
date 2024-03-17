import Workout from "../models/workout";
import WorkoutRepository from "../repositories/workout/workoutRepository";
import { WorkoutBody } from "../shared/types/workout.interface";

export default class WorkoutCase
{
    constructor(
        private repository = new WorkoutRepository()
    ) {}

    public async add(workout: WorkoutBody) {
        const isFieldsMissing = (
            !workout.name ||
            !workout.user_id
        );

        if(isFieldsMissing) throw new Error('At least one field is missing');

        const newWorkout = new Workout(
            null,
            workout.name,
            workout.user_id
        );

        return await this.repository.add(newWorkout)
            .then(workoutPacket => {
                return {
                    id: parseInt(workoutPacket.insertId),
                    name: newWorkout.getName(),
                    user: newWorkout.getUser()
                }
            });
    }
}