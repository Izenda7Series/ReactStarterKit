import React, { Component } from 'react';
import IzendaRoot from './IzendaRoot';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

class IzendaSetting extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};
    }
    componentDidMount() {
        this.dom = this.izIntegrate.RenderIzendaSettings();
    }
    componentWillUnmount() {
        this.izIntegrate.DestroyDom(this.dom);
    }
    render() {
        return (<IzendaRoot />);
    }
}

export default IzendaSetting;