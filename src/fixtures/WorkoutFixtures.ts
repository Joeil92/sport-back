import Workout from "@FitTrackr/models/workout";
import WorkoutRepository from "@FitTrackr/repositories/workout/workoutRepository";
import { nbUser } from "./UserFixtures";
import Fixture from "./fixture"

export const nbWorkout = 150;

export default class WorkoutFixtures extends Fixture
{
    constructor(
        private repository = new WorkoutRepository()
    ) { super() }

    public async load() {
        const faker = this.getFaker();

        const workouts = faker.helpers.multiple(() => this.newWorkout(), { count: nbWorkout });

        return this.flush("Workout", this.repository, workouts);
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