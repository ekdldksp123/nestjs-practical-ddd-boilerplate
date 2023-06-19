import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { UpdateReservationCommand } from './update-reservation.command';
import { ReservationRepository } from '../../repository/reservation-repository';

@CommandHandler(UpdateReservationCommand)
export class UpdateReservationHandler
  implements ICommandHandler<UpdateReservationCommand>
{
  constructor(private bookRepository: ReservationRepository) {}

  async execute(command: UpdateReservationCommand): Promise<void> {
    this.bookRepository.update(command.id, command.payload);
  }
}
