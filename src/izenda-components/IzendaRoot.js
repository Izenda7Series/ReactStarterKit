import React from 'react';
import './IzendaStyle.css';

function IzendaRoot() {
    return (
        <React.Fragment>
            <div className="loader" id="progressLoader"> </div>
            <div className="izenda-container" id="izenda-root"></div>
        </React.Fragment>
    );
}

export default IzendaRoot;