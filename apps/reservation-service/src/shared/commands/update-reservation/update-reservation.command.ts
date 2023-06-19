import { UpdateReservationDto } from '../../dto/update-reservation.dto';

export class UpdateReservationCommand {
  constructor(public id: string, public payload: UpdateReservationDto) {}
}
