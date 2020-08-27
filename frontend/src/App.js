import React from 'react';
import TransactionTable from './components/TransactionTable';
import AddAccount from './components/AddAccount';
import './App.css';
import AddCategory from './components/AddCategory';
import AddTransaction from './components/AddTransaction';

function App() {
  return (
    <div className="App">
      <TransactionTable />
      <div>
        <AddAccount />
        <AddCategory />
        <AddTransaction />
      </div>
    </div>
  );
}

export default App;
