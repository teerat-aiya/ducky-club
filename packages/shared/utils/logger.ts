enum LogLevel {
  DEBUG = 0,
  INFO = 1,
  WARN = 2,
  ERROR = 3,
}

class Logger {
  private workerName: string;
  private logLevel: LogLevel;

  constructor(workerName: string, logLevel: LogLevel = LogLevel.INFO) {
    this.workerName = workerName;
    this.logLevel = logLevel;
  }

  private log(level: LogLevel, message: string, ...args: any[]) {
    if (level >= this.logLevel) {
      const timestamp = new Date().toISOString();
      const levelName = LogLevel[level];
      console.log(`[${timestamp}] [${this.workerName}] [${levelName}] ${message}`, ...args);
    }
  }

  debug(message: string, ...args: any[]) {
    this.log(LogLevel.DEBUG, message, ...args);
  }

  info(message: string, ...args: any[]) {
    this.log(LogLevel.INFO, message, ...args);
  }

  warn(message: string, ...args: any[]) {
    this.log(LogLevel.WARN, message, ...args);
  }

  error(message: string, ...args: any[]) {
    this.log(LogLevel.ERROR, message, ...args);
  }

  setLogLevel(level: LogLevel) {
    this.logLevel = level;
  }
}

export { Logger, LogLevel };