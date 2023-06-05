import { Test, TestingModule } from '@nestjs/testing';
import { UserControllersController } from './user-controllers.controller';

describe('UserControllersController', () => {
  let controller: UserControllersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserControllersController],
    }).compile();

    controller = module.get<UserControllersController>(
      UserControllersController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
