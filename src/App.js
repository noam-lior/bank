import React, { Component } from 'react';
import Transactions from './components/Transactions/Transactions'
import Operations from './components/Operations/Operacions'
import './App.css';

class App extends Component {
  constructor() {
    super()
    this.state = {
      balance: 400,
      transactions: [
        { amount: 3200, vendor: "Elevation", category: "Salary" },
        { amount: -7, vendor: "Runescape", category: "Entertainment" },
        { amount: -20, vendor: "Subway", category: "Food" },
        { amount: -98, vendor: "La Baguetterie", category: "Food" }
      ]
    }
  }

  render() {
    return (
      <div id='app'>
        <Transactions balance={this.state.balance} transactions={this.state.transactions} />
        <Operations />
      </div>
    )
  }
}

export default App;
