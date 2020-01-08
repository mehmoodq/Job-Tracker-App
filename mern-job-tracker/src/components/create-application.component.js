import React, { Component } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class CreateApplication extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeCompany = this.onChangeCompany.bind(this);
    this.onChangePosition = this.onChangePosition.bind(this);
    this.onChangeApplicationDate = this.onChangeApplicationDate.bind(this);
    this.onChangeSalary = this.onChangeSalary.bind(this);
    this.onChangeStatus = this.onChangeStatus.bind(this);
    this.onChangeJobLink = this.onChangeJobLink.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: "",
      company: "",
      position: "",
      applicationDate: new Date(),
      salary: 0,
      status: "",
      jobLink: "",
      users: []
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/users").then(response => {
      if (response.data.length > 0) {
        this.setState({
          users: response.data.map(user => user.username),
          username: response.data[0].username
        });
      }
    });
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeCompany(e) {
    this.setState({
      company: e.target.value
    });
  }

  onChangePosition(e) {
    this.setState({
      position: e.target.value
    });
  }

  onChangeApplicationDate(date) {
    this.setState({
      applicationDate: date
    });
  }

  onChangeSalary(e) {
    this.setState({
      salary: e.target.value
    });
  }

  onChangeStatus(e) {
    this.setState({
      status: e.target.value
    });
  }

  onChangeJobLink(e) {
    this.setState({
      jobLink: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const application = {
      username: this.state.username,
      company: this.state.company,
      position: this.state.position,
      applicationDate: this.state.applicationDate,
      salary: this.state.salary,
      status: this.state.status,
      jobLink: this.state.jobLink
    };

    console.log(application);

    axios
      .post("http://localhost:5000/applications/add", application)
      .then(res => console.log(res.data));

    window.location = "/";
  }

  render() {
    return (
      <div>
        <h3>Create New Application Log</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <select
              ref="userInput"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            >
              {this.state.users.map(function(user) {
                return (
                  <option key={user} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="form-group">
            <label>Company: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.company}
              onChange={this.onChangeCompany}
            />
          </div>
          <div className="form-group">
            <label>Position: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.position}
              onChange={this.onChangePosition}
            />
          </div>
          <div className="form-group">
            <label>Application Date: </label>
            <div>
              <DatePicker
                selected={this.state.applicationDate}
                onChange={this.onChangeApplicationDate}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Salary: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.salary}
              onChange={this.onChangeSalary}
            />
          </div>
          <div className="form-group">
            <label>Status: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.status}
              onChange={this.onChangeStatus}
            />
          </div>
          <div className="form-group">
            <label>Job Link: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.jobLink}
              onChange={this.onChangeJobLink}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create Application Log"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}
