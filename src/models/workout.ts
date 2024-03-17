export default class Workout
{
    constructor(
        private id: number | null,
        private name: string,
        private user: number
    ) {}

    public getId() {
        return this.id;
    }

    public getName() {
        return this.name;
    }

    public getUser() {
        return this.user;
    }
}