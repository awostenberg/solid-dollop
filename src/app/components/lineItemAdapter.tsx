// adapt what was returned from the mempool API to a LineItem suitable for display
// this is the adapter of ports and adapter architecture https://alistair.cockburn.us/hexagonal-architecture/

import { LineItem } from "./lineItem";
import { Bitcoin } from "./bitcoin";
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

export class LineItemAdapter {
    constructor(readonly mempoolJson: any) { };
    static from(j: any) { return new LineItemAdapter(j); };

    only(desiredAddress: string): LineItem[] {

        if (!this.mempoolJson) {
            return [];
        }

        else {

   
            /* 
                for each mempool item
                    outs = sum vouts matching this address (there should be at most one) (precisely one?)
                    ins = sum vins matching this address (there should be at most one)
                    amount is outs - ins
            */

            const results:[] = this.mempoolJson.map(mempoolItem => {

                // sum the vouts matching address
                const voutsSum = mempoolItem.vout.filter( vout => 
                    vout.scriptpubkey_address === desiredAddress)
                    .reduce( (sum:number, vout) => sum+vout.value,0);

                const firstStatus = mempoolItem.status.confirmed;
                const firstMempoolBlocktime = mempoolItem.status.block_time; //todo item will not exist if status.confirmed=false
                
                //todo sum the vins matching this address
                const vinsSum = mempoolItem.vin.filter(vin => 
                    vin.prevout.scriptpubkey_address === desiredAddress)
                    .reduce( (sum:number, vin) => sum+vin.prevout.value,0);
                
                

                const oneLineItem: LineItem =
                {
                    'amount': Bitcoin.from(voutsSum-vinsSum),
                    'status': MempoolStatus.from(firstStatus),
                    'date': MempoolBlocktime.from(firstMempoolBlocktime),
                };

                return oneLineItem;

            });

            return results;
            

        };
    };

}
