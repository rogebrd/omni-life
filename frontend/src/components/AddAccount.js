import React from 'react';
import axios from '../utils/Api';

class AddAccount extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountName: '',
            accountType: 1
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('accounts/add', { account_name: this.state.accountName, account_type: this.state.accountType })
            .then(response => {
                if (response.status !== 200) {
                    alert("Error adding Account!");
                }
            });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Account Name:
                    <input type="text" name="accountName" value={this.state.accountName} onChange={this.handleChange} />
                </label>
                <label>
                    Account Type:
                    <input type="number" name="accountType" value={this.state.accountType} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddAccount;