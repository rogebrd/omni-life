import React from 'react';
import Transaction from './Transaction';
import axios from '../utils/Api';

class TransactionTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount() {
    axios.get('transactions/select').then((res) => {
      this.setState({
        transactions: res.data,
      });
    });
  }

  render() {
    const { transactions } = this.state;
    if (transactions) {
      return (
        <table>
          <thead>
            <tr>
              <td>Transaction Id</td>
              <td>Date</td>
              <td>Account Id</td>
              <td>Category Id</td>
              <td>Vendor</td>
              <td>Amount</td>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <Transaction key={transaction.id} transaction={transaction} />
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div>No Transactions found! Add a new one</div>;
    }
  }
}

export default TransactionTable;
