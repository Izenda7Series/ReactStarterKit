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
        <Route exact path='/login' component={Login} />
        {
          location.pathname !== '/login' && <Route component={DefaultContainer} />
        }
      </Switch>
    </Router>
  );
}

const DefaultContainer = () => (
  <div>
    <NavbarComponent></NavbarComponent>
    <PrivateRoute exact path='/' component={Home} />
    <PrivateRoute exact path='/izenda' component={IzendaHome} />
    <PrivateRoute exact path='/izenda/settings' component={IzendaSetting} />
    <PrivateRoute exact path='/izenda/reportdesigner' component={ReportDesigner} />
    <PrivateRoute exact path='/izenda/report' component={ReportList} />
    <PrivateRoute exact path='/izenda/reportviewer/:id' component={ReportViewer} />
    <PrivateRoute exact path='/izenda/reportpart' component={ReportPart} />
    <PrivateRoute exact path='/izenda/reportcustomfilter' component={ReportCustomFilter} />
    <PrivateRoute exact path='/izenda/advancedreportpart' component={AdvancedReportPart} />
    <PrivateRoute exact path='/izenda/dashboarddesigner' component={DashboardDesigner} />
    <PrivateRoute exact path='/izenda/dashboard' component={Dashboard} />
    <PrivateRoute exact path='/izenda/dashboardviewer' component={DashboardViewer} />
    {/* Subreport Route */}
    <PrivateRoute exact path='/izenda/report/view/:id' component={ReportViewer} />
    {/* Export Routes */}
    <Route exact path='/viewer/reportpart/:id' component={ExportReport} />
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