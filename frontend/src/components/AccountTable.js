import React from 'react';
import Account from './Account';

class AccountTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        }
    }

    componentDidMount() {
        fetch("http://localhost:3001/accounts/select")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    accounts: res
                });
            });
    }

    render() {
        const { accounts } = this.state;
        if (accounts) {
            return (
                <table>
                    <thead>
                        <tr>
                            <td>
                                Id
                            </td>
                            <td>
                                Name
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {accounts.map(account => (
                            <Account key={account.id} account={account} />
                        ))}
                    </tbody>
                </table>
            );
        } else {
            return (
                <div>
                    No Accounts found! Add a new one
                </div>
            );
        }
    }
}

export default AccountTable;