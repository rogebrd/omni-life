import React from 'react';

class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            account: props.account
        };
    }

    render() {
        const { account } = this.state;
        return (
            <tr>
                <td>
                    {account.id}
                </td>
                <td>
                    {account.name}
                </td>
            </tr>
        );
    }
}

export default Account;