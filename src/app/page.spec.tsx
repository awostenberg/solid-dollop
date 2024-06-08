
import {render,screen} from '@testing-library/react';
import Dashboard from './page';


describe('dashboard page', () => {

    describe('summary', () => {

        it('renders dashboard headline', () => {
            render(<Dashboard />) ;

            expect(screen.getByRole('heading').textContent).toContain("DASHBOARD")         

        })

        it.todo('renders the first and last part of transaction id in header left');
        it.todo('renders total bitcoin holdings in header right');
        it.todo('renders live btc to usd conversion in header far right');
    
    })

    describe('holdings', () => {
        it.todo('charts USD value of holdings over time');
    })
    
    describe('details', () => {
        it('renders transaction column headers date, amount and status', () => {
            render(<Dashboard />) ;

  
            expect(screen.getByRole('columnheader', {name:/date/i}));
            expect(screen.getByRole('columnheader', {name:/amount/i}));
            expect(screen.getByRole('columnheader', {name:/status/i}));
        })

        it.todo('renders the transaction amount');
        it.todo('renders the transaction date');
        it.todo('renders the transaction confirmation status');

    })

})