import React from "react";
import Account from "./Account";
import axios from "../utils/Api";

class AccountTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      accounts: [],
    };
  }

  componentDidMount() {
    axios.get("accounts/select").then((res) => {
      this.setState({
        accounts: res.data,
      });
    });
  }

  render() {
    const { accounts } = this.state;
    if (accounts) {
      return (
        <table>
          <thead>
            <tr>
              <td>Id</td>
              <td>Name</td>
              <td>Type</td>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <Account key={account.id} account={account} />
            ))}
          </tbody>
        </table>
      );
    } else {
      return <div>No Accounts found! Add a new one</div>;
    }
  }
}

export default AccountTable;
