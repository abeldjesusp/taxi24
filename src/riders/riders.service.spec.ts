import { Test, TestingModule } from '@nestjs/testing';
import { RidersService } from './riders.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('RidersService', () => {
  let service: RidersService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RidersService,
        {
          provide: PrismaService,
          useValue: {
            rider: {
              findMany: jest.fn(),
              findUnique: jest.fn(),
            },
            driver: {
              findMany: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<RidersService>(RidersService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getRiders', () => {
    it('should return all riders', async () => {
      const riders = [{ id: 1, name: 'Carlos' }];
      (prisma.rider.findMany as jest.Mock).mockResolvedValue(riders);
      const result = await service.getRiders();
      expect(result).toEqual(riders);
    });

    it('should return NotFoundException if no riders found', async () => {
      (prisma.rider.findMany as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getRiders();
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('getRiderById', () => {
    it('should return a rider by id', async () => {
      const rider = { id: 2, name: 'Ana' };
      (prisma.rider.findUnique as jest.Mock).mockResolvedValue(rider);
      const result = await service.getRiderById(2);
      expect(result).toEqual(rider);
    });

    it('should return NotFoundException if rider not found', async () => {
      (prisma.rider.findUnique as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getRiderById(2);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('getNearbyDrivers', () => {
    it('should return nearby drivers', async () => {
      const drivers = [{ id: 3, name: 'Luis', isAvailable: true }];
      (prisma.driver.findMany as jest.Mock).mockResolvedValue(drivers);
      const result = await service.getNearbyDrivers(10, -84);
      expect(result).toEqual(drivers);
    });

    it('should return NotFoundException if no nearby drivers found', async () => {
      (prisma.driver.findMany as jest.Mock).mockResolvedValue([]);
      const result = await service.getNearbyDrivers(10, -84);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });
});