import React, { Component } from 'react';
import { Container, Jumbotron, Row, Col, Button } from 'react-bootstrap';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
    }
    componentDidMount() {
        this.setState({
            user: localStorage.getItem('currentUser')
        });
    }
    render() {
        return (
            <Container fluid>
                <Jumbotron className="izenda-header">
                    <h1>Izenda React Starterkit</h1>
                    <p>This starter kit will help your development team quickly and easily embed Izenda into your application.</p>
                </Jumbotron>
                <Row>
                    <Col>
                        <h2>User Integration</h2>
                        <p>Easily integrate your users, roles, and tenants with Izenda. </p>
                        <Button variant="primary" href="https://www.izenda.com/wiki7/index.php?title=API:Back-end_Integration">Learn more »</Button>
                    </Col>
                    <Col>
                        <h2>Hidden Filters</h2>
                        <p>Our flexible API allows you to apply row-level security to your data sources. Filter data by user, role, tenant, or your own custom logic. </p>
                        <Button variant="primary" href="https://www.izenda.com/wiki7/index.php?title=Code:AdhocConfig_SetHiddenFilter">Learn more »</Button>
                    </Col>
                    <Col>
                        <h2>Security</h2>
                        <p>Review best practices to help ensure a safe and secure deployment of Izenda.</p>
                        <Button variant="primary" href="https://www.izenda.com/wiki7/index.php?title=Doc:Security_Recommendations">Learn more »</Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Home;