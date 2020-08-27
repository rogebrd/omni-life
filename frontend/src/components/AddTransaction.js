import React from 'react';

class AddTransaction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: null,
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
        alert(event);
        event.preventDefault();
    }

    render() {
        return (
            <form action={this.handleSubmit}>
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