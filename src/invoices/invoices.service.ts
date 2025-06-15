import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateInvoiceDto } from './dto/create-invoice-dto';

@Injectable()
export class InvoicesService {
    constructor(private prisma: PrismaService) {}

    async getAllInvoices() {
        return await this.prisma.invoice.findMany() || new NotFoundException('No invoices found');
    }
    async getInvoiceByJourneyId(id: number) {
        return await this.prisma.invoice.findFirst({ where: { journeyId: id }}) || new NotFoundException('Invoice not found');
    }
    async createInvoice(invoice: CreateInvoiceDto) {
        const result = await this.prisma.invoice.create({
            data: {
                journeyId: invoice.journeyId,
                amount: invoice.amount,
            },
        });
        return result;
    }
}
