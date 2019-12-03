import React, { Component } from 'react'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Transaction from '../Transaction/Transaction'
import DateFnsUtils from '@date-io/date-fns'
// import './Transactions.css'

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            startDate: new Date(),
            endDate: new Date()
        }
    }

    handleStartDateChange = newDate => {
        this.setState({ startDate: newDate })
    }

    handleEndDateChange = newDate => {
        this.setState({ endDate: newDate })
    }
    render() {
        const transactions = this.props.transactions
        const categories = this.props.categories
        const categoriesArray = Object.entries(categories)


        return (
            <div>
                <select id="category-selector">
                    {categoriesArray.filter(c => c[1] > 0).map(c => <option value={c[0]}>{c[0]}</option>)}
                </select>

                <div>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker id="start-date" label="start date" value={this.state.startDate} onChange={this.handleStartDateChange} />
                        <DatePicker id="end-date" label="end date" value={this.state.endDate} onChange={this.handleEndDateChange} />
                    </MuiPickersUtilsProvider>

                </div>
                <div id="transactions-container">
                    {transactions.map(t => <Transaction transaction={t} removeTransaction={this.props.removeTransaction} />)}
                </div>
            </div>
        )
    }
}

export default Transactions