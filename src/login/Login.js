import React, { Component } from 'react';
import './Login.css';
import AuthService from '../services/AuthService';


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
    const { tenant, username, password} = this.state;

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
          console.log('ERROR LOGGING IN: '+ error);
          this.setState({ loading: false });
        });
  }

  render() {
    //const { tenant, username, password, submitted, loading, error } = this.state;
    return (
      <div className='Login'>
        <form name="form" onSubmit={this.handleSubmit}>
          <div>
            <label>Tenant</label>
            <input value={this.state.tenant} placeholder="Enter Tenant (Optional)" type="text" onChange={this.handleInputChange('tenant')} />
          </div>
          <br />
          <div>
            <label>Email/Username</label>
            <input value={this.state.username} required type="email" placeholder="Enter email" onChange={this.handleInputChange('username')} />
            {this.state.submitted && !this.state.username &&
              <div className="help-block">Email/Username is required</div>
            }
          </div>
          <br />
          <div>
            <label>Password</label>
            <input value={this.state.password} required type="password" placeholder="Password" onChange={this.handleInputChange('password')} />
            {this.state.submitted && !this.state.password &&
              <div className="help-block">Password is required</div>
            }
          </div>
          <br />
          <button type="submit" disabled={this.state.loading}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;