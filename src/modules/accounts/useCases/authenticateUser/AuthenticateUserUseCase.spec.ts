import { ICreateUserDTO } from '@modules/accounts/dtos/ICreateUserDTO';
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository';
import { UsersTokensRepositoryInMemory } from '@modules/accounts/repositories/in-memory/UsersTokensRepositoryInMemory';
import { DayjsDateProvider } from '@shared/container/providers/DateProvider/implementations/DayjsDateProvider';
import { AppError } from '@shared/errors/AppError';

import { CreateUserUseCase } from '../createUser/CreateUserUseCase';
import { AuthenticateUserUseCase } from './AuthenticateUserUseCase';

let authenticateUserUseCase: AuthenticateUserUseCase;
let inMemoryUsersRepository: InMemoryUsersRepository;
let createUserUseCase: CreateUserUseCase;
let userTokensRepositoryInMemory: UsersTokensRepositoryInMemory;
let dateProvider: DayjsDateProvider;

describe('Authenticate User', () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    userTokensRepositoryInMemory = new UsersTokensRepositoryInMemory();
    dateProvider = new DayjsDateProvider();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      userTokensRepositoryInMemory,
      dateProvider,
    );
    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
  });

  it('Should be able to authenticate a user', async () => {
    const userData: ICreateUserDTO = {
      name: 'user',
      email: 'user@test.com',
      password: '1234',
      driver_license: '1234',
    };

    await createUserUseCase.execute(userData);

    const result = await authenticateUserUseCase.execute({
      email: userData.email,
      password: userData.password,
    });

    expect(result).toHaveProperty('token');
    expect(result).toHaveProperty('user');
    expect(result.user).toHaveProperty('name');
    expect(result.user).toHaveProperty('email');
  });

  it('Should not be able to authenticate an nonexistent user', async () => {
    expect(async () => {
      await authenticateUserUseCase.execute({
        email: 'false@email.com',
        password: '1234',
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it('Should not be able to authenticate with incorrect password', async () => {
    expect(async () => {
      const userData: ICreateUserDTO = {
        name: 'user',
        email: 'user@test.com',
        password: '1234',
        driver_license: '1234',
      };

      await createUserUseCase.execute(userData);

      await authenticateUserUseCase.execute({
        email: userData.email,
        password: 'incorrect-password',
      });
    }).rejects.toBeInstanceOf(AppError);
  });
  it('Should not be able to authenticate with incorrect email', async () => {
    expect(async () => {
      const userData: ICreateUserDTO = {
        name: 'user',
        email: 'user@test.com',
        password: '1234',
        driver_license: '1234',
      };

      await createUserUseCase.execute(userData);

      await authenticateUserUseCase.execute({
        email: 'incorrect-email',
        password: userData.password,
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});
