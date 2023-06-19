import { CreateReservationHandler } from './create-reservation/create-reservation.handler';
import { DeleteReservationHandler } from './delete-reservation/delete-reservation.handler';
import { UpdateReservationHandler } from './update-reservation/update-reservation.handler';

export const CommandHandlers = [
  CreateReservationHandler,
  UpdateReservationHandler,
  DeleteReservationHandler,
];
