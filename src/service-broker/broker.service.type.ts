import { BrokerReq, BrokerRes, EventContract, MessageContract } from './contract.type';

export abstract class BrokerServiceType {
  abstract send<T extends MessageContract>(pattern: T, data: BrokerReq[T]): Promise<BrokerRes[T]>;
  abstract emit<T extends EventContract>(pattern: EventContract, data: BrokerReq[T]): void;
}
