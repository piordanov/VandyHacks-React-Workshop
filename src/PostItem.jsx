import React, { Component } from 'react';

export default class PostItem extends Component {
    render() {
      const {title, link} = this.props;
      return (
      <div>
        <h5>{title}</h5>
        <a href={link}>{link}</a>
      </div>);
    }
}