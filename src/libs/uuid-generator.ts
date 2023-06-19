import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { IdGenerator } from 'src/interface/id-generator';

@Injectable()
export class UuidGenerator extends IdGenerator {
  generateId(): string {
    return uuidv4();
  }
}
