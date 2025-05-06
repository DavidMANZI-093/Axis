/**
 * Logger class for recording debug information.
 */
export class Logger {
    private _enabled: boolean;
    private _logLevel: LogLevel;
    private _logFile: string | null;
  
    /**
     * Creates a new Logger instance.
     * @param enabled - whether logging is enabled
     * @param logLevel - minimum log level to record
     * @param logFile - file to write logs to (null for console output)
     */
    constructor(
      enabled: boolean = true,
      logLevel: LogLevel = LogLevel.INFO,
      logFile: string | null = null
    ) {
      this._enabled = enabled;
      this._logLevel = logLevel;
      this._logFile = logFile;
    }
  
    /**
     * Logs a debug message.
     * @param message - message to log
     */
    debug(message: string): void {
      this._log(LogLevel.DEBUG, message);
    }
  
    /**
     * Logs an info message.
     * @param message - message to log
     */
    info(message: string): void {
      this._log(LogLevel.INFO, message);
    }
  
    /**
     * Logs a warning message.
     * @param message - message to log
     */
    warn(message: string): void {
      this._log(LogLevel.WARN, message);
    }
  
    /**
     * Logs an error message.
     * @param message - message to log
     */
    error(message: string): void {
      this._log(LogLevel.ERROR, message);
    }
  
    /**
     * Internal method to log a message with a given level.
     * @param level - log level
     * @param message - message to log
     */
    private _log(level: LogLevel, message: string): void {
      if (!this._enabled || level < this._logLevel) {
        return;
      }
  
      const timestamp = new Date().toISOString();
      const levelStr = LogLevel[level];
      const logMessage = `[${timestamp}] [${levelStr}] ${message}`;
  
      if (this._logFile) {
        // TODO: Implement file logging
        console.log(logMessage);
      } else {
        console.log(logMessage);
      }
    }
  
    /**
     * Sets whether logging is enabled.
     * @param enabled - whether logging is enabled
     */
    setEnabled(enabled: boolean): void {
      this._enabled = enabled;
    }
  
    /**
     * Sets the minimum log level.
     * @param level - minimum log level to record
     */
    setLogLevel(level: LogLevel): void {
      this._logLevel = level;
    }
  }
  
  /**
   * Log levels in order of increasing severity.
   */
  export enum LogLevel {
    DEBUG = 0,
    INFO = 1,
    WARN = 2,
    ERROR = 3
  }