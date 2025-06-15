import { Module } from '@nestjs/common';
import { JourneysController } from './journeys.controller';
import { JourneysService } from './journeys.service';
import { InvoicesModule } from '../invoices/invoices.module';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [
    InvoicesModule
  ],
  controllers: [JourneysController],
  providers: [JourneysService, PrismaService]
})
export class JourneysModule {}
