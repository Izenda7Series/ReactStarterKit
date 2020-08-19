import React, { Component } from 'react';
import { NavDropdown, Navbar, Nav, NavbarBrand } from 'react-bootstrap';
import { Link } from 'react-router-dom';
class NavbarComponent extends Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg" variant="dark">
                <NavbarBrand href="#home">React Starter Kit</NavbarBrand>
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
                        <Nav.Link>Hello Test User</Nav.Link>
                        <Nav.Link>Create User/ Tenant</Nav.Link>
                        <Nav.Link>Log Off</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavbarComponent;