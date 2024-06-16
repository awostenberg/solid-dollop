
// this renders the detail page for an address, using fetch mocks,
// to avoid unreliable tests due to internet connections
// a contract integration test will check the mock behaves faithfully. See https://martinfowler.com/bliki/ContractTest.html

import { render, screen } from '@testing-library/react';
import DetailsPage from './page';

import sampleOneVout from '../components/1wiz-oneVout.spec.json';

import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

describe('details page', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  })


  it('renders address headline if confirmed in mempool', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleOneVout));
    const address = '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv';
    // Async render? See https://www.marcusoft.net/2022/11/nextjs-testing-async-react-components.html
    const jsx = await DetailsPage({ params: { address: address } });

    render(jsx);

    expect(screen.getByRole('heading').textContent).toContain('1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv')

  })

  it('renders transaction column headers date, balance and status', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleOneVout));
    const address = '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv';
    const jsx = await DetailsPage({ params: { address: address } });

    render(jsx);

    expect(screen.getByRole('columnheader', {name:/date/i}));
    expect(screen.getByRole('columnheader', {name:/balance/i}));
   
  })

  it('fetches and renders balance in table', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleOneVout));
    const address = '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv';
    const jsx = await DetailsPage({ params: { address: address } });
    render(jsx);

    const balance = screen.getAllByRole('cell')[1]; //first row 2nd column
    expect(balance.textContent).toBe('+ 0.00030236');
  })

  it('fetches and renders date in table', async () => {
    fetchMock.mockResponseOnce(JSON.stringify(sampleOneVout));
    const address = '1wiz18xYmhRX6xStj2b9t1rwWX4GKUgpv';
    const jsx = await DetailsPage({ params: { address: address } });
    render(jsx);

    const date = screen.getAllByRole('cell')[0];
    expect(date.textContent).toContain('04/24/2024');

});






})