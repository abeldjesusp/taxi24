import { Test, TestingModule } from '@nestjs/testing';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { JourneyRequestDto } from './dto/journey-request.dto';

describe('JourneysController', () => {
  let controller: JourneysController;
  let service: JourneysService;

  beforeEach(async () => {
    const mockJourneysService = {
      getJourneysActive: jest.fn().mockResolvedValue([{ id: 1, status: 'active' }]),
      requestJourney: jest.fn().mockResolvedValue({ id: 2, status: 'requested' }),
      completeJourney: jest.fn().mockResolvedValue({ id: 3, status: 'completed' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [JourneysController],
      providers: [
        { provide: JourneysService, useValue: mockJourneysService },
      ],
    }).compile();

    controller = module.get<JourneysController>(JourneysController);
    service = module.get<JourneysService>(JourneysService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all active journeys', async () => {
    const result = await controller.getJourneysActive();
    expect(result).toEqual([{ id: 1, status: 'active' }]);
    expect(service.getJourneysActive).toHaveBeenCalled();
  });

  it('should request a journey', async () => {
    const dto: JourneyRequestDto = {
      status: "active",
      driverId: 1,
      riderId: 2,
      pickupLocationLat: 10.0,
      pickupLocationLng: -84.0,
      dropoffLocationLat: 11.0,
      dropoffLocationLng: -85.0,
    };
    const result = await controller.requestJourney(dto);
    expect(result).toEqual({ id: 2, status: 'requested' });
    expect(service.requestJourney).toHaveBeenCalledWith(dto);
  });

  it('should complete a journey', async () => {
    const result = await controller.completeJourney('3');
    expect(result).toEqual({ id: 3, status: 'completed' });
    expect(service.completeJourney).toHaveBeenCalledWith(3);
  });
});