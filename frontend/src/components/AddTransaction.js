import React from 'react';
import axios from '../utils/Api';

class AddTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            accountId: 0,
            categoryId: 0,
            vendor: '',
            amount: 0.0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            date: event.target.date,
            accountId: event.target.accountId,
            categoryId: event.target.categoryId,
            vendor: event.target.vendor,
            amount: event.target.amount
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('transactions/add', {
            date: this.state.date.toISOString(),
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
                    <input type="date" value={this.state.date} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Account Id:
                    <input type="number" value={this.state.accountId} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Category Id:
                    <input type="number" value={this.state.categoryId} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Vendor:
                    <input type="text" value={this.state.vendor} onChange={this.handleChange} />
                </label>
                <label>
                    Transaction Amount:
                    <input type="number" value={this.state.amount} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddTransaction;