import React, { Component } from 'react';
import IzendaSynergy from 'IzendaSynergy';

class ExportReportViewer extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const reportId = this.props.match.params.id;
        IzendaSynergy.renderReportViewerPage(document.getElementById('izenda-export-reportviewer'), {
            "id": reportId,
            "useQueryParam":true,
        });
        console.log("Izenda Process | Rendering report viewer page for id: " + reportId);
    }

    render() {
        return (
            <div id="izenda-export-reportviewer" className="export"></div>
        );
    }
}

export default ExportReportViewer;