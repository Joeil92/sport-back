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

    public async flush(entity: string, repository: Repository, datas: Data) {
        datas.forEach(async data => {
            await repository.add(data as any)
        });

        console.log(`${entity} Fixture added...`);
    }
}