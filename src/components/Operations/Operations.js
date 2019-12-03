import React, { Component } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import Snackbar from '@material-ui/core/Snackbar';

class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: 0,
            vendor: "Vendor",
            category: "Category",
            date: new Date()
        }
    }

    handleChange = e => {
        const id = e.target.id
        const value = e.target.value
        let name
        if (id === "amount-input")
            name = "amount"
        else if (id === "vendor-input")
            name = "vendor"
        else
            name = "category"

        this.setState({
            [name]: value,
        })
    }
    handleClick = () => {
        const currentDate = new Date()
        this.props.addTransaction({ ...this.state, currentDate })
        
    }

    handleDateChange = newDate => {
        this.setState({ date: newDate })
    }
    render() {
        return (
            <div id="operations-container">
                <div id="input-container">
                    <input id='amount-input' value={this.state.amount} onChange={this.handleChange}></input>
                    <input id='vendor-input' value={this.state.vendor} onChange={this.handleChange}></input>
                    <input id='category-input' value={this.state.category} onChange={this.handleChange}></input>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DatePicker id="date-input" label="date" value={this.state.date} onChange={this.handleDateChange} />
                    </MuiPickersUtilsProvider>
                </div>

                {/* deposit added */}
                {/* expense added */}
                {/* invalid deposit */}
                {/* invalid withrawal */}
                {/* missing input */}
                {/* overdraft */}
                <Snackbar
                    message={this.state.message}
                    open={this.state.open}
                    onRequestClose={() => this.setState({ open: false })}
                    autoHideDuration={2000}
                />
                <div id="button-container">
                    <button id='deposit' onClick={this.handleClick}>Deposit</button>
                    <button id='withdraw' onClick={this.handleClick}>Withdraw</button>
                </div>
            </div>
        )
    }
}

export default Operations