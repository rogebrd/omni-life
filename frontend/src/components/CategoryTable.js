import React from 'react';
import Category from './Category';
import axios from '../utils/Api';

class CategoryTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios.get('categories/select').then((res) => {
      this.setState({
        categories: res.data,
      });
    });
  }

  render() {
    const { categories } = this.state;
    if (categories) {
      return (
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <Category key={category.id} category={category} />
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div>No categories found! Add a new one</div>;
    }
  }
}

export default CategoryTable;
