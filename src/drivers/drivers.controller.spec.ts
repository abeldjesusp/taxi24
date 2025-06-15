import { Test, TestingModule } from '@nestjs/testing';
import { DriversController } from './drivers.controller';
import { DriversService } from './drivers.service';

describe('DriversController', () => {
  let controller: DriversController;
  let service: DriversService;

  beforeEach(async () => {
    const mockDriversService = {
      getDrivers: jest.fn().mockResolvedValue([{ id: 1, name: 'Juan' }]),
      getAvailableDrivers: jest.fn().mockResolvedValue([{ id: 2, name: 'Pedro' }]),
      getNearbyDrivers: jest.fn().mockResolvedValue([{ id: 3, name: 'Luis' }]),
      getDriverById: jest.fn().mockResolvedValue({ id: 4, name: 'Ana' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [DriversController],
      providers: [
        { provide: DriversService, useValue: mockDriversService },
      ],
    }).compile();

    controller = module.get<DriversController>(DriversController);
    service = module.get<DriversService>(DriversService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all drivers', async () => {
    const result = await controller.getDrivers();
    expect(result).toEqual([{ id: 1, name: 'Juan' }]);
    expect(service.getDrivers).toHaveBeenCalled();
  });

  it('should return available drivers', async () => {
    const result = await controller.getAvailableDrivers();
    expect(result).toEqual([{ id: 2, name: 'Pedro' }]);
    expect(service.getAvailableDrivers).toHaveBeenCalled();
  });

  it('should return nearby drivers', async () => {
    const result = await controller.getNearbyDrivers('10.0', '-84.0');
    expect(result).toEqual([{ id: 3, name: 'Luis' }]);
    expect(service.getNearbyDrivers).toHaveBeenCalledWith(10.0, -84.0);
  });

  it('should return a driver by id', async () => {
    const result = await controller.getDriverById('4');
    expect(result).toEqual({ id: 4, name: 'Ana' });
    expect(service.getDriverById).toHaveBeenCalledWith(4);
  });
});