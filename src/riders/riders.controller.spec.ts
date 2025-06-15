import { Test, TestingModule } from '@nestjs/testing';
import { RidersController } from './riders.controller';
import { RidersService } from './riders.service';

describe('RidersController', () => {
  let controller: RidersController;
  let service: RidersService;

  beforeEach(async () => {
    const mockRidersService = {
      getRiders: jest.fn().mockResolvedValue([{ id: 1, name: 'Carlos' }]),
      getNearbyDrivers: jest.fn().mockResolvedValue([{ id: 2, name: 'Ana' }]),
      getRiderById: jest.fn().mockResolvedValue({ id: 3, name: 'Luis' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [RidersController],
      providers: [
        { provide: RidersService, useValue: mockRidersService },
      ],
    }).compile();

    controller = module.get<RidersController>(RidersController);
    service = module.get<RidersService>(RidersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all riders', async () => {
    const result = await controller.getRiders();
    expect(result).toEqual([{ id: 1, name: 'Carlos' }]);
    expect(service.getRiders).toHaveBeenCalled();
  });

  it('should return nearby drivers', async () => {
    const result = await controller.getNearbyDrivers('10.0', '-84.0');
    expect(result).toEqual([{ id: 2, name: 'Ana' }]);
    expect(service.getNearbyDrivers).toHaveBeenCalledWith(10.0, -84.0);
  });

  it('should return a rider by id', async () => {
    const result = await controller.getRiderById('3');
    expect(result).toEqual({ id: 3, name: 'Luis' });
    expect(service.getRiderById).toHaveBeenCalledWith(3);
  });
});