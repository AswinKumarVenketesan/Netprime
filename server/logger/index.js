
const { createLogger, format, transports } = require('winston');
require('winston-daily-rotate-file')
const { combine, splat, timestamp, printf } = format;

const myFormat = printf( ({ level, message, timestamp , ...metadata}) => {
  let msg = `${timestamp} [${level}] : ${message} `  
  if(metadata) {
	msg += JSON.stringify(metadata)
  }
  return msg
});

const logger = createLogger({
    transports: [
      new transports.File({
        filename: "../logs/netprime.log",
        level: "info",
        format: combine(
          format.colorize(),
          splat(),
          timestamp(),
          myFormat
          ),
      }),
      new transports.File({
        filename: "../logs/netprime-error.log",
        level: "error",
        format: combine(
          format.colorize(),
          splat(),
          timestamp(),
          myFormat
          ),
      }),
    ],
  });
module.exports = logger