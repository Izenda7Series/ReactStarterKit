import config from './config';

//const IzendaSynergy = require('../../libs/IzendaSynergy/izenda_ui');
import IzendaSynergy from '../../libs/IzendaSynergy/izenda_ui';

export default class IzendaIntegrate {

  DoIzendaConfig() {
    IzendaSynergy.config(config);
  }

  setContext() {
    const currentUserContext = {
      token: localStorage.getItem("izendatoken")
    };
    IzendaSynergy.setCurrentUserContext(currentUserContext);
  }

  RenderIzenda() {
    this.setContext();
    const dom = document.getElementById('izenda-root');
    IzendaSynergy.render(dom);
    console.log('Rendering Izenda');
    return dom;
  }

  RenderIzendaSettings() {
    this.setContext();
    const dom = document.getElementById('izenda-root');
    IzendaSynergy.render(dom);
    return dom;
  }

  RenderReportList() {
    this.setContext();
    const dom = document.getElementById('izenda-root');
    IzendaSynergy.renderReportPage(dom);
    return dom;
  }

  RenderReportParts() {
    this.setContext();
    IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part1'), {
      "id": "[your 1st report part id]",
    });

    IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part2'), {
      "id": "[your 2nd report part id]",
    });

    IzendaSynergy.renderReportPart(document.getElementById('izenda-report-part3'), {
      "id": "[your 3rd report part id]",
    });
  }

  UpdateResultReportPart(reportPartId, overridingFilterValue, containerId) {
    this.setContext();
    IzendaSynergy.renderReportPart(document.getElementById(containerId), {
      "id": reportPartId,
      "overridingFilterValue": overridingFilterValue,
    });
  }

  RenderSingleReportPart(reportPartId, containerId) {
    this.setContext();
    return IzendaSynergy.renderReportPart(document.getElementById(containerId), {
      "id": reportPartId
    });
  }

  RenderReportDesigner() {
    this.setContext();
    const dom = document.getElementById('izenda-root');
    IzendaSynergy.renderReportDesignerPage(dom);
    return dom;
  }

  RenderReportViewer(reportId, filters) {
    this.setContext();
    const dom = document.getElementById('izenda-root');
    IzendaSynergy.renderReportViewerPage(dom, reportId || '[your report id]', filters);
    return dom;
  }

  RenderReportCustomizedFilterViewer() {
    this.setContext();
    let filtersObj = {
      "filters": [],
      "overridingFilterValue":
      {  // filter object to pass to api
        p1value: 50,            // override filter value at position 1 which is applying on current report, change >30 to >50
        p2value: '30;#40'       // override filter value at position 2 which is applying on current report, change beetween (20:50) to (30:40)
      }
    };

    let dom = document.getElementById('izenda-root');
    IzendaSynergy.renderReportViewerPage(dom, '[your report id]', filtersObj);
    return dom;
  }

  RenderDashboard() {
    this.setContext();
    let dom = document.getElementById('izenda-root');
    IzendaSynergy.renderDashboardPage(dom);
    return dom;
  }

  RenderDashboardDesigner() {
    this.setContext();
    let dom = document.getElementById('izenda-root');
    IzendaSynergy.renderNewDashboardPage(dom);
    return dom;
  }

  RenderDashboardViewer() {
    this.setContext();
    let dom = document.getElementById('izenda-root');
    IzendaSynergy.renderDashboardViewerPage(dom, '[your dashboard id]');
    return dom;
  }

  RenderExportViewer(reportPartId) {
    IzendaSynergy.setCurrentUserContext({ token: 'i7di+WoXTvjk47YhJGhictiBOqsUGIkbgd5B8XizEJ56DC4Ark8TO9YWUs50BH+HFnukB2H1pFZfza4psZCDOA==' })
    IzendaSynergy.renderReportPart(document.getElementById('export-root'), {
      "id": reportPartId,
      "useQueryParam": true,
    });
  }

  DestroyDom(dom) {
    this.setContext();
    IzendaSynergy.unmountComponent(dom);
  }
}