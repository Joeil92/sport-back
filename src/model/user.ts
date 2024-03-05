export default class User
{
    constructor(
        private id: number | null,
        private email: string,
        private password: string,
        private firstname: string,
        private lastname: string,
        private phone: string,
        private weigth: number,
        private size: number,
        private imageUrl: string | null,
        private roles: string[]
    ) {}

    public getId() {
        return this.id;
    }

    public getEmail() {
        return this.email;
    }

    public getPassword() {
        return this.password;
    }

    public getFirstname() {
        return this.firstname;
    }

    public getLastname() {
        return this.lastname;
    }

    public getPhone() {
        return this.phone;
    }

    public getWeigth() {
        return this.weigth;
    }

    public getSize() {
        return this.size;
    }

    public getImageUrl() {
        return this.imageUrl;
    }

    public getRoles() {
        return this.roles;
    }
}