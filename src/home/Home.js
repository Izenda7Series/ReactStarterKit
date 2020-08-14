import React, { Component } from 'react';
import { Link } from 'react-router-dom';

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
        console.log('Rendered Report Part Component');
        return (
            <div className="Home">
                <div className="jumbotron izenda-header">
                    <h1>Izenda Unofficial React Starterkit</h1>
                    <h3>Hello You Been Logged in!</h3>
                    <p className="lead">
                        This starter kit will help your development team quickly and easily embed Izenda into your application.
                </p>
                </div>
                <div>
                    <h1>Go to Izenda</h1>
                    <Link to="/izenda">Izenda Link</Link>
                </div>
                <div className="row izenda-base-color">
                    <div className="col-md-4">
                        <h2>User Integration</h2>
                        <p>Easily integrate your users, roles, and tenants with Izenda. </p>
                        <p><a className="btn btn-primary" href="https://www.izenda.com/wiki7/index.php?title=API:Back-end_Integration" role="button">Learn more »</a></p>
                    </div>
                    <div className="col-md-4">
                        <h2>Hidden Filters</h2>
                        <p>Our flexible API allows you to apply row-level security to your data sources. Filter data by user, role, tenant, or your own custom logic. </p>
                        <p><a className="btn btn-primary" href="https://www.izenda.com/wiki7/index.php?title=Code:AdhocConfig_SetHiddenFilter" role="button">Learn more »</a></p>
                    </div>
                    <div className="col-md-4">
                        <h2>Security</h2>
                        <p>Review best practices to help ensure a safe and secure deployment of Izenda.</p>
                        <p><a className="btn btn-primary" href="https://www.izenda.com/wiki7/index.php?title=Doc:Security_Recommendations" role="button">Learn more »</a></p>
                    </div>
                </div>
                <div className="login-area">
                    <Link to="/login">Logout</Link>
                </div>
            </div>
        );
    }
}

export default Home;