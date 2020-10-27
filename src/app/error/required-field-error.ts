export class RequiredFieldError extends Error {
    constructor(field: string) {
        super(field + ' is required!');
        Object.setPrototypeOf(this, RequiredFieldError.prototype);
    }
}