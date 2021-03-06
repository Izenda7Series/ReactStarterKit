import ApiEndpointConfig from './ApiEndpointConfig';
export default {
    WebApiUrl : ApiEndpointConfig.getPath('izendaAPI'),
    BaseUrl : '/',
    RootPath : '/vendor/IzendaSynergy',
    CssFile : 'izenda-ui.css',
    Routes : {
            Settings: 'settings',
            ReportDesigner: 'reportdesigner',
            Dashboard: 'dashboard',
            Report: 'report',
            ReportViewer: 'reportviewer',
            Viewer: 'viewer',
            Account: 'account',
            MyProfile: 'myprofile'
    },
    TimeOut : 3600,
    NeedToEncodeUrl : false,
    UIPreferences : {
            ReportFilterSectionExpanded: true
    }
};
