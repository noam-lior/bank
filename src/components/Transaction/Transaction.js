import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import './Transaction.css'

class Transaction extends Component {
    removeTransaction=()=>{
        this.props.removeTransaction(this.props.transaction)
    }
    handleFilter = async() => {
        await this.props.handleFilter(`/transactions/${this.props.transaction.category}`)
    }
    render() {
        const transaction = this.props.transaction
        const actionType = transaction.amount > 0 ? 'deposit' : 'withdrawal'
        return (
            <tr className={`transaction ${actionType}`}>
                <td>
                    <IconButton
                        onClick={this.removeTransaction}
                        aria-label='delete'
                    >
                        <DeleteIcon className="delete-icon"/>
                    </IconButton>
                </td>
                <td><Link to={`/transactions/${transaction.category}`} onClick={this.handleFilter}>{transaction.category}</Link></td>
                <td>{transaction.vendor}</td>
                <td>${transaction.amount}</td>
                <td>{transaction.date}</td>
            </tr>
        )

    }

}
export default Transaction