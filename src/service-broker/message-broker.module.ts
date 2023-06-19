import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';

import { SERVICE_BROKER_TOKEN } from './broker.constants';
import { BrokerService } from './broker.service';
import { MESSAGE_BROKER_MODULE_OPTIONS_TOKEN, natsDefaultOption } from './message-broker.contants';
import { MessageBrokerModuleOptions } from './message-broker.type';

@Module({
  controllers: [],
  providers: [
    {
      provide: SERVICE_BROKER_TOKEN,
      useFactory: (config: MessageBrokerModuleOptions) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [config.natsUrl],
            ...natsDefaultOption,
          },
        });
      },
      inject: [MESSAGE_BROKER_MODULE_OPTIONS_TOKEN],
    },
    BrokerService,
  ],
  exports: [
    {
      provide: SERVICE_BROKER_TOKEN,
      useFactory: (config: MessageBrokerModuleOptions) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            servers: [config.natsUrl],
            ...natsDefaultOption,
          },
        });
      },
      inject: [MESSAGE_BROKER_MODULE_OPTIONS_TOKEN],
    },
    BrokerService,
  ],
})
export class MessageBrokerModule extends createConfigurableDynamicRootModule<
  MessageBrokerModule,
  MessageBrokerModuleOptions
>(MESSAGE_BROKER_MODULE_OPTIONS_TOKEN) {}
