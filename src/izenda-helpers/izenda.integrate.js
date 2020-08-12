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
      'id': '[your 1st report part id]'
    });
  }

  RenderExportViewer(reportPartId) {
    IzendaSynergy.setCurrentUserContext({token: 'i7di+WoXTvjk47YhJGhictiBOqsUGIkbgd5B8XizEJ56DC4Ark8TO9YWUs50BH+HFnukB2H1pFZfza4psZCDOA=='})
    IzendaSynergy.renderReportPart(document.getElementById('export-root'), {
      "id": reportPartId,
      "useQueryParam":true,
    });
  }
}