import React, { Component } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import Snackbar from '@material-ui/core/Snackbar';
import Button from '@material-ui/core/Button';

import './Operations.css'
class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: null,
            vendor: "",
            category: "",
            date: new Date(),
            open: false,
            message: ""
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
    handleClick = async (e) => {
        const currentDate = new Date()
        const transactionData = { amount: this.state.amount, vendor: this.state.vendor, category: this.state.category, date: currentDate }
        if (await this.renderSnackBar(e.target.id, transactionData))
            this.props.addTransaction(transactionData)
    }

    renderSnackBar(id, input) {
        let message = ""
        let error = true
        if (!(input.amount && input.category && input.vendor))
            message = "Invalid input. Deposit amount must be positive"
        else if (id === "deposit" && input.amount <= 0)
            message = "Invalid input. Deposit amount must be positive"
        else if (id === "withdraw" && input.amount >= 0)
            message = "Invalid input. withdrawal amount must be entered as a negative number"
        else if (this.props.balance < -input.amount)
            message = "Overdraft! You cannot withdraw more money than you have in your account"
        else {
            message = `${id} added`
            error = false;
        }
        this.setState({
            message,
            error,
            open: true
        })
        return !error
    }

    formatData=(date)=>{
       return this.props.formatData(date)
    }
    handleDateChange = newDate => {
        this.setState({ date: this.formatDate(newDate) })
    }
    render() {
        return (
            <div id="operations-container">
                
                <div id="input-container">
                    <span>Amount:</span><input id='amount-input' value={this.state.amount} onChange={this.handleChange}></input>
                    <span>Vendor:</span><input id='vendor-input' value={this.state.vendor} onChange={this.handleChange}></input>
                    <span>Category:</span><input id='category-input' value={this.state.category} onChange={this.handleChange}></input>
                    <span>Date:</span>

                    <div id="date-input">
                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <DatePicker id="date-input" value={this.state.date} onChange={this.handleDateChange} />
                        </MuiPickersUtilsProvider>
                    </div>
                    
                    <div id="button-container">
                        <Button id='deposit' variant="contained" onClick={this.handleClick}>Deposit</Button>
                        <Button id='withdraw' variant="contained" onClick={this.handleClick}>Withdraw</Button>
                    </div>
                </div>

                <Snackbar
                    message={this.state.message}
                    open={this.state.open}
                    onClick={() => this.setState({ open: false })}
                    autoHideDuration={2000}
                    action="Retry"
                />

            </div>
        )
    }
}

export default Operations