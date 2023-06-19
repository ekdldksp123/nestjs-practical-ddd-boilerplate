import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DeleteReservationCommand } from './delete-reservation.command';
import { ReservationRepository } from '../../repository/reservation-repository';

@CommandHandler(DeleteReservationCommand)
export class DeleteReservationHandler
  implements ICommandHandler<DeleteReservationCommand>
{
  constructor(private bookRepository: ReservationRepository) {}

  async execute(command: DeleteReservationCommand): Promise<void> {
    this.bookRepository.delete(command.id);
  }
}
