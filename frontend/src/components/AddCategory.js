import React from 'react';

class AddCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categoryName: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ categoryName: event.target.categoryName });
    }

    handleSubmit(event) {
        alert(this)
        event.preventDefault();
    }

    render() {
        return (
            <form action={this.handleSubmit}>
                <label>
                    Category Name:
                    <input type="text" value={this.state.categoryName} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
}

export default AddCategory;