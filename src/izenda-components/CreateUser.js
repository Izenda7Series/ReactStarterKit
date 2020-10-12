import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

import IzendaAPI from '../izenda-helpers/config';

import { Container, Form, Button } from 'react-bootstrap';
import { UserService } from '../services/UserService';



class CreateUser extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};

    


        this.state = {
          isadmin:false,
          UserID:'',
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

    
    


    }
    componentWillUnmount() {
        this.DestroyDom(this.dom);
    }


  
    handleSubmit(event) {
        event.preventDefault();
        this.setState({ submitted: true });
        const username = this.state.username;
        const password = this.state.password;

        var e = document.getElementById("tenants");
      const tenant = e.options[e.selectedIndex].text;

      var f = document.getElementById("roles");
      const role = f.options[f.selectedIndex].text;
    
        //stop here if form is invalid
        if (!(username && password)) {
          //return;
        }
    
        this.setState({ loading: true });
        var a = new UserService();
        a.createUser(this.state.UserID,this.state.FirstName,this.state.LastName, tenant,role, this.state.isAdmin);
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


      loadRoles() {

        let returnme="";

        this.token = localStorage.getItem('tokenKey');

        const url = IzendaAPI.WebApiUrl+"role/all";
      
        let headers = {};
        headers = { 'access_token':token };
        
        const requestOptions = {
            method: 'GET',
            headers 
        };

         fetch(url, requestOptions)
            .then(function(response){

              response.json().then(function(data) {
           console.log(data);
            for(var i=0;i<Object.keys(data).length;i++)
            {
              
              
              returnme=returnme+"<option>"+data[i].name+"</option>";
                       
            }
            document.getElementById("roles").innerHTML=returnme;
        return (returnme);
               
              });
            });



    }


      loadTenants() {

        let returnme="";

        this.token = localStorage.getItem('tokenKey');

        const url = IzendaAPI.WebApiUrl+"tenant/allTenants";
      
        let headers = {};
        headers = { 'access_token': token};
        
        const requestOptions = {
            method: 'GET',
            headers 
        };

         fetch(url, requestOptions)
            .then(function(response){

              response.json().then(function(data) {
           
            for(var i=0;i<Object.keys(data).length;i++)
            {
              
              
              returnme=returnme+"<option>"+data[i].name+"</option>";
                       
            }
            document.getElementById("tenants").innerHTML=returnme;
        return (returnme);
               
              });
            });



    }


    render() {


   
      
        return (
        
            <Container>
                <Form onSubmit={this.handleSubmit}>
                <h3>Create User</h3>
               



                <Form.Group>
                    <Form.Label>Tenant</Form.Label>
                    <br/>
                    <select id="tenants">
                    {this.loadTenants()}
                  </select>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Selected Role</Form.Label>
                    <br/>
                    <select id="roles">
                    {this.loadRoles()}
                  </select>
                </Form.Group>


                <Form.Group>
                    <Form.Label>Is Admin</Form.Label>
                   
                    <Form.Check   value={this.state.isAdmin} onChange={this.handleInputChange('isAdmin')}  />
                </Form.Group>

                <Form.Group>
                    <Form.Label>User ID</Form.Label>
                    <Form.Control  value={this.state.UserID} onChange={this.handleInputChange('UserID')} type="text" placeholder="user@company.com" />
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