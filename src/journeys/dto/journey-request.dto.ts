import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class JourneyRequestDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the driver assigned to the journey', example: 1 })
  driverId: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({ description: 'ID of the rider requesting the journey', example: 1 })
  riderId: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Latitude of the pickup location', example: 37.7749 })
  pickupLocationLat: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Longitude of the pickup location', example: -122.4194 })
  pickupLocationLng: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Latitude of the dropoff location', example: 37.7749 })
  dropoffLocationLat: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ description: 'Longitude of the dropoff location', example: -122.4194 })
  dropoffLocationLng: number;

  status: 'active' | 'completed';
  createdAt?: Date;
  updatedAt?: Date;
}