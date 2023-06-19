import { Module } from '@nestjs/common';
import { QueryHandlers } from './queries';
import { CqrsModule } from '@nestjs/cqrs';
import { ReservationController } from './reservation.controller';
import { CommandHandlers } from './shared/commands';
import { IdGenerator } from '@vendit-dev/interface';
import { UuidGenerator } from '@vendit-dev/libs';
import { ReservationRepositoryMemoryAdapter } from './repository/memory/reservation-repository-memory.adapter';
import { ReservationRepository } from './repository/reservation-repository';

@Module({
  imports: [CqrsModule],
  controllers: [ReservationController],
  providers: [
    {
      provide: IdGenerator,
      useClass: UuidGenerator,
    },
    {
      provide: ReservationRepository,
      useClass: ReservationRepositoryMemoryAdapter,
    },
    ...CommandHandlers,
    ...QueryHandlers,
  ],
})
export class BooksModule {}
