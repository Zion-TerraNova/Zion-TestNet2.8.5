/**
 * ZION SDK Error Classes
 */

export class ZionError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ZionError';
  }
}

export class ConnectionError extends ZionError {
  constructor(message: string) {
    super(message);
    this.name = 'ConnectionError';
  }
}

export class RPCError extends ZionError {
  public code: number;

  constructor(message: string, code: number = -1) {
    super(message);
    this.name = 'RPCError';
    this.code = code;
  }
}

export class ValidationError extends ZionError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}

export class WalletError extends ZionError {
  constructor(message: string) {
    super(message);
    this.name = 'WalletError';
  }
}
