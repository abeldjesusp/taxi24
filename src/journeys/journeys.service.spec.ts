import { Test, TestingModule } from '@nestjs/testing';
import { JourneysService } from './journeys.service';
import { InvoicesService } from '../invoices/invoices.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';
import { JourneyRequestDto } from './dto/journey-request.dto';

describe('JourneysService', () => {
  let service: JourneysService;
  let prisma: PrismaService;
  let invoicesService: InvoicesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JourneysService,
        {
          provide: InvoicesService,
          useValue: {
            createInvoice: jest.fn().mockResolvedValue({ id: 1, journeyId: 1, amount: 20 }),
          },
        },
        {
          provide: PrismaService,
          useValue: {
            journey: {
              findMany: jest.fn(),
              create: jest.fn(),
              update: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<JourneysService>(JourneysService);
    prisma = module.get<PrismaService>(PrismaService);
    invoicesService = module.get<InvoicesService>(InvoicesService);
  });

  describe('getJourneysActive', () => {
    it('should return all active journeys', async () => {
      const journeys = [{ id: 1, status: 'active' }];
      (prisma.journey.findMany as jest.Mock).mockResolvedValue(journeys);
      const result = await service.getJourneysActive();
      expect(result).toEqual(journeys);
    });

    it('should return NotFoundException if no active journeys found', async () => {
      (prisma.journey.findMany as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getJourneysActive();
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('requestJourney', () => {
    it('should create and return a new journey', async () => {
      const dto: JourneyRequestDto = {
        status: 'active',
        driverId: 1,
        riderId: 2,
        pickupLocationLat: 10.0,
        pickupLocationLng: -84.0,
        dropoffLocationLat: 11.0,
        dropoffLocationLng: -85.0,
      };
      const createdJourney = { id: 2, ...dto };
      (prisma.journey.create as jest.Mock).mockResolvedValue(createdJourney);

      const result = await service.requestJourney(dto);
      expect(result).toEqual({ message: 'Journey requested successfully', journey: createdJourney });
      expect(prisma.journey.create).toHaveBeenCalledWith({
        data: {
          ...dto,
          status: 'active',
        },
      });
    });
  });

  describe('completeJourney', () => {
    it('should complete a journey and create an invoice', async () => {
      const journey = { id: 3, status: 'active' };
      (prisma.journey.update as jest.Mock).mockResolvedValue(journey);

      const result = await service.completeJourney(3);

      expect(prisma.journey.update).toHaveBeenCalledWith({
        where: { id: 3 },
        data: { status: 'completed' },
      });
      expect(invoicesService.createInvoice).toHaveBeenCalledWith({
        journeyId: journey.id,
        amount: 20.00,
      });
      expect(result).toEqual({ message: 'Journey completed successfully', journey });
    });

    it('should return NotFoundException if journey not found', async () => {
      (prisma.journey.update as jest.Mock).mockResolvedValue(undefined);

      const result = await service.completeJourney(99);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });
});