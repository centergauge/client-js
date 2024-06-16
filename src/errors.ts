/**
 * Error thrown by the AuthSureFlowClient.
 */
export class CenterGaugeClientError extends Error {
  readonly name = 'CenterGaugeClientError';
  readonly message: string;
  constructor(
    message: string,
    public readonly cause?: unknown
  ) {
    super(message);
    this.message = message;
  }
}

/**
 * Returns true if the error is an AuthSureFlowClientError.
 *
 * @param e the error to check
 */
export function isCenterGaugeClientError(
  e?: unknown
): e is CenterGaugeClientError {
  return e instanceof Error && e.name === 'CenterGaugeClientError';
}
