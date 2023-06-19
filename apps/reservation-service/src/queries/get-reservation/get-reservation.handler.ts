import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { Reservation } from '../../entities/reservation.entity';
import { GetReservationQuery } from './get-reservation.query';
import { ReservationRepository } from '../../repository/reservation-repository';

@QueryHandler(GetReservationQuery)
export class GetBookHandler implements IQueryHandler<GetReservationQuery> {
  constructor(private bookRepository: ReservationRepository) {}

  async execute(query: GetReservationQuery): Promise<Reservation> {
    return this.bookRepository.findOneById(query.id);
  }
}
