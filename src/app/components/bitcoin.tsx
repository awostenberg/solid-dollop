export class Bitcoin {
    readonly satoshis: number;
    constructor(readonly s: number) { this.satoshis = s; };
    static fromSats(amount: number) { return new Bitcoin(amount); };
    
    asDisplayString(): string { 
        return `${this.satoshis<0?'-':'+'} ${(Math.abs(this.satoshis)/100_000_000).toFixed(8)}`; }

     
}
