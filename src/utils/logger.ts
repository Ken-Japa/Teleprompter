// src/utils/logger.ts

/**
 * @file Utilitário de logging centralizado para a aplicação.
 * @description Fornece funções para registrar mensagens com diferentes níveis de severidade,
 *              adicionando contexto estruturado automaticamente.
 */

enum LogLevel {
 DEBUG = "DEBUG",
 INFO = "INFO",
 WARN = "WARN",
 ERROR = "ERROR",
}

interface LogOptions {
 context?: Record<string, any>;
 error?: Error;
}

const log = (level: LogLevel, message: string, options?: LogOptions) => {
 const timestamp = new Date().toISOString();
 const logEntry = {
  timestamp,
  level,
  message,
  ...options?.context,
  ...(options?.error && { error: options.error.message, stack: options.error.stack }),
 };

 switch (level) {
  case LogLevel.DEBUG:
   console.debug(JSON.stringify(logEntry));
   break;
  case LogLevel.INFO:
   console.info(JSON.stringify(logEntry));
   break;
  case LogLevel.WARN:
   console.warn(JSON.stringify(logEntry));
   break;
  case LogLevel.ERROR:
   console.error(JSON.stringify(logEntry));
   break;
  default:
   console.log(JSON.stringify(logEntry));
 }
};

export const logger = {
 debug: (message: string, options?: LogOptions) => log(LogLevel.DEBUG, message, options),
 info: (message: string, options?: LogOptions) => log(LogLevel.INFO, message, options),
 warn: (message: string, options?: LogOptions) => log(LogLevel.WARN, message, options),
 error: (message: string, options?: LogOptions) => log(LogLevel.ERROR, message, options),
};
