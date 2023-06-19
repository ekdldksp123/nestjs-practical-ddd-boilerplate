import { ListReservationQuery } from './list-reservation.query';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Reservation } from '../../entities/reservation.entity';
import { ReservationRepository } from '../../repository/reservation-repository';

@QueryHandler(ListReservationQuery)
export class ListBooksHandler implements IQueryHandler<ListReservationQuery> {
  constructor(private bookRepository: ReservationRepository) {}

  async execute(): Promise<Reservation[]> {
    return this.bookRepository.findAll();
  }
}
