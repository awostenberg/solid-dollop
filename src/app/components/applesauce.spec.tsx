// why applesauce? naming: it's a process https://www.digdeeproots.com/articles/naming-process/naming-as-a-process/

import { LineItem } from "./lineItem";

import { Bitcoin } from "./bitcoin";  //todo could LineItem export these?
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

class LineItemAdapter {
    constructor(readonly mempoolJson: any) { this.mempoolJson = mempoolJson };
    static from(j: any) { return new LineItemAdapter(j) };

    value(): LineItem[] {
        

        if (!this.mempoolJson) {
            return []
        }

        else {
  
            const firstSats = this.mempoolJson[0].vout[0].value;
            const firstStatus = this.mempoolJson[0].status.confirmed;
            const firstMempoolBlocktime = this.mempoolJson[0].status.block_time; //todo item will not exist if status.confirmed=false
            const hardwiredToFirstReplaceMe: LineItem[] = [
                {
                    'amount': Bitcoin.from(firstSats),
                    'status': MempoolStatus.from(firstStatus),
                    'date': MempoolBlocktime.from(firstMempoolBlocktime),
                }]
            return hardwiredToFirstReplaceMe;
        }
    };

}

import sampleOneVoutOnly from './1wiz-oneVout.spec.json';

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
        const va = LineItemAdapter.from('');

        const result: LineItem[] = va.value();

        expect(result).toHaveLength(0);


    })

    
    it('transforms one confirmed vout for address', () => {
        const va = LineItemAdapter.from(sampleOneVoutOnly)

        const result: LineItem[] = va.value();

        expect(result).toHaveLength(1);
        const expectedAmount = Bitcoin.from(30236);
        expect(result[0].amount).toStrictEqual(expectedAmount);
        const expectedDate = MempoolBlocktime.from(1713994081);
        expect(result[0].date).toStrictEqual(expectedDate);
        const expectedStatus = MempoolStatus.from(true);
        expect(result[0].status).toStrictEqual(expectedStatus);

    })
    it.todo('transforms many confirmed vout for address')

    it.todo('oops malformed vout struct')

    it.todo('transforms date from status')
    it.todo('no date when not status.confirmed')

    it.todo('transforms one vout to positive amount')
    it.todo('transforms one vin to negative amount')

})