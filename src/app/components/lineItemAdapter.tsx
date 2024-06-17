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
            // on the other hand, a deposit-only wallet like Satoshis genesis block,
            // (1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa) the vouts do not keep increasing, 
            // so is not showing a balance, but an amount.
            // 
            // I confess: I do not understand vout. 
            // So I'm off to reread chapter six:transactions of Antonopoulous's _mastering bitcion_
            // meanwhile, I'll just return amount, speculating that amount serves as balance for
            // utxo that is not reused, but used once, as in good privacy practice, and in bitcoin grandpa scenario.


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
