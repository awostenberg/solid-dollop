import {Bitcoin} from './bitcoin';

describe('bitcoin whole value', () => {
    // a whole value is a quantity to define something in the domain  http://fit.c2.com/wiki.cgi?WholeValue
    
    it('formats 8 decimal digits to the right', () => {
        expect(Bitcoin.from(37_801_991).toDisplayString()).toContain('+ 0.37801991');
    })

    it('pads right with zeros to 8 places', () => {
        expect(Bitcoin.from(1_000_000).toDisplayString()).toContain('+ 0.01000000')
    });

    it('displays no leading zero left of decimal if greater than a whole bitcoin', () => {
        expect(Bitcoin.from(101_000_000).toDisplayString()).toContain('+ 1.01000000');
    });

    it('displays leading minus if negative', () => {
        expect(Bitcoin.from(-1_000_000).toDisplayString()).toContain('- 0.01000000');
    });
})