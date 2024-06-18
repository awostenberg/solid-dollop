import React from 'react';

import { LineItemAdapter } from '../components/lineItemAdapter';

const fetchMempoolConfirmedTransactions = async (address: string) => {
    const url = `https://mempool.space/api/address/${address}/txs/chain`;

    const preliminaryResult = await fetch(url);
    const result = await preliminaryResult.json();

    const la = LineItemAdapter.from(result);
    const finalResult = la.only(address);

    return finalResult;

}
type DetailsPageComponentProps = {
    params: {
        address: string;
    }
}
const DetailsPage = async ({ params: { address } }: DetailsPageComponentProps) => {

    const results = await fetchMempoolConfirmedTransactions(address)

    return (<div>
        <h1>{address} confirmed balance table</h1>
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>DATE</th>
                            <th>AMOUNT (BTC)</th>

                        </tr>
                    </thead>
                    <tbody>
                        {results.map((item, index) =>
                            <tr key={index} >
                                <td>{item.date.toDisplayString()}</td>
                                <td>{item.amount.toDisplayString()}</td>

                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    </div>)

};

export default DetailsPage;

