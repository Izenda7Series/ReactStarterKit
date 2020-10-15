import React, { Component } from 'react';
import './Login.css';
import AuthService from '../services/AuthService';
import { Container, Form, Button, Alert } from 'react-bootstrap';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenant: '',
      username: '',
      password: '',
      submitted: false,
      loading: false,
      error: '',
      message: ''
    };

    //this.onChange = this.onChange.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    this.authService = new AuthService();

    if (this.authService.hasToken()) {
      this.authService.logout();
    }
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleInputChange(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const { tenant, username, password } = this.state;

    //stop here if form is invalid
    if (!(username && password)) {
      this.setState({ loading: false, submitted: false, error: 'Username and Login are required' });
    }
    this.setState({ loading: true });
    this.login(tenant, username, password);
  }

  login(tenant, username, password) {
    this.authService.login(tenant, username, password)
      .then(result => {
        if (result) {
          // Login success
          this.setState({ loading: false, message: 'Login Success!' })
          this.props.history.push('/home');
        } else {
          console.log('ERROR LOGGING IN');
          this.setState({ loading: false, error: 'Login failed for user: ' + username + '.' });
        }
      }, error => {
        console.log('ERROR LOGGING IN: ' + error);
        this.setState({ loading: false, error: 'Login failed for user: ' + username + '.' });
      });
  }

  showAlerts() {
    const hasError = this.state.error;
    const hasMessage = this.state.message;
    if (hasError) {
      return (<div><hr /><Alert variant="danger">{this.state.error}</Alert></div>);
    } else if (hasMessage) {
      return (<div><hr /><Alert variant="success">{this.state.message}</Alert></div>);
    }
  }

  render() {
    return (
      <Container style={{ padding: '1em' }}>
        <Form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>
          <Form.Group>
            <Form.Label>Tenant</Form.Label>
            <Form.Control value={this.state.tenant} onChange={this.handleInputChange('tenant')} type="text" placeholder="Tenant Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Username</Form.Label>
            <Form.Control value={this.state.username} onChange={this.handleInputChange('username')} type="text" placeholder="Enter username" />
            {this.state.submitted && !this.state.username &&
              <div><span>username is required</span></div>
            }
          </Form.Group>
          <Form.Group>
            <Form.Label>Password</Form.Label>
            <Form.Control value={this.state.password} onChange={this.handleInputChange('password')} type="password" placeholder="Password" />
            {this.state.submitted && !this.state.password &&
              <div><span>Password is required</span></div>
            }
          </Form.Group>
          <Button type="submit" disabled={this.state.loading}>Submit</Button>
        </Form>
        {this.showAlerts()}
      </Container>
    );
  }
}

export default Login;