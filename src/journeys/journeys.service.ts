import { Injectable, NotFoundException } from '@nestjs/common';
import { InvoicesService } from '../invoices/invoices.service';
import { JourneyRequestDto } from './dto/journey-request.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JourneysService {
    constructor(private invoicesService: InvoicesService, private prisma: PrismaService) {}

    async getJourneysActive() {
        return await this.prisma.journey.findMany({
            where: { status: 'active' },
        }) || new NotFoundException('No active journeys found');
    }

    async requestJourney(journeyRequest: JourneyRequestDto) {
        const newJourney = await this.prisma.journey.create({
            data: {
                ...journeyRequest,
                status: 'active',
            },
        });
        
        return { message: 'Journey requested successfully', journey: newJourney };
    }

    async completeJourney(id: number) {
        const journey = await this.prisma.journey.update({
            where: { id: id},
            data: { status: 'completed' },
        });

        if (!journey) {
            return new NotFoundException('Journey not found');
        }
        
        await this.invoicesService.createInvoice({
            journeyId: journey.id,
            amount: 20.00 // Example amount
        });
        return { message: 'Journey completed successfully', journey };
        
    }
}
