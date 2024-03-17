export default class Workout
{
    constructor(
        private id: number | null,
        private name: string,
        private time: string,
        private user: number
    ) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getTime() {
        return this.time;
    }

    public getUser() {
        return this.user;
    }
}