import React from 'react';

class Accounts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accounts: []
        };
    }

    componentDidMount() {
        fetch("http://localhost:3001/accounts/select")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                this.setState({
                    accounts: res
                });
            });
    }

    render() {
        const { accounts } = this.state;
        console.log(accounts);
        if (accounts) {
            return (
                <div>
                    <h1>Accounts:</h1>
                    <ul>
                        {accounts.map(account => (
                            <li>
                                {account.id} {account.name}
                            </li>
                        ))}
                    </ul>
                </div>
            );
        } else {
            return (
                <p>Add an account!</p>
            )
        }

    }
}

export default Accounts;