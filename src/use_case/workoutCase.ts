import Workout from "../model/workout";
import WorkoutRepository from "../repository/workout/workoutRepository";
import { WorkoutBody } from "../shared/types/workout.interface";

export default class WorkoutCase
{
    constructor(
        private repository = new WorkoutRepository()
    ) {}

    public async add(workout: WorkoutBody) {
        const isFieldsMissing = (
            !workout.name ||
            !workout.time ||
            !workout.user_id
        );

        if(isFieldsMissing) throw new Error('At least one field is missing');

        const newWorkout = new Workout(
            null,
            workout.name,
            workout.time,
            workout.user_id
        );

        return await this.repository.add(newWorkout)
            .then(workoutPacket => {
                return {
                    id: parseInt(workoutPacket.insertId),
                    name: newWorkout.getName(),
                    time: newWorkout.getTime(),
                    user: newWorkout.getUser()
                }
            });
    }
}