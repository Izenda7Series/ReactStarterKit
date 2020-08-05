import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

class ReportDesigner extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
    }
    componentDidMount() {
        this.izIntegrate.RenderReportDesigner();
    }
    componentWillUpdate() {

    }
    render() {
        return null;
    }
}

export default ReportDesigner;