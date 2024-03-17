import UserFixtures from "./UserFixtures";
import WorkoutFixtures from "./WorkoutFixtures";

function exitProcess(exitCode: number): void {
    console.log('Data fixtures added successfully! You can leave script with CTRL + C');
    // process.exit(exitCode);
}

async function fixtures() {
    await new UserFixtures().load();
    await new WorkoutFixtures().load();

    exitProcess(0);
}

fixtures();