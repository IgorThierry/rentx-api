import { Repository } from 'typeorm';

import { ICreateCategoryDTO } from '@modules/cars/dtos/ICreateCategoryDTO';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import dataSource from '@shared/infra/typeorm';

import { Category } from '../entities/Category';

class CategoriesRepository implements ICategoriesRepository {
  private repository: Repository<Category>;

  constructor() {
    this.repository = dataSource.getRepository(Category);
  }

  async create({ name, description }: ICreateCategoryDTO): Promise<Category> {
    const category = this.repository.create({ name, description });

    await this.repository.save(category);

    return category;
  }

  async list(): Promise<Category[]> {
    const categories = await this.repository.find();
    return categories;
  }

  async findByName(name: string) {
    const category = await this.repository.findOneBy({ name });
    return category;
  }
}

export { CategoriesRepository };
