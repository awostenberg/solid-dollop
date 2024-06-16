
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

        it('links to favorite address 1wiz...gpv', () => {
            render(<Dashboard />)

            expect(screen.getAllByRole('link'))
        })

    })





})

