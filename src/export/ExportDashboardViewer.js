import React, { Component } from 'react';
import IzendaSynergy from 'IzendaSynergy';

class ExportDashboardViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const reportPartId = this.props.match.params.id;
        IzendaSynergy.renderReportPart(document.getElementById('izenda-export-dashboardviewer'), {
            "id": reportPartId,
            "useQueryParam": true,
        });
        console.log("Izenda Process | Exporting report id: " + reportPartId);
    }

    render() {
        return (
            <div id="izenda-export-dashboardviewer" className="export"></div>
        );
    }
}

export default ExportDashboardViewer;