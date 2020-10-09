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
          isadmin:false,
            FirstName:'',
            LastName:'',
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

  
  

        fetch("http://localhost:3358/tenant/allTenants")
    .then((response) => {
      return response.json();
    })
    .then(data => {
      let teamsFromApi = data.map(team => {
        return {value: team, display: team}
      });
      this.setState({
        teams: [{value: '', display: '(Select your favourite team)'}].concat(teamsFromApi)
      });
    }).catch(error => {
      console.log(error);
    });



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
          //return;
        }
    
        this.setState({ loading: true });
        var a = new UserService();
        a.createUser(username, password,this.state.FirstName,this.state.LastName);
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
                    <Form.Label>Selected Role</Form.Label>
                    <br/>
                    <select value={this.state.isAdmin} onChange={this.handleInputChange('isAdmin')}>
                   
                  </select>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Is Admin</Form.Label>
                   
                    <Form.Check   value={this.state.isAdmin} onChange={this.handleInputChange('isAdmin')}  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>First Name</Form.Label>
                    <Form.Control  value={this.state.FirstName} onChange={this.handleInputChange('FirstName')} type="text" placeholder="First Name" />
                </Form.Group>

                
                <Form.Group>
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control  value={this.state.LastName} onChange={this.handleInputChange('LastName')} type="text" placeholder="Last Name" />
                </Form.Group>

               
              


                <Button type="submit" >Submit</Button>
              </Form>
            </Container>
          );
    }
}

export default CreateUser;