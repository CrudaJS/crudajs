import React, { Component } from 'react';

class ResourcePanel extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const resource = this.props.links;

    if (!resource) {
      return null;
    }

    const keys = Object.keys(resource.allLinkArrays());

    return (
      <div className="hal-resources">
        {keys.map(key =>
          <ResourceItem key={key} k={key} link={resource.link(key)} />
        )}
      </div>
    );
  }
}

function ResourceItem(props) {
  const link = props.link;
  const key  = props.k;

  return (
    <p>
      <label>{key}:</label> <span>{link.href}</span>
    </p>
  );
}

export default ResourcePanel;
