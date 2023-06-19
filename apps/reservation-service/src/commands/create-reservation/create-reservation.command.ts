import { CreateReservationDto } from '../../dto/create-reservation.dto';

export class CreateReservationCommand {
  constructor(public payload: CreateReservationDto) {}
}
