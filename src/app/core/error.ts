/**
 * A class for signifying that an error is a "handleable" error that comes from the playground,
 * as opposed to an error that comes from some internal operation or runtime error.
 */
export class ApplicationError extends Error {
    /**
     * @constructor
     *
     * @param message Error message to be propagated.
    */
    constructor(message: string, public innerError?: Error) {
        super(message);
        this.name = 'Application Error';
        this.message = message;
        if ((Error as any).captureStackTrace) {
            (Error as any).captureStackTrace(this, this.constructor);
        }
        else {
            let error = new Error();
            if (error.stack) {
                let last_part = error.stack.match(/[^\s]+$/);
                this.stack = `${this.name} at ${last_part}`;
            }
        }
    }
}