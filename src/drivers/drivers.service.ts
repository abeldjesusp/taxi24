import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class DriversService {
    constructor(private prisma: PrismaService) {}

    /**
     * Retrieves all drivers from the database.
     * @returns A promise that resolves to an array of drivers or throws a NotFoundException if no drivers are found.
     */
    async getDrivers() {
        return await this.prisma.driver.findMany() || new NotFoundException('No drivers found');
    }

    /**
     * Retrieves all available drivers from the database.
     * @returns A promise that resolves to an array of available drivers or throws a NotFoundException if no available drivers are found.
     */
    async getAvailableDrivers() {
        const availableDrivers = await this.prisma.driver.findMany({
            where: {
                isAvailable: true,
            },
        });
        if (availableDrivers.length === 0) {
            return new NotFoundException('No available drivers found'); // No hay conductores disponibles 
        }
        return availableDrivers;
    }

    /**
     * Retrieves nearby drivers based on latitude and longitude.
     * @param lat - Latitude of the user's location.
     * @param lng - Longitude of the user's location.
     * @param radius - Radius in kilometers to search for nearby drivers (default is 3 km).
     * @returns A promise that resolves to an array of nearby drivers or throws a NotFoundException if no nearby drivers are found.
     */
    async getNearbyDrivers(lat: number, lng: number, radius: number = 3) {
        const result =  await this.prisma.driver.findMany({
            where: {
                isAvailable: true,
                latitude: {
                    gte: lat - radius / 111, // Aproximación de grados por km
                    lte: lat + radius / 111, // Aproximación de grados por km
                },
                longitude: {
                    gte: lng - radius / (111 * Math.cos((lat * Math.PI) / 180)), // Ajuste por latitud
                    lte: lng + radius / (111 * Math.cos((lat * Math.PI) / 180)), // Ajuste por latitud  
                }
            },
        });
        if (!result || result.length === 0) {
            return new NotFoundException('No nearby drivers found'); // No hay conductores disponibles en el radio especificado
        }

        return result;
    }
     
    /**
     * Retrieves a driver by their ID.
     * @param id - The ID of the driver to retrieve.
     * @returns A promise that resolves to the driver object or throws a NotFoundException if the driver is not found.
     */
    async getDriverById(id: number) {
        return await this.prisma.driver.findUnique({ where: { id } }) || 
            new NotFoundException('Driver not found');
    }
}
