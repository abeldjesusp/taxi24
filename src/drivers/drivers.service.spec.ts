import { Test, TestingModule } from '@nestjs/testing';
import { DriversService } from './drivers.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('DriversService', () => {
  let service: DriversService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DriversService,
        {
          provide: PrismaService,
          useValue: {
            driver: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<DriversService>(DriversService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getDrivers', () => {
    it('should return all drivers', async () => {
      const drivers = [{ id: 1, name: 'Juan' }];
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(drivers);
      const result = await service.getDrivers();
      expect(result).toEqual(drivers);
    });

    it('should return NotFoundException if no drivers found', async () => {
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getDrivers();
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('getAvailableDrivers', () => {
    it('should return available drivers', async () => {
      const availableDrivers = [{ id: 2, name: 'Pedro', isAvailable: true }];
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(availableDrivers);
      const result = await service.getAvailableDrivers();
      expect(result).toEqual(availableDrivers);
    });

    it('should return NotFoundException if no available drivers', async () => {
      (prisma.driver.findMany as jest.Mock).mockResolvedValue([]);
      const result = await service.getAvailableDrivers();
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('getNearbyDrivers', () => {
    it('should return nearby drivers', async () => {
      const nearbyDrivers = [{ id: 3, name: 'Luis', isAvailable: true }];
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(nearbyDrivers);
      const result = await service.getNearbyDrivers(10, -84);
      expect(result).toEqual(nearbyDrivers);
    });

    it('should return NotFoundException if no nearby drivers', async () => {
      (prisma.driver.findMany as jest.Mock).mockResolvedValue([]);
      const result = await service.getNearbyDrivers(10, -84);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('getDriverById', () => {
    it('should return a driver by id', async () => {
      const driver = { id: 4, name: 'Ana' };
      (prisma.driver.findUnique as jest.Mock).mockResolvedValue(driver);
      const result = await service.getDriverById(4);
      expect(result).toEqual(driver);
    });

    it('should return NotFoundException if driver not found', async () => {
      (prisma.driver.findUnique as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getDriverById(4);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });
});