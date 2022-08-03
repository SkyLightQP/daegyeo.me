import pino from 'pino';

const logger = pino({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  timestamp: true,
  base: null,
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: true
    }
  }
});

export default logger;
