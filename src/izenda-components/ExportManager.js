import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';
import IzendaRoot from './IzendaRoot';

class ExportManager extends Component {
    constructor(props) {
        super(props)
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};
    }
    componentDidMount() {
        this.dom = this.izIntegrate.RenderExportManager();
    }
    componentWillUnmount() {
        this.izIntegrate.DestroyDom(this.dom);
    }
    render() {
        return (<IzendaRoot />);
    }
}

export default ExportManager;