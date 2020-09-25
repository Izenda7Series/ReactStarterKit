import React, { Component } from 'react';
import { NavDropdown, Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AuthService from '../services/AuthService';
class NavbarComponent extends Component {
    constructor(props) {
        super(props);
        this.Auth = new AuthService();
        this.state = {
            currentUser: ''
        }
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
    }
    componentDidMount() {
        if (this.props.isLoggedIn) {
            const currentUser = localStorage.getItem('currentUser');
            this.setState({ currentUser });
        }
    }
    handleLogoutClick() {
        this.Auth.logout();
        this.setState({ isLoggedIn: false });
        this.props.history.push('/login');
    }
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <NavbarBrand>React Starter Kit</NavbarBrand>
                { this.props.isLoggedIn && 
                    <React.Fragment>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="mr-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/izenda">Izenda</Nav.Link>
                                <Nav.Link as={Link} to="/izenda/settings">Settings</Nav.Link>
                                <NavDropdown title="Reports" id="basic-nav-reports">
                                    <NavDropdown.Item as={Link} to="/izenda/reportdesigner">New Report</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/report">Report List</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/reportviewer">Report Viewer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/reportcustomfilter">Customized Report Filters Viewer</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/reportpart">Report Parts</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/advancedreportpart">Advanced Report Parts</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown title="Dashboards" id="basic-nav-dashboards">
                                    <NavDropdown.Item as={Link} to="/izenda/dashboarddesigner">New Dashboard</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/dashboard">Dashboard List</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/dashboardviewer">Dashboard Viewer</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Nav.Link>Hello {this.state.currentUser}</Nav.Link>

                                <NavDropdown title="Accounts" id="basic-nav-accounts">
                                    <NavDropdown.Item as={Link} to="/izenda/createtenant">Create Tenant</NavDropdown.Item>
                                    <NavDropdown.Item as={Link} to="/izenda/createuser">Create User</NavDropdown.Item>
                                   
                                </NavDropdown>

                                <Nav.Link onClick={this.handleLogoutClick}>Log Off</Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </React.Fragment>
                }
            </Navbar>
        );
    }
}

export default NavbarComponent;