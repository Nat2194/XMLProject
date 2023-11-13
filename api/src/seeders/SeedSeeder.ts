import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import seedData from './seedData';

export class SeedSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    await seedData(em);
  }
}
