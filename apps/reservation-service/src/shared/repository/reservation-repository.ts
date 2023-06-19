import { CreateReservationDto } from '../dto/create-reservation.dto';
import { UpdateReservationDto } from '../dto/update-reservation.dto';
import { Reservation } from '../entities/reservation.entity';

export abstract class ReservationRepository {
  abstract findOneById(id: string): Promise<Reservation>;
  abstract findAll(): Promise<Reservation[]>;

  abstract create(id: string, payload: CreateReservationDto): Promise<void>;
  abstract delete(id: string): Promise<void>;
  abstract update(id: string, payload: UpdateReservationDto): Promise<void>;
}
