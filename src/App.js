import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppRouter from './routes/routes';
import IzendaIntegrate from './izenda-helpers/izenda.integrate';

function App() {
  const callConfig = () => {
    const izIntegrate = new IzendaIntegrate();
    izIntegrate.DoIzendaConfig();
  }

  callConfig();

  return (
    <div className="App" id="app-root">
      <AppRouter />
    </div>
  );
}

export default App;
