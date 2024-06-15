import { LineItem } from "./lineItem";
import { Bitcoin } from "./bitcoin";
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

export class LineItemAdapter {
    constructor(readonly mempoolJson: any) { this.mempoolJson = mempoolJson; };
    static from(j: any) { return new LineItemAdapter(j); };

    value(): LineItem[] {


        if (!this.mempoolJson) {
            return [];
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
                }
            ];
            return hardwiredToFirstReplaceMe;
        }
    };

}
