export class Response <T> {
    constructor(public success: boolean, public data: T) {}
}