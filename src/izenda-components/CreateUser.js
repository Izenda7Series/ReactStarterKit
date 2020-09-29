import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

import { Container, Form, Button } from 'react-bootstrap';
import { UserService } from '../services/UserService';



class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};

    
        this.state = {
            
            username: '',
            password: '',
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
        const username = this.state.username;
        const password = this.state.password;
    
        //stop here if form is invalid
        if (!(username && password)) {
          return;
        }
    
        this.setState({ loading: true });
        var a = new UserService();
        a.createUser(username, password);
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
                <h3>Create User</h3>
               

                <Form.Group>
                    <Form.Label>Username</Form.Label>
                    <Form.Control  value={this.state.username} onChange={this.handleInputChange('username')} type="text" placeholder="User Name" />
                </Form.Group>

               
                <Form.Group>
                    <Form.Label>Password</Form.Label>
                    <Form.Control value={this.state.password} onChange={this.handleInputChange('password')} type="password" placeholder="Password" />
                </Form.Group>


                <Button type="submit" >Submit</Button>
              </Form>
            </Container>
          );
    }
}

export default CreateUser;