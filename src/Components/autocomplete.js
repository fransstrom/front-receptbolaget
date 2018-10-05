import React, { Component } from 'react';


export default class AutoCompleteism extends Component {
  render() {
    if (this.props.data.length > 1) {
      return <ul className="autoListItem">{this.props.data}</ul>;
    } else {
      return null;
    }
  }
}
