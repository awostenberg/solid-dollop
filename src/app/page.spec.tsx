
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

        const sample = [{'amount': 37801991, 'date':'05/01/2023', 'status':'PENDING'}] //soon to be actually used
        it('renders the transaction amount', () => {

     
            render(<Dashboard />)
            
            const amount = screen.getAllByRole('cell')[1];  //first row first column
            expect(amount.textContent).toContain('+ 0.37801991');

        });

        it('renders the transaction date', () => {
            render(<Dashboard />);

            const date = screen.getAllByRole('cell')[0];
            expect(date.textContent).toContain('05/01/2023');

        });

        it('renders the transaction confirmation status', () => {
            render(<Dashboard />);

            const status = screen.getAllByRole('cell')[2];
            expect(status.textContent).toContain('PENDING');
       
        });

        

    })





})

