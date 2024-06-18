
// This renders the detail page for an address, using fetch mocks,
// to avoid unreliable tests due to internet connections and changing 3rd party (mempool) API.
// But such loose coupling, while desirable poses a problem: how do I know my fetch mock matches the real API?
// A contract integration test will check the mock behaves faithfully. See https://martinfowler.com/bliki/ContractTest.html
// This is the I (for interface) in TDD guided by zombies https://blog.wingman-sw.com/tdd-guided-by-zombies

import { render, screen } from '@testing-library/react';
import DetailsPage from './page';

import sampleOneVout from '../components/1wiz-oneVout.spec.json';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('details page', () => {
  let address:string;
  beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponseOnce(JSON.stringify(sampleOneVout));
    address = '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv';
    
  })


  it('renders address headline if confirmed in mempool', async () => {

    // Async render? See https://www.marcusoft.net/2022/11/nextjs-testing-async-react-components.html
    const jsx = await DetailsPage({ params: { address: address } });

    render(jsx);

    expect(screen.getByRole('heading').textContent).toContain('1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv')

  })

  it('renders transaction column headers date, balance and status', async () => {

    const jsx = await DetailsPage({ params: { address: address } });

    render(jsx);

    expect(screen.getByRole('columnheader', {name:/date/i}));
    expect(screen.getByRole('columnheader', {name:/amount/i})); 
   
  })

  it('fetches and renders balance in table', async () => {

    const jsx = await DetailsPage({ params: { address: address } });
    render(jsx);

    const balance = screen.getAllByRole('cell')[1]; //first row 2nd column
    // name 'balance' here is not entirely accurate for it's really just the vout.
    // and while that is accurate for single use deposit-only utxos 
    // as in grandpa bitcoin (/docs/personae/grandpa_b.md) scenario,
    // it is not generally correct.
    // See chapter 6 _mastering bitcoin_ "transactions" for what must be done to compute balance

    expect(balance.textContent).toBe('+ 0.00030236');
  })

  it('fetches and renders date in table', async () => {

    const jsx = await DetailsPage({ params: { address: address } });
    render(jsx);

    const date = screen.getAllByRole('cell')[0];
    expect(date.textContent).toContain('04/24/2024');

});






})