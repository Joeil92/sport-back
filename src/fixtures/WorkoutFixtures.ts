import Workout from "@FitTrackr/models/workout";
import WorkoutRepository from "@FitTrackr/repositories/workout/workoutRepository";
import { nbUser } from "./UserFixtures";
import Fixture from "./fixture"
import { EntityFixture } from "./types/EntityFixture.interface";

export const nbWorkout = 150;

export default class WorkoutFixtures extends Fixture implements EntityFixture
{
    constructor(
        private repository = new WorkoutRepository()
    ) { super() }

    public async flush(workouts: Workout[]) {
        for(const workout of workouts) {
            try {
                await this.repository.add(workout);
            } catch (error) {
                throw new Error('error: ' + error);
            }
        }

        this.endMessage('Workout');
    }

    public load() {
        const faker = this.getFaker();

        const workouts = faker.helpers.multiple(() => this.newWorkout(), { count: nbWorkout });

        return this.flush(workouts);
    }

    private newWorkout(): Workout {
        const faker = this.getFaker();

        const workout = new Workout(
            null,
            faker.lorem.words({ min: 2, max: 6 }),
            faker.number.int({ min: 1, max: nbUser })
        );

        return workout;
    }
}