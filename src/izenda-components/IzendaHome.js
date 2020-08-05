import React, { Component } from 'react';
import IzendaIntegrate from '../izenda-helpers/izenda.integrate';
import './IzendaStyle.css';

class IzendaHome extends Component {
    constructor(props) {
        super(props);
        this.izIntegrate = new IzendaIntegrate();
        this.dom = {}
    }
    componentDidMount() {
        this.dom = this.izIntegrate.RenderIzenda();
    }
    componentWillUnmount() {

    }
    render() {
        return (
            <div className="IzendaHome">
                <div className="loader" id="progressLoader"> </div>
                <div className="izenda-container" id="izenda-root"></div>
            </div>);
    }
}

export default IzendaHome;