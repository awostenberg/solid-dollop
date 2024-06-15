import { LineItem } from "./lineItem";
import { Bitcoin } from "./bitcoin";
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

export class LineItemAdapter {
    constructor(readonly mempoolJson: any) { this.mempoolJson = mempoolJson; };
    static from(j: any) { return new LineItemAdapter(j); };

    only(desiredAddress: string): LineItem[] {


        if (!this.mempoolJson) {
            return [];
        }

        else {
            // in a given entry I think there can be but /one/ matching tx,
            // and it will be either a vout or vin. Begin with vout.
            //  this seems mistaken.  In the 1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv sample 
            //  the fifth occurance is a vin with a prevout to that 1wiz18. 
            // the vout looks like a current balance and amount is inferred.
    

            const results = this.mempoolJson.map(firstItem => {
                const onlyMatchingVout = firstItem.vout.find(item =>
                    item.scriptpubkey_address === desiredAddress);
                if (!onlyMatchingVout) {
                    return null;
                };


                const firstSats = onlyMatchingVout.value;

                const firstStatus = firstItem.status.confirmed;
                const firstMempoolBlocktime = firstItem.status.block_time; //todo item will not exist if status.confirmed=false


                const onlyMatchingLineItem: LineItem =
                {
                    'amount': Bitcoin.from(firstSats),
                    'status': MempoolStatus.from(firstStatus),
                    'date': MempoolBlocktime.from(firstMempoolBlocktime),
                };

                return onlyMatchingLineItem;


            });

            const finalResult = results.filter(item => item);
            return finalResult;

        };
    };

}
