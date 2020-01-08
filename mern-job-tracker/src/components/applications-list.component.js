import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Application = props => (
  <tr>
    <td>{props.application.username}</td>
    <td>{props.application.company}</td>
    <td>{props.application.position}</td>
    <td>{props.application.applicationDate.substring(0, 10)}</td>
    <td>{props.application.salary}</td>
    <td>{props.application.status}</td>
    <td>{props.application.jobLink}</td>
    <td>
      <Link to={"/edit/" + props.application._id}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.deleteApplication(props.application._id);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class ApplicationsList extends Component {
  constructor(props) {
    super(props);
    this.deleteApplication = this.deleteApplication.bind(this);

    this.state = { applications: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/applications/")
      .then(response => {
        this.setState({ applications: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteApplication(id) {
    axios
      .delete("http://localhost:5000/applications/" + id)
      .then(res => console.log(res.data));

    this.setState({
      applications: this.state.applications.filter(el => el._id !== id)
    });
  }

  applicationList() {
    return this.state.applications.map(currentapplication => {
      return (
        <Application
          application={currentapplication}
          deleteApplication={this.deleteApplication}
          key={currentapplication._id}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h3>Logged Applications</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Company</th>
              <th>Position</th>
              <th>Application Date</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Job Link</th>
            </tr>
          </thead>
          <tbody>{this.applicationList()}</tbody>
        </table>
      </div>
    );
  }
}
