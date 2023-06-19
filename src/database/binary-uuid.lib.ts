import { Type } from '@mikro-orm/core';
import { parse, stringify } from 'uuid';

export class UUIDBinaryType extends Type<string, Buffer> {
  convertToDatabaseValue(value: string): Buffer {
    return Buffer.from(parse(value) as unknown as string);
  }

  convertToJSValue(value: Buffer): string {
    return stringify(value);
  }

  getColumnType(): string {
    return 'binary(16)';
  }
}
