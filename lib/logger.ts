import winston from 'winston';

export default winston.createLogger({
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(winston.format.cli(), winston.format.splat()),
    }),
  ],
});
