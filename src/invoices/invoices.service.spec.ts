import { Test, TestingModule } from '@nestjs/testing';
import { InvoicesService } from './invoices.service';
import { PrismaService } from '../prisma.service';
import { NotFoundException } from '@nestjs/common';

describe('InvoicesService', () => {
  let service: InvoicesService;
  let prisma: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        {
          provide: PrismaService,
          useValue: {
            invoice: {
              findMany: jest.fn(),
              findFirst: jest.fn(),
              create: jest.fn(),
            },
          },
        },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  describe('getAllInvoices', () => {
    it('should return all invoices', async () => {
      const invoices = [{ id: 1, amount: 100 }];
      (prisma.invoice.findMany as jest.Mock).mockResolvedValue(invoices);
      const result = await service.getAllInvoices();
      expect(result).toEqual(invoices);
    });

    it('should return NotFoundException if no invoices found', async () => {
      (prisma.invoice.findMany as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getAllInvoices();
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('getInvoiceByJourneyId', () => {
    it('should return invoice by journey id', async () => {
      const invoice = { id: 2, journeyId: 5, amount: 200 };
      (prisma.invoice.findFirst as jest.Mock).mockResolvedValue(invoice);
      const result = await service.getInvoiceByJourneyId(5);
      expect(result).toEqual(invoice);
    });

    it('should return NotFoundException if invoice not found', async () => {
      (prisma.invoice.findFirst as jest.Mock).mockResolvedValue(undefined);
      const result = await service.getInvoiceByJourneyId(5);
      expect(result).toBeInstanceOf(NotFoundException);
    });
  });

  describe('createInvoice', () => {
    it('should create and return the invoice', async () => {
      const dto = { journeyId: 10, amount: 300 };
      const createdInvoice = { id: 3, journeyId: 10, amount: 300 };
      (prisma.invoice.create as jest.Mock).mockResolvedValue(createdInvoice);
      const result = await service.createInvoice(dto);
      expect(result).toEqual(createdInvoice);
      expect(prisma.invoice.create).toHaveBeenCalledWith({
        data: {
          journeyId: dto.journeyId,
          amount: dto.amount,
        },
      });
    });
  });
});