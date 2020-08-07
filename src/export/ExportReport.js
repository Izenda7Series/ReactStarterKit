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
        
        var token = 'i7di+WoXTvjk47YhJGhictiBOqsUGIkbgd5B8XizEJ56DC4Ark8TO9YWUs50BH+HFnukB2H1pFZfza4psZCDOA==';
        
        this.currentUserContext = {token: token};
        IzendaSynergy.setCurrentUserContext(this.currentUserContext);
        IzendaSynergy.renderReportPart(document.getElementById('root'), {
            "id": reportPartId,
            "useQueryParam": true,
        });
        console.log("Izenda Process | Exporting report id: " + reportPartId);
    },
    render: function () {
        return (
            <div></div>
            //React.createElement('div', { className: 'export', id: 'izenda-export-reportpart' })
        );
    }
});

module.exports = ExportReport;