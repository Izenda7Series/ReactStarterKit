import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Home from '../home/Home'
import Login from '../login/Login';
import IzendaHome from '../izenda-components/IzendaHome';
import IzendaSetting from '../izenda-components/IzendaSetting';
import ReportDesigner from '../izenda-components/ReportDesigner';
import ReportViewer from '../izenda-components/ReportViewer';
import ReportList from '../izenda-components/ReportList';
import ReportPart from '../izenda-components/ReportPart';
import ExportReport from '../export/ExportReport';
import AdvancedReportPart from '../izenda-components/AdvancedReportPart';
import DashboardDesigner from '../izenda-components/DashboardDesigner';
import Dashboard from '../izenda-components/Dashboard';
import DashboardViewer from '../izenda-components/DashboardViewer';
import ReportCustomFilter from '../izenda-components/ReportCustomFilter';
import NavbarComponent from '../navbar/Navbar';

function AppRouter() {
  return (
    <Router>
      <Switch>
        <Route exact path='/login' component={LoginContainer} />
        {
          location.pathname !== '/login' && <Route component={DefaultContainer} />
        }
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

const LoginContainer = (props) => (
  <div>
    <NavbarComponent isLoggedIn={false} {...props} />
    <Login {...props} />
  </div>
)

const DefaultContainer = (props) => (
  <div>
    <NavbarComponent isLoggedIn={true} {...props} />
    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute path='/izenda' component={IzendaHome} />
    <PrivateRoute path='/izenda/settings' component={IzendaSetting} />
    <PrivateRoute path='/izenda/reportdesigner' component={ReportDesigner} />
    <PrivateRoute path='/izenda/report' component={ReportList} />
    <PrivateRoute path='/izenda/reportviewer/:id' component={ReportViewer} />
    <PrivateRoute path='/izenda/reportpart' component={ReportPart} />
    <PrivateRoute path='/izenda/reportcustomfilter' component={ReportCustomFilter} />
    <PrivateRoute path='/izenda/advancedreportpart' component={AdvancedReportPart} />
    <PrivateRoute path='/izenda/dashboarddesigner' component={DashboardDesigner} />
    <PrivateRoute path='/izenda/dashboard' component={Dashboard} />
    <PrivateRoute path='/izenda/dashboardviewer' component={DashboardViewer} />
    {/* Subreport Route */}
    <PrivateRoute path='/izenda/report/view/:id' component={ReportViewer} />
    {/* Export Routes */}
    <Route path='/viewer/reportpart/:id' component={ExportReport} />
  </div>
)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    localStorage.getItem('currentUser')
      ? <Component {...props} />
      : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
  )} />
)

export default AppRouter;