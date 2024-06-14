// why applesauce? naming: it's a process https://www.digdeeproots.com/articles/naming-process/naming-as-a-process/

import { LineItem } from "./lineItem";

class LineItemAdapter {
    constructor(readonly mempoolJson: any) {this.mempoolJson = mempoolJson};
    static from(j: any) {return new LineItemAdapter(j)};
   
    value(): LineItem[] {return []};
    
}


describe('applesauce', () => {

    // so mabye I'm mapping the /confirmed vouts/ .. over .. the api results thing
    //  well what about that npm package  https://mempool.space/docs/api/rest#get-address-transactions
    // I could use this jig to understand that, or build my own.
    // or the npm json.. compare what it looks like?
    //      a) if the npm looks like json above, never mind
    //      b) if the npm is enriched compared to above, maybe..
    //          question: if (b) can I fetch-mock if the npm?
    //          question: if (b) useful types (I"m using /any/ so far)

    
    it('no vouts for address', () => {
        const va= LineItemAdapter.from('');

        const result: LineItem[] = va.value();

        expect(result).toHaveLength(0);


    })
    it.todo('one vout for address')
    it.todo('many vout for address')

    it.todo('oops malformed vout struct')



    it.todo('transforms date from status')
    it.todo('no date when status.confirmed=false')
    
    it.todo('transforms one vout to positive amount')
    it.todo('transforms one vin to negative amount')

})