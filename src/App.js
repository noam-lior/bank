import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import TransactionByCategory from './components/TransactionByCategory/TransactionByCategory'
import Transactions from './components/Transactions/Transactions'
import Operations from './components/Operations/Operations'
import './App.css'
class App extends Component {
  constructor() {
    super()
    this.state = {
      balance: 0,
      transactions: [],
      categories: { all: 1, a: 1 },
      currentCategory: "all",
      filteredData:[]
    }
  }

  componentDidMount = async () => {
    const response = await axios.get('http://localhost:8990/transactions')
    const transaction = response.data
    // const categories=transaction.catego
    const balance = transaction.map(t => t.amount).reduce((total, num) => total + num, 0)
    this.setState({ transactions: transaction, balance })
  }

  addTransaction = async (data) => {

    const newBalance = this.state.balance + parseInt(data.amount)
    await axios.post('http://localhost:8990/transaction', data)
    let newTransactions = await axios.get('http://localhost:8990/transactions')
    newTransactions=newTransactions.data
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
    await axios.delete('http://localhost:8990/transaction', {data:{transaction}})
    const response = await axios.get('http://localhost:8990/transactions')
    const newTransactions=response.data
    const newCategories = { ...this.state.categories }
    if (newCategories[transaction.category] > 0)
      newCategories[transaction.category]--
    await this.setState({
      transactions: newTransactions,
      balance: newBalance,
      categories: newCategories
    })

  }

  balanceSize = () => {
    const BALANCE_TRESHOLD = 500
    return this.state.balance < BALANCE_TRESHOLD ? 'low-balance' : 'high-balance'
  }

  handleCategoryChange = (newCategory) => {
    this.setState({
      currentCategory: newCategory
    })
  }

  handleFilter = async path => {
    const response = await axios.get(`http://localhost:8990${path}`)
    console.log(response.data)
    this.setState({
      filteredData:response.data
    })
  } 

   render() {
    return (
      <Router>
        <div id='app'>
          <div id='app-link'>
            <Link to="/transactions">Transactions</Link>
            <Link to="/">Operations</Link>
          </div>
          <div id="balance" className={`${this.balanceSize}`}>Balance : ${this.state.balance}</div>
          <Route path='/transactions'
            exact render={() => <Transactions
              categories={this.state.categories}
              balance={this.state.balance}
              transactions={this.state.transactions}
              removeTransaction={this.removeTransaction}
              handleFilter={this.handleFilter}
            />}>
          </Route>
          <Route path='/' exact render={() => <Operations balance={this.state.balance} addTransaction={this.addTransaction} />}></Route>
          <Route path={`/transactions/:category`}
            exact render={({ match, location }) => <TransactionByCategory
              removeTransaction={this.removeTransaction}
              match={match}
              transactions={this.state.filteredData} />}>
          </Route>
          {/* transactions={await this.handleFilter(match, location)} */}
        </div>
      </Router>
    )
  }
}

export default App;
