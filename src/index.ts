
export abstract class BaseError extends Error {
    constructor(message: string) {
        super(message);

        // Preserve the correct stack trace for where the error was thrown (V8 only)
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, BaseError);
        }

        this.name = new.target.name;
    }
}
