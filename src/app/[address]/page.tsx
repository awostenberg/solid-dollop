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
type ApplesauceComponentProps = {
    params: {
        address: string;
    }
}
const DetailsPage = async ({ params: { address } }: ApplesauceComponentProps) => {

    const results = await fetchMempoolConfirmedTransactions(address)

    return (<div>
        <h1>{address}</h1>
    </div>)

};

export default DetailsPage;

