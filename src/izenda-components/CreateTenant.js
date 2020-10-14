import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap';
import { TenantService } from '../services/TenantService';
import '../index.css';

class CreateTenant extends Component {
  constructor(props) {
    super(props);
    this.izIntegrate = new IzendaIntegrate();
    this.dom = {};
    this.state = {
      id: '',
      name: '',
      description: '',
      submitted: false,
      loading: false,
      message: '',
      error: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.dom = this.render();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ submitted: true });
    const id = this.state.id;
    const myname = this.state.name;
    //stop here if form is invalid
    if (!(id && myname)) {
      this.setState({ error: 'TenantId and Tenant Name is required' })
      return;
    }
    this.setState({ loading: true });
    const tenantService = new TenantService();
    tenantService.CreateTenant(id, myname).then(result => {
      if (result) {
        this.setState({
          loading: false,
          message: 'Tenant has been created successfully',
          error: ''
        });
      } else {
        this.setState({
          loading: false,
          error: 'Could not create tenant',
          message: ''
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


  render() {
    const hasError = this.state.error;
    const hasMessage = this.state.message;
    let alerts;
    if (hasError) {
      alerts = (<div><hr /><Alert variant="danger">{this.state.error}</Alert></div>);
    } else if (hasMessage) {
      alerts = (<div><hr /><Alert variant="success">{this.state.message}</Alert></div>);
    }

    return (
      <Container fluid className="form-container">
        <Row>
          <Col md={8}>
            <h2>Create Tenant</h2>
            <h4>Create a new tenant</h4>
            <hr />
            <Form onSubmit={this.handleSubmit}>
              <Form.Group>
                <Form.Label>Tenant ID</Form.Label>
                <Form.Control value={this.state.id} onChange={this.handleInputChange('id')} type="text" placeholder="Tenant ID" />
              </Form.Group>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control value={this.state.name} onChange={this.handleInputChange('name')} type="text" placeholder="Tenant Name" />
              </Form.Group>
              <Button type="submit" >Submit</Button>
              <div>{alerts}</div>
            </Form>
          </Col>
          <Col md={4}></Col>
        </Row>
      </Container>
    );
  }
}

export default CreateTenant;