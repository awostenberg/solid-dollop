import { MempoolBlocktime } from "./mempoolBlocktime";
import { Bitcoin } from "./bitcoin";

const sample_txns_from_figma = [
    {
        'amount': Bitcoin.fromSats(37801991),
        'date': MempoolBlocktime.from(1682983427),
        'status': 'PENDING'
    },
    {
        'amount': Bitcoin.fromSats(14001991),
        'date': MempoolBlocktime.from(1681776000),
        'status': 'PENDING'
    },
    {
        'amount': Bitcoin.fromSats(-38981431),
        'date': MempoolBlocktime.from(1674950400),
        'status': 'COMPLETED'
    },
]

//todo asynchronously fetch details as I did in https://github.com/awostenberg/symmetrical-guide/blob/master/src/app/components/repos.tsx
//and in micro test mock out with above txns as I did in https://github.com/awostenberg/symmetrical-guide/blob/master/src/app/components/repos.spec.tsx
//this will be through the mempool api https://mempool.space/docs/api/rest#get-address-transactions

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
                                <td>{item.date.asDisplayString()}</td>
                                <td>{item.amount.asDisplayString()}</td>
                                <td>{item.status}</td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>)
}