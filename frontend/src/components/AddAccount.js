import React from 'react';
import axios from '../utils/Api';

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
        this.setState({ accountName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('accounts/add', { account_name: this.state.accountName })
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
                    <input type="text" value={this.state.accountName} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddAccount;