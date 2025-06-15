import { Module } from '@nestjs/common';
import { DriversModule } from './drivers/drivers.module';
import { RidersModule } from './riders/riders.module';
import { InvoicesModule } from './invoices/invoices.module';
import { JourneysModule } from './journeys/journeys.module';

@Module({
  imports: [DriversModule, RidersModule, InvoicesModule, JourneysModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
