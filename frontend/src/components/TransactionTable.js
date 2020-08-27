import React from 'react';
import Transaction from './Transaction';

class TransactionTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transactions: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3001/transactions/select")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    transactions: res
                });
            });
    }

    render() {
        const { transactions } = this.state;
        if (transactions) {
            return (
                <table>
                    <tr>
                        <td>
                            Transaction Id
                        </td>
                        <td>
                            Date
                        </td>
                        <td>
                            Account Id
                        </td>
                        <td>
                            Category Id
                        </td>
                        <td>
                            Vendor
                        </td>
                        <td>
                            Amount
                        </td>
                    </tr>
                    {transactions.map(transaction => (
                        <Transaction transaction={transaction} />
                    ))}
                </table>
            );
        }
    }
}

export default TransactionTable;