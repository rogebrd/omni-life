import React from 'react';

class Transaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            transaction: props.transaction
        };
    }

    render() {
        const { transaction } = this.state;
        return (
            <tr>
                <td>
                    {transaction.id}
                </td>
                <td>
                    {transaction.date}
                </td>
                <td>
                    {transaction.account_id}
                </td>
                <td>
                    {transaction.category_id}
                </td>
                <td>
                    {transaction.vendor}
                </td>
                <td>
                    {transaction.amount}
                </td>
            </tr>
        );
    }
}

export default Transaction;