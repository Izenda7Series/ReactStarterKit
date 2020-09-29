import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

import { Container, Form, Button } from 'react-bootstrap';
import { TenantService } from '../services/TenantService';



class CreateTenant extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};

    
        this.state = {
            
            name: '',
            description: '',
            submitted: false,
            loading: false,
            error: ''
           
          };


          this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

    }
    componentDidMount() {
        this.dom = this.render();
    }
    componentWillUnmount() {
        this.DestroyDom(this.dom);
    }



    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const name = this.state.name;
        const description = this.state.description;
    
        //stop here if form is invalid
        if (!(name && description)) {
          return;
        }
    
        this.setState({ loading: true });
        var a = new TenantService();
        a.CreateTenant(name, description);
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
        return (
            <Container>
                <Form onSubmit={this.handleSubmit}>
                <h3>Create Tenant</h3>
               

                <Form.Group>
                    <Form.Label>Tenant Name</Form.Label>
                    <Form.Control  value={this.state.name} onChange={this.handleInputChange('name')} type="text" placeholder="Tenant Name" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Description</Form.Label>
                    <Form.Control  value={this.state.description} onChange={this.handleInputChange('description')} type="text" placeholder="Description" />
                </Form.Group>

                <Button type="submit" >Submit</Button>
              </Form>
            </Container>
          );
    }
}

export default CreateTenant;