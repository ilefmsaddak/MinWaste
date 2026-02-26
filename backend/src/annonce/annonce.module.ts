import { Module } from '@nestjs/common';
import { AnnonceService } from './annonce.service';
import { AnnonceResolver } from './annonce.resolver';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [AnnonceResolver, AnnonceService],
})
export class AnnonceModule {}
