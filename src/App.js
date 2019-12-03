import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'

import Transactions from './components/Transactions/Transactions'
import Operations from './components/Operations/Operations'
import './App.css';
class App extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      transactions: [],
      categories: { all:1, a: 1 }
    }
  }

  componentDidMount = async () => {
    const response= await axios.get('http://localhost:8990/transactions')
    const transaction=response.data
    this.setState({ transactions:transaction })
  }
  
  addTransaction = async (data) => {
    const newBalance = this.state.balance + data.amount
    await axios.post('http://localhost:8990/transaction', data)
    const newTransactions = await axios.get('http://localhost:8990/transactions')
    const newCategories = { ...this.state.categories }
    if (newCategories[data.category])
      newCategories[data]++
    else
      newCategories[data] = 1
    this.setState({
      transactions: newTransactions,
      balance: newBalance,
      categories: newCategories,
    })

  }

  removeTransaction = async (transaction) => {
    const newBalance = this.state.balance - transaction.amount
    await axios.delete('http://localhost:8990/transaction', transaction)
    const newTransactions = await axios.get('http://localhost:8990/transactions')
    const newCategories = { ...this.state.categories }
    if (newCategories[transaction.category] > 0)
      newCategories[transaction.category]--

    this.setState({
      transactions: newTransactions,
      balance: newBalance,
      categories: newCategories
    })

  }

  balanceSize = () => {
    const BALANCE_TRESHOLD = 500
    return this.state.balance < BALANCE_TRESHOLD ? 'low-balance' : 'high-balance'
  }
  render() {
    return (
      <Router>
        <div id='app'>
          <div id='app-link'>
            <Link to="/transactions">Transactions</Link>
            <Link to="/">Operations</Link>
          </div>
          <div id={`balance ${this.balanceSize}`}>Balance - ${this.state.balance}</div>
          <Route path='/transactions'
            exact render={() => <Transactions categories={this.state.categories} balance={this.state.balance} transactions={this.state.transactions} removeTransaction={this.removeTransaction} />}>
          </Route>
          <Route path='/' exact render={() => <Operations addTransaction={this.addTransaction} />}></Route>
        </div>
      </Router>
    )
  }
}

export default App;
