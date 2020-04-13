class HttpError extends Error {
  constructor(message, errorCode) {
    super(message);
    this.code = errorCode;
  }
}

// eslint-disable-next-line no-undef
module.exports = HttpError;
