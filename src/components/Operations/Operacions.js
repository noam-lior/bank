import React, { Component } from 'react';

class Operations extends Component {
    constructor(){
        super()
        this.state={
            amount:0,
            vendor:"Vendor",
            category:"Category"
        }
    }

    handleClick=e=>{
        
    }
    render(){
        return(
            <div id="operations-container">
                <div id="input-container">
                    <input id='amount-input' value={this.state.amount}></input>
                    <input id='vendor-input'value={this.state.vendor}></input>
                    <input id='category-input' value={this.state.category}></input>
                </div>
                <div id="button-container">
                    <button id='deposit' onClick={this.handleClick}>Deposit</button>
                    <button id='withdraw' onClick={this.handleClick}>Withdraw</button>
                </div>
            </div>
        )
    }
}

export default Operations