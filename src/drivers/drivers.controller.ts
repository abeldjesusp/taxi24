import { Controller, Get, Param, Query } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('drivers')
export class DriversController {
    driversService: DriversService;
    constructor(driversService: DriversService) {
        this.driversService = driversService;
    }

    @Get()
    @ApiOperation({
        summary: 'Get all drivers',
        description: 'Retrieves a list of all drivers in the system.'
    })
    async getDrivers() {
        return this.driversService.getDrivers();
    }
    @Get('available')
    @ApiOperation({
        summary: 'Get available drivers',
        description: 'Retrieves a list of all drivers who are currently available.'
    })
    async getAvailableDrivers() {
        return this.driversService.getAvailableDrivers();
    }
    @Get('nearby')
    @ApiOperation({
        summary: 'Get nearby drivers',
        description: 'Retrieves a list of drivers who are nearby based on the provided latitude and longitude.'
    })
    async getNearbyDrivers(@Query('lat') lat: string, @Query('lng') lng: string) {
        const userLat = parseFloat(lat);
        const userLng = parseFloat(lng);

        return this.driversService.getNearbyDrivers(userLat, userLng);
    }
    @Get(':id')
    @ApiOperation({
        summary: 'Get driver by ID',
        description: 'Retrieves a specific driver by their unique ID.'
    })
    async getDriverById(@Param('id') id: string) {
        const idNumber = parseInt(id);
        return this.driversService.getDriverById(idNumber);
    }
}
