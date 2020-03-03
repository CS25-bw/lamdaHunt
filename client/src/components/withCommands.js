import React, { Component } from "react";

const UpdateCommand = HOCComponent => {
  class NewCommand extends Component {
    constructor() {
      super();
      this.state = {
        move: {}
      };
    }
    componentDidMount() {}

    handleMove = async () => {};
    handleExplore = async () => {};

    render() {
      return <HOCComponent move={this.handleMove} />;
    }
  }
  return NewCommand;
};

export default UpdateCommand;
