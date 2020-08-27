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
        console.log(event);
        event.preventDefault();
    }

    render() {
        return (
            <form action={this.handleSubmit}>
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