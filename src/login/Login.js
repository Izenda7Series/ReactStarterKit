import React, { Component } from 'react';
import './Login.css';
import AuthService from '../services/AuthService';
import { Container, Form, Button } from 'react-bootstrap';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tenant: '',
      email: '',
      password: '',
      submitted: false,
      loading: false,
      error: ''
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
    return this.state.email.length > 0 && this.state.password.length > 0;
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
      return;
    }

    this.setState({ loading: true });
    this.login(tenant, username, password);
  }

  login(tenant, username, password) {
    this.authService.login(tenant, username, password)
      .then(result => {
        if (result) {
          // Login success
          this.props.history.push('/');
        }
      },
        error => {
          console.log('ERROR LOGGING IN: ' + error);
          this.setState({ loading: false });
        });
  }

  render() {
    //const { tenant, username, password, submitted, loading, error } = this.state;
    return (
      <Container>
        <Form onSubmit={this.handleSubmit}>
          <h3>Sign In</h3>
          <Form.Group>
            <Form.Label>Tenant</Form.Label>
            <Form.Control value={this.state.tenant} onChange={this.handleInputChange('tenant')} type="text" placeholder="Tenant Name" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control value={this.state.email} onChange={this.handleInputChange('email')} type="email" placeholder="Enter Email" />
            {this.state.submitted && !this.state.email &&
              <div><span>Email is required</span></div>
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
      </Container>
    );
  }
}

export default Login;