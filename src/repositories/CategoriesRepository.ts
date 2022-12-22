import { Category } from '../model/Category';
import {
  ICategoriesRepository,
  ICreateCategoryDTO,
} from './ICategoriesRepository';

class CategoriesRepository implements ICategoriesRepository {
  private categories: Category[];

  constructor() {
    this.categories = [];
  }

  create({ name, description }: ICreateCategoryDTO) {
    const category = new Category();

    Object.assign(category, { name, description, created_at: new Date() });

    this.categories.push(category);

    return category;
  }

  list() {
    return this.categories;
  }

  findByName(name: string) {
    const category = this.categories.find(c => c.name === name);
    return category;
  }
}

export { CategoriesRepository, ICreateCategoryDTO };
