import { IntrospectAndCompose } from '@apollo/gateway';
import { ApolloGatewayDriver, ApolloGatewayDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { OgmaModule } from '@ogma/nestjs-module';
import { ExpressParser } from '@ogma/platform-express';
import { GraphQLParser } from '@ogma/platform-graphql';

import configuration, { Environment } from '../environments/configuration';
import { AppController } from './app.controller';
import { AppService } from '../service/app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    OgmaModule.forRootAsync({
      imports: [], // this can be typeorm or a db driver module
      inject: [ConfigService], // assuming global config service
      useFactory: async (config: ConfigService<Environment>) => {
        const isDev = config.get('appEnv', { infer: true }) === 'dev';
        return {
          service: {
            logLevel: isDev ? 'ALL' : 'INFO',
            color: isDev,
            application: config.get('app.name', { infer: true }),
            json: !isDev,
          },
          interceptor: {
            gql: GraphQLParser,
            http: ExpressParser,
          },
        };
      },
    }),
    GraphQLModule.forRootAsync<ApolloGatewayDriverConfig>({
      driver: ApolloGatewayDriver,
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return {
          server: {
            cors: true,
            debug: true,
            playground: true,
            introspection: true,
          },
          gateway: {
            supergraphSdl: new IntrospectAndCompose({
              subgraphHealthCheck: true,
              subgraphs: [
                {
                  name: 'users',
                  url: config.get('services.userService', { infer: true }),
                },
                {
                  name: 'reservations',
                  url: config.get('services.reservationService', {
                    infer: true,
                  }),
                },
              ],
            }),
            pollIntervalInMs: 10000,
            experimental_updateSupergraphSdl: true,
            experimental_autoFragmentization: true,
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
