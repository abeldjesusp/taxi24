import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class RidersService {
    
    constructor(private prisma: PrismaService) {}

    /**
     * Retrieves all riders from the database.
     * @returns {Promise<Rider[]>} A promise that resolves to an array of riders.
     * @throws {NotFoundException} If no riders are found.
     */
    async getRiders() {
        return await this.prisma.rider.findMany() || new NotFoundException('No riders found');
    }

    /**
     * Retrieves a rider by their ID.
     * @param {number} id - The ID of the rider to retrieve.
     * @returns {Promise<Rider>} A promise that resolves to the rider object.
     * @throws {NotFoundException} If the rider is not found.
     */
    async getRiderById(id: number) {
        return await this.prisma.rider.findUnique({ where: { id }}) || new NotFoundException('Rider not found');
    }

    /**
     * Retrieves nearby drivers based on latitude and longitude.
     * @param {number} lat - The latitude of the user's location.
     * @param {number} lng - The longitude of the user's location.
     * @param {number} radius - The radius in kilometers to search for drivers (default is 3 km).
     * @returns {Promise<Driver[]>} A promise that resolves to an array of nearby drivers.
     * @throws {NotFoundException} If no nearby drivers are found.
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
            return new NotFoundException('No nearby drivers found');
        }

        return result;
    }
}
