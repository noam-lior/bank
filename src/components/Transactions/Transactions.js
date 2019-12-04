import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import Transaction from '../Transaction/Transaction'
import DateFnsUtils from '@date-io/date-fns'
import './Transactions.css'

class Transactions extends Component {
    constructor() {
        super()
        this.state = {
            startDate: null,
            endDate: null,
            currentCategory: "all",
            path: `/transactions/all?startDate=${null}&endDate=${null}`
        }
    }

    formatDate = (date) => {
        let month = date.getMonth() + 1
        let day = date.getDate()
        month = month >= 10 ? month : "0" + month
        day = day >= 10 ? day : "0" + day
        console.log(date.getFullYear() + "-" + month + "-" + day)
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    }

    handleStartDateChange = newDate => {
        const formattedDate=this.formatDate(newDate)
        this.setState({
            startDate: formattedDate,
            path: `/transactions/${this.state.currentCategory}?startDate=${formattedDate}&endDate=${this.state.endDate}`
        })
    }

    handleEndDateChange = newDate => {
        const formattedDate=this.formatDate(newDate)
        this.setState({
            endDate: formatted,
            path: `/transactions/${this.state.currentCategory}?startDate=${this.state.startDate}&endDate=${formattedDate}`
        })
    }

    updateCategory = e => {
        this.setState({
            currentCategory: e.target.value,
            path: `/transactions/${e.target.value}?startDate=${this.state.startDate}&endDate=${this.state.endDate}`
        })
    }

    handleFilter = async path => {

        await this.props.handleFilter(this.state.path)
    }
    render() {
        let transactions = this.props.transactions
        // transactions = currentCategory==="all"?transactions:transactions.filter(t=>t.category===currentCategory)
        const categories = this.props.categories
        const categoriesArray = Object.entries(categories)

        return (
            <div id="transactions-super-container">
                <div id="filter-container">
                    <div>
                        <span>Category</span>
                        <select id="category-selector" onChange={this.updateCategory}>
                            {categoriesArray.filter(c => c[1] > 0).map(c => <option key={c[0]} value={c[0]} >{c[0]}</option>)}
                        </select>
                    </div>

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <span>Start date:</span><DatePicker
                            id="start-date" value={this.state.startDate} onChange={this.handleStartDateChange} />
                        <span>End date:</span><DatePicker id="end-date" value={this.state.endDate} onChange={this.handleEndDateChange} />
                    </MuiPickersUtilsProvider>

                    <Link to={this.state.path} >
                        <button id="filter" onClick={this.handleFilter}>Filter
                        </button>
                    </Link>

                </div>

                <table className="centered">
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

                        {transactions.length > 0 ? transactions.map(t => <Transaction transaction={t} removeTransaction={this.props.removeTransaction} handleFilter={this.props.handleFilter} />) : null}
                    </tbody>
                </table>

            </div >
        )
    }
}

export default Transactions