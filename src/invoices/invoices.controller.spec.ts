import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesController } from './invoices.controller';
import { InvoicesService } from './invoices.service';

describe('InvoicesController', () => {
  let controller: InvoicesController;
  let service: InvoicesService;

  beforeEach(async () => {
    const mockInvoicesService = {
      getAllInvoices: jest.fn().mockResolvedValue([{ id: 1, amount: 100 }]),
      getInvoiceByJourneyId: jest.fn().mockResolvedValue({ id: 2, journeyId: 5, amount: 200 }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [InvoicesController],
      providers: [
        { provide: InvoicesService, useValue: mockInvoicesService },
      ],
    }).compile();

    controller = module.get<InvoicesController>(InvoicesController);
    service = module.get<InvoicesService>(InvoicesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return all invoices', async () => {
    const result = await controller.getAllInvoices();
    expect(result).toEqual([{ id: 1, amount: 100 }]);
    expect(service.getAllInvoices).toHaveBeenCalled();
  });

  it('should return invoice by journey id', async () => {
    const result = await controller.getInvoiceByJourneyId('5');
    expect(result).toEqual({ id: 2, journeyId: 5, amount: 200 });
    expect(service.getInvoiceByJourneyId).toHaveBeenCalledWith(5);
  });
});