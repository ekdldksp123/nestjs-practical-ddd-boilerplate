import { Entity, Property } from '@mikro-orm/core';
import { DeletableBaseEntity } from '@vendit-dev/database';

@Entity()
export class Reservation extends DeletableBaseEntity {
  @Property()
  type!: string;

  constructor(type: string) {
    super();
    this.type = type;
  }
}
