import React from "react";
import TransactionTable from "./components/TransactionTable";
import AccountTable from "./components/AccountTable";
import CategoryTable from "./components/CategoryTable";
import AddAccount from "./components/AddAccount";
import "./App.css";
import AddCategory from "./components/AddCategory";
import AddTransaction from "./components/AddTransaction";

function App() {
  return (
    <div className="App">
      <div className="AppHeader">
        <h1>Omni-Life</h1>
      </div>
      <div className="sidebar">
        <h2>Categories</h2>
        <CategoryTable />
        <AddCategory />
        <h2>Accounts</h2>
        <AccountTable />
        <AddAccount />
      </div>
      <div className="content">
        <h2>Transactions</h2>
        <TransactionTable />
        <AddTransaction />
      </div>
    </div>
  );
}

export default App;
