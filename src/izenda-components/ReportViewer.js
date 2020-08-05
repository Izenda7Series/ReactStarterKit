import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

class ReportViewer extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
    }
    componentDidMount() {
        this.izIntegrate.RenderReportViewer();
    }
    render() {
        return (
            <React.Fragment>
                <div className="loader" id="progressLoader"> </div>
                <div className="izenda-container" id="izenda-root"></div>
            </React.Fragment>
        );
    }
}

export default ReportViewer;