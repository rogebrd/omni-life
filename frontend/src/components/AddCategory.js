import React from 'react';
import axios from '../utils/Api';

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
        this.setState({ categoryName: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();
        axios.post('categories/add', { category_name: this.state.categoryName })
            .then(response => {
                if (response.status !== 200) {
                    alert("Error adding Category!");
                }
            });
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