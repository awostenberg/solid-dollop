

const txns = [
    { 'amount': '+ 0.37801991', 'date': '05/01/2023', 'status': 'PENDING' },
    { 'amount': '+ 0.14001991', 'date': '04/10/2023', 'status': 'PENDING' },
    { 'amount': '+ 0.38981431', 'date': '01/29/2023', 'status': 'PENDING' },
]


export default function Details() {
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>DATE</th>
                            <th>AMOUNT (BTC)</th>
                            <th>STATUS</th>
                        </tr>
                    </thead>
                    <tbody>
                        {txns.map((item, index) =>
                            <tr key={index} >
                                <th>{index + 1}</th>
                                <td>{item.date}</td>
                                <td>{item.amount}</td>
                                <td>{item.status}</td>
                            </tr>)

                        }

                    </tbody>
                </table>
            </div>
        </div>)
}