
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
    // Async? See https://www.marcusoft.net/2022/11/nextjs-testing-async-react-components.html
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
    expect(screen.getByRole('columnheader', {name:/status/i}));

  })
  it.todo('renders balance in table')
  it.todo('renders date in table')




})