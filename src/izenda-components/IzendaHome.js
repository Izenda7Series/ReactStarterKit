import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';
import './IzendaStyle.css';
import IzendaRoot from './IzendaRoot';

class IzendaHome extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {};
    }
    componentDidMount() {
        this.dom = this.izIntegrate.RenderIzenda();
    }
    componentWillUnmount() {
        this.izIntegrate.DestroyDom(this.dom);
    }
    render() {
        return (<IzendaRoot />);
    }
}

export default IzendaHome;