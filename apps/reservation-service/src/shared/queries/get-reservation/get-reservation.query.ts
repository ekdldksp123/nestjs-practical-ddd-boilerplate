import { IQuery } from '@nestjs/cqrs';

export class GetReservationQuery implements IQuery {
  constructor(public id: string) {}
}
