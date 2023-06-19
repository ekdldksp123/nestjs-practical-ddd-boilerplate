import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateReservationCommand } from './create-reservation.command';
import { ReservationRepository } from '../../repository/reservation-repository';
import { IdGenerator } from '@vendit-dev/interface';

@CommandHandler(CreateReservationCommand)
export class CreateReservationHandler
  implements ICommandHandler<CreateReservationCommand>
{
  constructor(
    private idGenerator: IdGenerator,
    private repository: ReservationRepository,
  ) {}

  async execute(command: CreateReservationCommand): Promise<void> {
    const id = this.idGenerator.generateId();
    this.repository.create(id, command.payload);
  }
}
