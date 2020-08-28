import React from 'react';
import TransactionTable from './components/TransactionTable';
import AccountTable from './components/AccountTable';
import CategoryTable from './components/CategoryTable';
import AddAccount from './components/AddAccount';
import './App.css';
import AddCategory from './components/AddCategory';
import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <div className="App">
      <div>
        <h1>Transactions</h1>
        <TransactionTable />
        <AddTransaction />
      </div>
      <div>
        <h1>Categories</h1>
        <CategoryTable />
        <AddCategory />
      </div>
      <div>
        <h1>Accounts</h1>
        <AccountTable />
        <AddAccount />
      </div>
    </div>
  );
}

export default App;
