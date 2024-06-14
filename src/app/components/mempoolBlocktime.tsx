export class MempoolBlocktime {
    readonly theDate: Date;
    constructor(readonly mempool_block_time: number) { this.theDate = new Date(mempool_block_time * 1000); };;
    static from(blocktime: number) { return new MempoolBlocktime(blocktime); };

    toDisplayString(): string {
        return this.theDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        });
    };

}
