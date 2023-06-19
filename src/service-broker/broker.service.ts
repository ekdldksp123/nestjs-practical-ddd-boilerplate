import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { OgmaService } from '@ogma/nestjs-module';
import { nanoid } from 'nanoid';
import { catchError, firstValueFrom, lastValueFrom, throwError, timeout } from 'rxjs';

import { DEFAULT_TIMEOUT, SERVICE_BROKER_TOKEN } from './broker.constants';
import { BrokerServiceType } from './broker.service.type';
import { BrokerReq, BrokerRes, EventContract, MessageContract } from './contract.type';

@Injectable()
export class BrokerService implements BrokerServiceType {
  constructor(
    private logger: OgmaService,
    @Inject(SERVICE_BROKER_TOKEN)
    private serviceBroker: ClientProxy,
  ) {}

  // TODO: timeout should be handled
  async send<T extends MessageContract>(
    pattern: T,
    data: BrokerReq[T],
    options?: {
      timeout: number;
    },
  ): Promise<BrokerRes[T]> {
    const request = { ...data };
    const response = await lastValueFrom(
      this.serviceBroker.send<BrokerRes[T], BrokerReq[typeof pattern]>(pattern, request).pipe(
        timeout(options?.timeout || DEFAULT_TIMEOUT),
        catchError((err: any, caught: any) => {
          if (err.code) {
            throw new HttpException(err, err.code);
          } else {
            throw new HttpException(err, HttpStatus.INTERNAL_SERVER_ERROR);
          }
        }),
      ),
    );

    this.logger.info(
      {
        type: 'request',
        pattern,
        request,
        response,
      },
      {
        context: `${pattern}`,
      },
    );
    return response;
  }

  emit<T extends EventContract>(
    pattern: T,
    data: BrokerReq[T],
    options?: {
      timeout: number;
    },
  ): void {
    const request = { ...data };

    this.serviceBroker.emit<void, BrokerReq[T]>(pattern, request).pipe(timeout(options?.timeout || DEFAULT_TIMEOUT));
    this.logger.info(
      {
        type: 'event',
        pattern,
        request,
      },
      {
        context: `${pattern}`,
      },
    );
  }
}
