import { Bitcoin } from "./bitcoin";
import { MempoolBlocktime } from "./mempoolBlocktime";
import { MempoolStatus } from "./mempoolStatus";

// adapt json from mepool api to what is needed for input to <detail> (date,amount,status)
// 1A1z genesis re https://mempool.space/api/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa/txs/chain
//              re https://bitinfocharts.com/bitcoin/address/1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa
// 1wiz api mixed re https://mempool.space/api/address/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv/txs/chain
//              re https://bitinfocharts.com/bitcoin/address/1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv
//JAGNI import sample1A1voutsOnly from './1A1-genesis-rcv-and-confirmed-only.spec.json'
export interface LineItem {
    readonly amount: Bitcoin;
    readonly date: MempoolBlocktime;
    readonly status: MempoolStatus;
}
