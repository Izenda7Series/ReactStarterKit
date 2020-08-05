import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';

class IzendaSetting extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
    }
    componentDidMount() {
        this.izIntegrate.RenderIzendaSettings();
    }
    render() {
        return null;
    }
}

export default IzendaSetting;