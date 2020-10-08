var React = require('react');
var createReactClass = require('create-react-class');
var IzendaSynergy = require('IzendaSynergy');

var ExportReport = createReactClass({
    getInitialState: function () {
        return {
            state: {},
            currentUserContext: {}
        };
    },
    componentDidMount: function () {
        var reportPartId = this.props.match.params.id;
        var token = localStorage.izendatoken;
        this.currentUserContext = {token: token};
        IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderReportPart(document.getElementById('izenda-export-reportpart'), {
            "id": reportPartId,
            "useQueryParam": true,
        });
        console.log("Izenda Process | Exporting report id: " + reportPartId);
    },
    render: function () {
        return (
            React.createElement('div', { className: 'export', id: 'izenda-export-reportpart' })
        );
    }
});

module.exports = ExportReport;