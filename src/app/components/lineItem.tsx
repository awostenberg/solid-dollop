import { Bitcoin } from "./bitcoin";
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

export interface LineItem {
    readonly amount: Bitcoin;
    readonly date: MempoolBlocktime;
    readonly status: MempoolStatus;
}
