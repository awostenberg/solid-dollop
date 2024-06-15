// why applesauce? naming: it's a process https://www.digdeeproots.com/articles/naming-process/naming-as-a-process/

import { LineItem } from "./lineItem";

import { Bitcoin } from "./bitcoin";  //todo could LineItem export these?
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

import sampleOneVoutOnly from './1wiz-oneVout.spec.json';
import { LineItemAdapter } from "./lineItemAdapter";

describe('adapt mempool api json to LineItem', () => {


    // so mabye I'm mapping the /confirmed vouts/ .. over .. the api results thing
    //  well what about that npm package  https://mempool.space/docs/api/rest#get-address-transactions
    // I could use this jig to understand that, or build my own.
    // or the npm json.. compare what it looks like?
    //      a) if the npm looks like json above, never mind
    //      b) if the npm is enriched compared to above, maybe..
    //          question: if (b) can I fetch-mock if the npm?
    //          question: if (b) useful types (I"m using /any/ so far)


    it('no mempool items', () => {
        const va = LineItemAdapter.from('');

        const result: LineItem[] = va.only('42nope');

        expect(result).toHaveLength(0);


    })
    
    it('no matching vouts for address', () => {
        const va = LineItemAdapter.from(sampleOneVoutOnly);

        const result: LineItem[] = va.only('42nope');

        expect(result).toHaveLength(0);

    })
  
    it('transforms one confirmed vout for address', () => {
        const va = LineItemAdapter.from(sampleOneVoutOnly)

        const result: LineItem[] = va.only('1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv');

        expect(result).toHaveLength(1);
        const expectedAmount = Bitcoin.from(30236);
        expect(result[0].amount).toStrictEqual(expectedAmount);
        const expectedDate = MempoolBlocktime.from(1713994081);
        expect(result[0].date).toStrictEqual(expectedDate);
        const expectedStatus = MempoolStatus.from(true);
        expect(result[0].status).toStrictEqual(expectedStatus);

    })
    
    it.todo('transforms many confirmed vout for address')

    it.todo('oops - malformed vout struct')
    it.todo('likely oops - more than one matching vout for address in one mempool item');
    
    it.todo('transforms date from status')
    it.todo('no date when not status.confirmed')

    it.todo('transforms one vout to positive amount')
    it.todo('transforms one vin to negative amount')

})