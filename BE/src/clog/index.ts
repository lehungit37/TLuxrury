import { isEmpty } from 'lodash';
import { createLogger, format, transports } from 'winston';

const consoleFormat = format.printf(
  ({ service, level, message, label, timestamp, ...data }) => {
    if (!isEmpty(data)) {
      return `[${service}][${timestamp}][${level}] ${message}\n${JSON.stringify(
        data,
        null,
        2
      )}`;
    }
    return `[${service}][${timestamp}][${level}] ${message}`;
  }
);

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DDTHH:mm:ss.SSSZ' }),
    format.json()
  ),
  defaultMeta: { service: 'user-service' },
  transports: [
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.timestamp({ format: 'YYYY-MM_DDTHH:mm:ss:SSSZ' }),
        format.splat(),
        consoleFormat
      ),
    }),
  ],
});

export default logger;
