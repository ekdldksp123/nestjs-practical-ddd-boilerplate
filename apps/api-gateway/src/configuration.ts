export interface Environment {
  appEnv: string;
  app: {
    name: string;
  };
  services: {
    userService: string;
    reservationService: string;
  };
}

export default (): Environment => ({
  appEnv: process.env.APP_ENV || 'dev',
  app: {
    name: 'api-gateway',
  },
  services: {
    userService: process.env.USER_SVC_URL || 'http://localhost:4001/graphql',
    reservationService: process.env.RESERVATION_SVC_URL || 'http://localhost:4003/graphql',
  },
});
