import React, { Component } from 'react'
import './Transaction.css'

class Transaction extends Component {
    removeTransaction() {
        this.props.removeTransaction(this.props.transaction)
    }

    render() {
        const transaction = this.props.transaction
        const actionType=transaction.amount>0?'deposit':'withdrawal'
        return (
            <div className={`transaction ${actionType}`}>
                <span>${transaction.amount}</span>
                <span>{transaction.vendor}</span>
                <span>{transaction.category}</span>
                <button onClick={this.removeTransaction}>Delete</button>
            </div>
        )

    }

}
export default Transaction