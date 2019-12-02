import React, { Component } from 'react'

class Transaction extends Component {
    render() {
        const transaction = this.props.transaction
        // Add onCLick function to delete button
        return (
            <div className="transaction">
                <span>${transaction.amount}</span>
                <span>{transaction.vendor}</span>
                <span>{transaction.category}</span>
                <button>Delete</button> 
            </div>
        )

    }

}
export default Transaction