import { NatsOptions } from '@nestjs/microservices';

export const MESSAGE_BROKER_MODULE_OPTIONS_TOKEN = 'MESSAGE_BROKER_MODULE_OPTIONS_TOKEN';

export const { options: natsDefaultOption }: NatsOptions = {
  options: {
    waitOnFirstConnect: true,
    reconnect: true,
    reconnectTimeWait: 1000,
    timeout: 25000,
  },
};
