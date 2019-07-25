import { Test, TestingModule } from '@nestjs/testing';
import { RelaysController } from './relays.controller';

describe('Relays Controller', () => {
  let controller: RelaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RelaysController],
    }).compile();

    controller = module.get<RelaysController>(RelaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
