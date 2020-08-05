import config from './config';

const IzendaSynergy = require('../../libs/IzendaSynergy/izenda_ui');

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
}