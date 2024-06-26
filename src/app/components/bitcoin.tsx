export class Bitcoin {
    constructor(readonly satoshis: number) { };
    static from(satoshiAmount: number) { return new Bitcoin(satoshiAmount) };
    
    toDisplayString(): string { 
        return `${this.satoshis<0?'-':'+'} ${(Math.abs(this.satoshis)/100_000_000).toFixed(8)}`; }

     
}
