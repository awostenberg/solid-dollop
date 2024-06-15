export class MempoolStatus {
    constructor(readonly confirmed: boolean) { }
    static from(status: boolean) { return new MempoolStatus(status) }

    toDisplayString() { return this.confirmed ? 'COMPLETED' : 'PENDING' }

}
