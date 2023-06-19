import {
  AbstractNamingStrategy,
  Entity,
  Filter,
  OptionalProps,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { camelCase } from 'lodash';
import { v1 } from 'uuid';

import { UUIDBinaryType } from './binary-uuid.lib';

export { UUIDBinaryType };

export type SoftDeleteOptions = {
  enabled?: boolean;
  defaultIsDeleted?: boolean;
  field?: string;
};

const defaultOptions = {
  enabled: true,
  defaultIsDeleted: false,
  field: 'deletedAt',
};

export const SoftDelete = (options: SoftDeleteOptions = {}): ClassDecorator => {
  const { enabled, defaultIsDeleted, field } = {
    ...defaultOptions,
    ...options,
  };
  return Filter({
    name: 'softDelete',
    cond: ({ isDeleted = defaultIsDeleted }: { isDeleted?: boolean } = {}) =>
      isDeleted
        ? { [field]: { $ne: null } }
        : isDeleted === false
        ? { [field]: null }
        : {},
    args: false,
    default: enabled,
  });
};

@Entity({ abstract: true })
export abstract class BaseEntity<T = never> {
  @PrimaryKey({ type: UUIDBinaryType })
  readonly id = v1();

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onUpdate: () => new Date(),
  })
  updatedAt?: Date;

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onCreate: () => new Date(),
  })
  createdAt?: Date;

  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | T;
}

@Entity({ abstract: true })
@SoftDelete()
export abstract class DeletableBaseEntity<T = never> {
  @PrimaryKey({ type: UUIDBinaryType })
  readonly id = v1();

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onCreate: () => new Date(),
  })
  createdAt: Date = new Date();

  @Property({ columnType: 'timestamp', length: 6, nullable: true })
  deletedAt?: Date;

  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | T;
}

@Entity({ abstract: true })
export abstract class SimpleEntity<T = never> {
  @PrimaryKey()
  id: number;

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onUpdate: () => new Date(),
  })
  updatedAt?: Date;

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onCreate: () => new Date(),
  })
  createdAt?: Date;

  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | T;
}

@Entity({ abstract: true })
@SoftDelete()
export abstract class DeletableSimpleEntity<T = never> {
  @PrimaryKey()
  readonly id;

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onUpdate: () => new Date(),
  })
  updatedAt: Date = new Date();

  @Property({
    columnType: 'timestamp',
    length: 6,
    nullable: true,
    defaultRaw: `now()`,
    onCreate: () => new Date(),
  })
  createdAt: Date = new Date();

  @Property({ columnType: 'timestamp', length: 6, nullable: true })
  deletedAt?: Date;

  [OptionalProps]?: 'id' | 'createdAt' | 'updatedAt' | 'deletedAt' | T;
}

export class CamelCaseNamingStrategy extends AbstractNamingStrategy {
  classToTableName(entityName: string): string {
    return this.underscore(entityName);
  }

  joinColumnName(propertyName: string, className?: string): string {
    return this.underscore(propertyName) + this.referenceColumnName();
  }

  joinKeyColumnName(entityName: string, referencedColumnName?: string): string {
    return camelCase(
      this.classToTableName(entityName) +
        (referencedColumnName || this.referenceColumnName()),
    );
  }

  joinTableName(
    sourceEntity: string,
    targetEntity: string,
    propertyName?: string,
  ): string {
    return camelCase(
      this.classToTableName(sourceEntity) + this.classToTableName(targetEntity),
    );
  }

  propertyToColumnName(propertyName: string): string {
    return this.underscore(propertyName);
  }

  referenceColumnName(): string {
    return 'Id';
  }

  private underscore(name: string): string {
    return camelCase(name);
  }
}
