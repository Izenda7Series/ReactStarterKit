import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

class ReportPart extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
    }
    componentDidMount() {
        this.izIntegrate.RenderReportParts();
    }
    render() {
        console.log('Rendered Report Part Component');
        return (
            <div className="izenda-container">
                <div className="quarter-screen" id="izenda-report-part1"> </div>
                <div className="quarter-screen" id="izenda-report-part2"> </div>
                <div className="half-screen" id="izenda-report-part3"> </div>
            </div>
        );
    }
}

export default ReportPart;