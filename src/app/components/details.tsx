import { MempoolBlocktime } from "./mempoolBlocktime";
import { Bitcoin } from "./bitcoin";
import { MempoolStatus } from "./mempoolStatus";

import { LineItem } from "./lineItem";

const sample_txns_from_figma:LineItem[] = [
    {
        'amount': Bitcoin.from(37801991),
        'date': MempoolBlocktime.from(1682983427),
        'status': MempoolStatus.from(false),
    },
    {
        'amount': Bitcoin.from(14001991),
        'date': MempoolBlocktime.from(1681776000),
        'status': MempoolStatus.from(false),
    },
    {
        'amount': Bitcoin.from(-38981431),
        'date': MempoolBlocktime.from(1674950400),
        'status': MempoolStatus.from(true),
    },
]

//todo asynchronously fetch details as I did in https://github.com/awostenberg/symmetrical-guide/blob/master/src/app/components/repos.tsx
//and in micro test mock out with above txns as I did in https://github.com/awostenberg/symmetrical-guide/blob/master/src/app/components/repos.spec.tsx
//this will be through the mempool api https://mempool.space/docs/api/rest#get-address-transactions

//alas, while I now how to TDD this when it's a first class page and an async as required for fetch,
//I could not in time alotted figure out how to do that as a compnent. 
// so for now the fetch work and render is done as a nextJS page and not this compnent, over in app/[id]/DetailsPage.spec.tsx 

export default function Details() {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>AMOUNT (BTC)</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sample_txns_from_figma.map((item, index) =>
                            <tr key={index} >
                                <td>{item.date.toDisplayString()}</td>
                                <td>{item.amount.toDisplayString()}</td>
                                <td>{item.status.toDisplayString()}</td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>)
}