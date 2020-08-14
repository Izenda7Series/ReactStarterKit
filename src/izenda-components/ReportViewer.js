import React, { Component } from 'react';
import queryString from 'query-string';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';
import IzendaRoot from './IzendaRoot';

class ReportViewer extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};
    }
    componentDidMount() {
        const reportId = this.props.match.params.id;
        const filterQuery = queryString.parse(this.props.location.search);
        const overridingFilterValue = {};
        Object.keys(filterQuery).forEach(function (key) {
            overridingFilterValue[key] = decodeURIComponent(filterQuery[key]);
        });
        const filters = { overridingFilterValue: overridingFilterValue };
        this.dom = this.izIntegrate.RenderReportViewer(reportId, filters);
    }
    componentWillUnmount() {
        this.izIntegrate.DestroyDom(this.dom);
    }
    render() {
        return (<IzendaRoot />);
    }
}

export default ReportViewer;