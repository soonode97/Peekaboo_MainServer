import { ErrorResponse } from './response.error.js';

class CustomError extends Error {
  constructor(error, packetType = null) {
    super(error.message);
    this.code = error.code;
    this.errorResponse = ErrorResponse.packetType;
    this.packetType = packetType;
    this.name = 'Custom Error';
  }
}

export default CustomError;
