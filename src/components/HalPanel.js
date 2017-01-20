import React, { Component } from 'react';
import { parse } from 'halfred';
import traverson from 'traverson';
import JsonHalAdapter from 'traverson-hal';
import ResourcePanel from './ResourcePanel.js'

class HalPanel extends Component {
  constructor(props) {
    super(props);
    traverson.registerMediaType(JsonHalAdapter.mediaType, JsonHalAdapter);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {urlSource: '', links: null};
  }

  defaultState(props) {
    this.setState({urlSource: '', links: null});
  }

  fetchResource(props) {
    if (!props.source) {
      this.defaultState();
      return;
    }

    let traversonClient = traverson.from(props.source).jsonHal();
    traversonClient.newRequest().getResource((error, document) => {
      if (error) {
        console.log('Error:', error);
        this.defaultState();
        return;
      }

      let halResource = parse(document);
      this.setState({links: halResource});
      Object.keys(halResource.allLinkArrays()).forEach( key =>
        console.log(key)
      );

    });
  }

  handleChange(e) {
    this.setState({urlSource: e.target.value});
  }

  handleClick(e) {
    this.fetchResource({source: this.state.urlSource});
  }

  render() {
    return (
      <div className="hal-panel" >
        <div className="hal-form">
          <input value={this.state.urlSource} onChange={this.handleChange} />
          <button onClick={this.handleClick}>browse</button>
        </div>
        <ResourcePanel links={this.state.links} />
      </div>
    );
  }

}

export default HalPanel;
