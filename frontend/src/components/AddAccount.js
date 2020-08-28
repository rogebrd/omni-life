import React from 'react';

class AddAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ accountName: event.target.accountName });
    }

    handleSubmit(event) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ account_name: this.state.accountName })
        };
        fetch('http://localhost:3001/accounts/add', requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    alert("Error adding Account!");
                }
            });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Account Name:
                    <input type="text" value={this.state.accountName} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddAccount;