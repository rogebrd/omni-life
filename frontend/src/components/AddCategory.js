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
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ category_name: this.state.categoryName })
        };
        fetch('http://localhost:3001/categories/add', requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    alert("Error adding Category!");
                }
            });
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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