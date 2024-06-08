
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
                            <td>05/01/2023</td>
                            <td>+ 0.37801991</td>
                            <td>PENDING</td>
                        </tr>
                        {/* row 2 */}
                        <tr>
                            <th>2</th>
                            <td>04/18/2023</td>
                            <td>+ 0.14001991</td>
                            <td>PENDING</td>
                        </tr>
                        {/* row 3 */}
                        <tr>
                            <th>3</th>
                            <td>02/29/2023</td>
                            <td>- 0.38981431</td>
                            <td>COMPLETED</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>)
}