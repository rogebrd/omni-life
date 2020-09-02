import React from 'react';

class Category extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: props.category,
    };
  }

  render() {
    const { category } = this.state;
    return (
      <tr>
        <td>{category.id}</td>
        <td>{category.name}</td>
      </tr>
    );
  }
}

export default Category;
