import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';
import { Container, Form, Button, Row, Alert, Col } from 'react-bootstrap';
import { UserService } from '../services/UserService';
import { TenantService } from '../services/TenantService';

class CreateUser extends Component {
  constructor(props) {
    super(props);
    this.izIntegrate = new IzendaIntegrate();
    this.tenantService = new TenantService();
    this.userService = new UserService();
    this.state = {
      submitted: false,
      loading: false,
      error: '',
      message: '',
      validated: false,
      tenants: [],
      roles: [],
      users: [],
      tenant: undefined,
      selectedTenant: undefined,
      selectedRole: undefined,
      isAdmin: false,
      userID: '',
      firstName: '',
      lastName: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.tenantChanged = this.tenantChanged.bind(this);
  }

  componentDidMount() {
    this.loadTenants();
    this.loadRoles();
    this.loadUsers();
  }

  handleSubmit(event) {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
      this.setState({ error: 'Please fill out all required fields' });
      return;
    }
    this.setState({
      validated: true,
      submitted: true
    });
    const tenant = this.state.selectedTenant === undefined ? '' : this.state.selectedTenant.name;
    const role = this.state.selectedRole === undefined ? '' : this.state.selectedRole;
    const userId = this.state.userId;
    const isAdmin = this.state.isAdmin;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;

    if (!(userId && firstName && lastName)) {
      this.setState({ error: 'Please fill out all required fields' });
    }

    this.setState({ loading: true });
    this.userService.CreateUser(tenant, role, userId, isAdmin, firstName, lastName).then(result => {
      if (result) {
        this.setState({
          loading: false,
          message: 'User ' + userId + ' has been created successfully.',
          error: ''
        });
        this.loadUsers();
      } else {
        this.setState({
          loading: false,
          message: '',
          error: 'Failed to create a user, please try again'
        });
      }
    });
  }

  handleInputChange(property) {
    return e => {
      this.setState({
        [property]: e.target.value
      });
    };
  }

  onChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  loadTenants() {
    this.tenantService.GetAllTenants().then(result => {
      if (result && result.length > 0) {
        this.setState({ tenants: result });
      }
    });
  }

  loadRoles() {
    this.tenantService.GetRoles(this.state.selectedTenant).then(result => {
      if (result && result.length > 0) {
        this.setState({ roles: result });
      }
    });
  }

  loadUsers() {
    this.userService.LoadUsers(this.state.selectedTenant).then(result => {
      if (result && result.length > 0) {
        this.setState({ users: result });
      }
    });
  }

  tenantChanged(e) {
    const values = e.target.value.split(',');
    if (values.length != 2) {
      this.setState({
        selectedTenant: undefined,
        tenant: e.target.value
      }, loadOptions);
    } else {
      this.setState({
        selectedTenant: {
          id: values[0],
          name: values[1]
        },
        tenant: e.target.value
      }, loadOptions);
    }
    function loadOptions() {
      this.loadRoles();
      this.loadUsers();
    }
  }

  tenantSelect() {
    const tenants = this.state.tenants;
    if (tenants.length > 0) {
      return (tenants.map((option) => <option key={option.name} value={[option.id, option.name]}>{option.name}</option>));
    }
  }

  roleSelect() {
    const roles = this.state.roles;
    if (roles.length > 0) {
      return (roles.map((option, index) => <option key={index} value={option.obj}>{option.name}</option>));
    }
  }

  adminCheckBox() {
    if (this.state.selectedTenant === undefined) {
      return (
        <Form.Group>
          <Form.Label>Is Admin</Form.Label>
          <Form.Check value={this.state.isAdmin} onChange={this.handleInputChange('isAdmin')} />
        </Form.Group>
      );
    }
  }

  usersList() {
    const users = this.state.users;
    if (users.length > 0) {
      return (
        <ul style={{ maxHeight: '350px', overflowY: 'auto' }}>
          {
            users.map(el => <li key={el.name}>{el.name} ({el.active ? 'active' : 'inactive'})</li>)
          }
        </ul>
      )
    } else {
      return <h5>No Users found</h5>;
    }
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
        <Row>
          <Col md={8}>
            <h2>Create User</h2>
            <h4>Create a new user</h4>
            <hr />
            <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Tenant</Form.Label>
                <br />
                <Form.Control as="select" value={this.state.tenant} onChange={(e) => this.tenantChanged(e)} custom>
                  <option value={undefined}>Select tenant</option>
                  {this.tenantSelect()}
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>Selected Role</Form.Label>
                <br />
                <Form.Control as="select" value={this.state.selectedRole} onChange={this.handleInputChange('selectedRole')} custom>
                  <option value={undefined}>Select role</option>
                  {this.roleSelect()}
                </Form.Control>
              </Form.Group>
              {this.adminCheckBox()}
              <Form.Group controlId="validationCustom1">
                <Form.Label>User ID</Form.Label>
                <Form.Control value={this.state.userId} onChange={this.handleInputChange('userId')} type="text" placeholder="user@company.com" required />
                <Form.Control.Feedback type="invalid">Please enter a User ID</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom2">
                <Form.Label>First Name</Form.Label>
                <Form.Control value={this.state.firstName} onChange={this.handleInputChange('firstName')} type="text" placeholder="First Name" required />
                <Form.Control.Feedback type="invalid">Please enter a First Name</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationCustom3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control value={this.state.lastName} onChange={this.handleInputChange('lastName')} type="text" placeholder="Last Name" required />
                <Form.Control.Feedback type="invalid">Please enter a Last Name</Form.Control.Feedback>
              </Form.Group>
              <Button type="submit" >Submit</Button>
              <div>{this.showAlerts()}</div>
            </Form>
          </Col>
          <Col md={4}>
            <div>
              <h4>Further Instruction</h4>
              <hr />
              <p>If you want to add &quot;Description&quot; or enable a Module(s) to a newly created user, please go to Settings → User Setup and update it.</p>
            </div>
            <div>
              <h4>Users</h4>
              <hr />
              {this.usersList()}
            </div>
          </Col>
        </Row>
      </Container >
    );
  }
}

export default CreateUser;