import { Test, TestingModule } from '@nestjs/testing';
import { RelaysService } from './relays.service';

describe('RelaysService', () => {
  let service: RelaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RelaysService],
    }).compile();

    service = module.get<RelaysService>(RelaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
