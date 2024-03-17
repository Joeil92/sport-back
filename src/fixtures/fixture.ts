import { Faker, fr } from '@faker-js/faker';
import { Repository } from './types/repository.type';
import { Data } from './types/data.type';

export default class Fixture
{
    constructor(
        private faker = new Faker({ locale: [fr] })
    ) {}

    public getFaker() {
        return this.faker;
    }

    public flush(repository: Repository, datas: Data) {
        for(const data of datas) {
            repository.add(data as any);
        }
    }
}