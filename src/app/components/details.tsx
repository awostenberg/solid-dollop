

const txns = [
    {'amount':'+ 0.37801991', 'date':'05/01/2023','status':'PENDING'}
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
                        
                        {/* row 1 */}
                        <tr>
                            <th>1</th>
                            <td>{txns[0].date}</td>
                            <td>{txns[0].amount}</td>
                            <td>{txns[0].status}</td>
                        </tr>
                    
                    </tbody>
                </table>
            </div>
        </div>)
}