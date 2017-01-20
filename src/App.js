import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import HalPanel from './components/HalPanel.js'

function Welcome(props) {
  return (<h1>Wellcome to {props.name}</h1>);
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Welcome name="CrudaJS" />
        </div>

        <p className="App-intro">
          Web client to display HAL APIs.
        </p>

        <HalPanel />

      </div>
    );
  }
}

export default App;
