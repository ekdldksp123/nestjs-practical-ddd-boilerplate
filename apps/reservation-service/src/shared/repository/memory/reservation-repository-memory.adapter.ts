import { CreateReservationDto } from '../../dto/create-reservation.dto';
import { UpdateReservationDto } from '../../dto/update-reservation.dto';
import { Reservation } from '../../entities/reservation.entity';
import { ReservationRepository } from '../reservation-repository';

export class ReservationRepositoryMemoryAdapter extends ReservationRepository {
  private reservations; //주입 필요

  async findOneById(id: string): Promise<Reservation> {
    return this.reservations.find((book) => book.id === id);
  }

  async findAll(): Promise<Reservation[]> {
    return this.reservations;
  }

  async create(id: string, payload: CreateReservationDto): Promise<void> {
    const { type } = payload;
    const newBook = new Reservation(type);
    this.reservations.push(newBook);
  }

  async delete(id: string): Promise<void> {
    this.reservations = this.reservations.filter((book) => id !== book.id);
  }

  async update(id: string, payload: UpdateReservationDto): Promise<void> {
    const { type } = payload;
    const newBook = new Reservation(type);
    this.reservations = this.reservations.filter((book) => id !== book.id);
    this.reservations.push(newBook);
  }
}
