import { AppError } from '../errors/AppError';

import { ICategoriesRepository } from '../repositories/ICategoriesRepository';

interface IRequest {
  name: string;
  description: string;
}

class CreateCategoryService {
  constructor(private categoriesRepository: ICategoriesRepository) {}

  execute({ name, description }: IRequest) {
    const categoryAlreadyExists = this.categoriesRepository.findByName(name);

    if (categoryAlreadyExists) {
      throw new AppError('Category already exists!');
    }

    const category = this.categoriesRepository.create({ name, description });
    return category;
  }
}

export { CreateCategoryService };
