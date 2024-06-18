
import { LineItem } from "./lineItem";

import { Bitcoin } from "./bitcoin";  //todo fe LineItem export these?
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";
import { LineItemAdapter } from "./lineItemAdapter";

import sampleOneVoutOnly from './1wiz-oneVout.spec.json';
import sampleThreeVoutOnly from './1wiz-threeVout.spec.json';
import sampleVinAndVout from './1wiz-mixed-send-rcv-spec.json';

describe('adapt mempool api json to LineItem', () => {
 


    it('no mempool items', () => {
        const va = LineItemAdapter.from('');

        const result: LineItem[] = va.only('42nope');

        expect(result).toHaveLength(0);


    })
    
    it('no matching vouts for address', () => {
        const va = LineItemAdapter.from(sampleOneVoutOnly);

        const result: LineItem[] = va.only('42nope');

        expect(result).toHaveLength(1);
        expect(result[0].amount).toStrictEqual(Bitcoin.from(0));

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
    
    it('combines many confirmed vout only for address', () => {
        const va = LineItemAdapter.from(sampleThreeVoutOnly);

        const result: LineItem[] = va.only('1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv');

        expect(result).toHaveLength(3);
        expect(result[0].amount).toStrictEqual(Bitcoin.from(30236));
        expect(result[0].date).toStrictEqual(MempoolBlocktime.from(1713994081));
        
        expect(result[1].amount).toStrictEqual(Bitcoin.from(22190));
        expect(result[1].date).toStrictEqual(MempoolBlocktime.from(1659763398));

        expect(result[2].amount).toStrictEqual(Bitcoin.from(5155));
        expect(result[2].date).toStrictEqual(MempoolBlocktime.from(1647033214));

        
    })

    it('combines mixed vin and vout to a negative amount', () => {
        const va = LineItemAdapter.from(sampleVinAndVout);

        const result: LineItem[] = va.only('1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv');

        //the last few are what I'm interested  - consider triming sample to item of interest
        expect(result).toHaveLength(11);
        const last = result.length-1;
        expect(result[last].amount).toStrictEqual(Bitcoin.from(1156220));
        expect(result[last-1].amount).toStrictEqual(Bitcoin.from(5884000));
        expect(result[last-2].amount).toStrictEqual(Bitcoin.from(-7040220));
    })

    it.todo('oops - malformed vout struct')
  
    it.todo('no date when not status.confirmed')

})