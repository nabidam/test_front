import React from "react";
import axios from "axios";
import "./App.css";

const apiClient = axios.create({
  // baseURL: 'http://localhost:8000',
  withCredentials: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mobile_number: "",
      code: "",
    };

    this.handleChangeMobile = this.handleChangeMobile.bind(this);
    this.handleChangeCode = this.handleChangeCode.bind(this);
    this.handleSubmitMobile = this.handleSubmitMobile.bind(this);
    this.handleSubmitCode = this.handleSubmitCode.bind(this);
    this.logout = this.logout.bind(this);
    this.getTickets = this.getTickets.bind(this);
    this.getMe = this.getMe.bind(this);
  }

  // componentDidMount = () => {

  //   axios.defaults.withCredentials = true
  //   axios.defaults.baseURL = 'http://localhost:8000/'
  // }

  handleChangeMobile(event) {
    this.setState({ mobile_number: event.target.value });
  }

  handleChangeCode(event) {
    this.setState({ code: event.target.value });
  }

  handleSubmitMobile(event) {
    apiClient.get("http://localhost:8000/api/csrf-cookie").then((response) => {
      console.log(response);
      apiClient
        .post("http://localhost:8000/api/auth/login", {
          mobile_number: this.state.mobile_number,
        })
        .then((res) => {
          console.log(res);
        });
    });

    event.preventDefault();
  }

  handleSubmitCode(event) {
    apiClient.get("http://localhost:8000/api/csrf-cookie").then((response) => {
      console.log(response);
      apiClient
        .post("http://localhost:8000/api/auth/login/validate", {
          mobile_number: this.state.mobile_number,
          verification_code: this.state.code,
        })
        .then((res) => {
          console.log(res);
        });
    });

    event.preventDefault();
  }

  getTickets() {
    apiClient.get("http://localhost:8000/api/tickets/tickets").then((res) => {
      console.log(res.data);
    });
  }

  getMe() {
    apiClient.get("http://localhost:8000/api/auth/check-login").then((res) => {
      console.log(res.data);
    });
  }

  logout() {
    apiClient.post("http://localhost:8000/api/auth/logout").then((res) => {
      console.log(res);
    });
  }

  render() {
    return (
      <div className="App">
        <form id="login-form" onSubmit={this.handleSubmitMobile}>
          <label htmlFor="mobile_number">Mobile Number</label>
          <input
            type="text"
            name="mobile_number"
            id="mobile_number"
            value={this.state.suername}
            onChange={this.handleChangeMobile}
          />
          <button type="submit">Send verification code</button>
        </form>
        <form id="login-form" onSubmit={this.handleSubmitCode}>
          <label htmlFor="code">Mobile Number</label>
          <input
            type="text"
            name="code"
            id="code"
            value={this.state.code}
            onChange={this.handleChangeCode}
          />
          <button type="submit">login</button>
        </form>
        <button type="button" onClick={this.getTickets}>
          log tickets
        </button>
        <button type="button" onClick={this.getMe}>
          log me
        </button>
        <button type="button" onClick={this.logout}>
          logout
        </button>
      </div>
    );
  }
}

export default App;
