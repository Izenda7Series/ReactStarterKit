import React from 'react';
import { BrowserRouter as Router, Redirect, Route } from 'react-router-dom';

import Home from '../home/Home'
import Login from '../login/Login';
import IzendaHome from '../izenda-components/IzendaHome';
import IzendaSetting from '../izenda-components/IzendaSetting';
import ReportDesigner from '../izenda-components/ReportDesigner';
import ReportViewer from '../izenda-components/ReportViewer';
import ReportPart from '../izenda-components/ReportPart';
import ExportReport from '../export/ExportReport';
import ExportReportViewer from '../export/ExportReportViewer';
import ExportDashboardViewer from '../export/ExportDashboardViewer';

function AppRouter() {
  return (
    <Router>
      <div>

        <PrivateRoute exact path='/' component={Home} />
        <Route path='/login' component={Login} />
        <PrivateRoute path='/izenda' component={IzendaHome} />
        <PrivateRoute path='/izenda/settings' component={IzendaSetting} />
        <PrivateRoute path='/izenda/reportdesigner' component={ReportDesigner} />
        <PrivateRoute path='/izenda/reportviewer' component={ReportViewer} />
        <PrivateRoute path='/izenda/reportpart' component={ReportPart} />

        <Route path='/viewer/reportpart/:id' component={ExportReport}/>
        <Route path='/report/view/:id' component={ExportReportViewer} />
        <Route path='/dashboard/edit/:id' component={ExportDashboardViewer} />

      </div>
    </Router>
  );
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('currentUser')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)


export default AppRouter;