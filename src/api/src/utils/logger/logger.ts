import { LoggerOptions, transports, format } from 'winston';
import { WinstonModule } from 'nest-winston';

const options: LoggerOptions = {
  format: format.combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.printf(({ timestamp, level, message, stack }) => {
      return stack
        ? `[${timestamp}] ${level}: ${message}\n${stack}`
        : `[${timestamp}] ${level}: ${message}`;
    }),
  ),

  transports: [
    new transports.Console({
      format: format.colorize(),
    }),
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: format.json(),
    }),
    new transports.File({
      filename: 'logs/all-logs.log',
      format: format.json(),
    }),
  ],
};

export const logger = WinstonModule.createLogger(options);
