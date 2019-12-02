import React, { Component } from 'react'
import Transaction from '../Transaction/Transaction'

class Transactions extends Component {
    render() {
        const transactions = this.props.transactions
        const balance = this.props.balance
        return (
            <div>
                <div id="balance">Balance - ${balance}</div>
                <div id="transactions-container">
                    {transactions.map(t => <Transaction transaction={t} />)}
                </div>
            </div>
        )
    }
}

export default Transactions