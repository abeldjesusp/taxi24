import { Controller, Get, Param } from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('invoices')
export class InvoicesController {
    constructor(private invoicesService: InvoicesService) {}
    
    @Get()
    @ApiOperation({
        summary: 'Get all invoices',
        description: 'Retrieves a list of all invoices in the system.'
    })
    async getAllInvoices() {
        return this.invoicesService.getAllInvoices();
    }
    @Get('journey/:id')
    @ApiOperation({
        summary: 'Get invoice by journey ID',
        description: 'Retrieves a specific invoice associated with a journey by its unique ID.'
    })
    async getInvoiceByJourneyId(@Param('id') id: string) {
        const JourneyId = parseInt(id);
        return this.invoicesService.getInvoiceByJourneyId(JourneyId);
    }
}
