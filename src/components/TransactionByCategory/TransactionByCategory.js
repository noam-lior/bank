import React from 'react'
import Transaction from '../Transaction/Transaction'

function TransactionByCategory(props) {
    console.log(props.transactions)
    const currentCategory = props.match.params.category
    let transactions = props.transactions
    transactions = currentCategory === "all" ? transactions : transactions.filter(t => t.category === currentCategory)

    return (<table className="centered">
        <thead>
            <tr>
                <th></th>
                <th>Category</th>
                <th>Vendor</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
        </thead>

        <tbody id="transactions-container">
            {transactions.map(t => <Transaction transaction={t} removeTransaction={props.removeTransaction} />)}
        </tbody>
    </table>)

}

export default TransactionByCategory