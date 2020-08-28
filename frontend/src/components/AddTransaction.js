import React from 'react';
import axios from '../utils/Api';

class AddTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            accountId: 0,
            categoryId: 0,
            vendor: '',
            amount: 0.0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
        axios.post('transactions/add', {
            date: new Date(this.state.date).toISOString(),
            account_id: this.state.accountId,
            category_id: this.state.categoryId,
            vendor: this.state.vendor,
            amount: this.state.amount
        }).then(response => {
            if (response.status !== 200) {
                alert("Error adding Transaction!");
            }
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Transaction Date:
                    <input type="date" name="date" value={this.state.date} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Account Id:
                    <input type="number" name="accountId" value={this.state.accountId} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Category Id:
                    <input type="number" name="categoryId" value={this.state.categoryId} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Vendor:
                    <input type="text" name="vendor" value={this.state.vendor} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Amount:
                    <input type="number" name="amount" value={this.state.amount} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddTransaction;