import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { JourneysService } from './journeys.service';
import { JourneyRequestDto } from './dto/journey-request.dto';
import { ApiBody, ApiOperation } from '@nestjs/swagger';

@Controller('journeys')
export class JourneysController {
    private readonly journeysService: JourneysService;
    constructor(journeysService: JourneysService) { 
        this.journeysService = journeysService;
    }
    @Get('active')
    @ApiOperation({
        summary: 'Get active journeys',
        description: 'Retrieves a list of all active journeys in the system.'
    })
    async getJourneysActive() { 
        return this.journeysService.getJourneysActive();
    }
    @Post('request')
    @ApiOperation({
        summary: 'Request a journey',
        description: 'Creates a new journey request with the provided details.'
    })
    @ApiBody({
        type: JourneyRequestDto,
        description: 'Details of the journey request to be created.'
    })
    async requestJourney(@Body() journeyRequest: JourneyRequestDto) {
        return this.journeysService.requestJourney(journeyRequest);
    }
    @Patch(":id/complete")
    @ApiOperation({
        summary: 'Complete a journey',
        description: 'Marks a journey as completed by its unique ID.'
    })
    async completeJourney(@Param('id') id: string) {
        const journeyId = parseInt(id);
        return this.journeysService.completeJourney(journeyId);
    }
}
