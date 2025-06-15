import { Controller, Get, Param, Query } from '@nestjs/common';
import { RidersService } from './riders.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('riders')
export class RidersController {
    ridersService: RidersService
    constructor(ridersService: RidersService) {
        this.ridersService = ridersService;
    }
    @Get()
    @ApiOperation({
        summary: 'Get all riders',
        description: 'Retrieves a list of all riders in the system.'
    })
    async getRiders() {
        return this.ridersService.getRiders();
    }
    @Get('nearby-drivers')
    @ApiOperation({
        summary: 'Get nearby drivers',
        description: 'Retrieves a list of drivers who are nearby based on the provided latitude and longitude.'
    })
    async getNearbyDrivers(@Query('lat') lat: string, @Query('lng') lng: string) {
        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);
        return this.ridersService.getNearbyDrivers(userLat, userLng);
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Get rider by ID',
        description: 'Retrieves a specific rider by their unique ID.'
    })
    async getRiderById(@Param('id') id: string) {
        const riderId = parseInt(id);
        return this.ridersService.getRiderById(riderId);
    }
}
