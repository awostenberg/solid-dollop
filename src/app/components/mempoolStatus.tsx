export class MempoolStatus {
    readonly status: boolean;
    constructor(readonly s: boolean) { this.status = s }
    static from(s: boolean) { return new MempoolStatus(s) }

    toDisplayString() { return this.status ? 'COMPLETED' : 'PENDING' }

}
