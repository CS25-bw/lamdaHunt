import React, { Component } from "react";
import styled from "styled-components";
import Button from "./Buttons/Button";
import UpdateCommands from "./withCommands";
class Commands extends Component {
  render() {
    const { move, explore } = this.props;
    return (
      <CommandStyles>
        <div className="buttons">
          <Button task={move} title={"N"} />
          <Button task={move} title={"S"} />
          <Button task={move} title={"E"} />
          <Button task={move} title={"W"} />
        </div>
        <div className="buttons">
          <Button task={explore} title={"Explore"} />
        </div>
      </CommandStyles>
    );
  }
}

export default UpdateCommands(Commands);

const CommandStyles = styled.div`
  width: 100%;
  background: #1c1b1b;
  height: 60px;
  display: flex;
  align-items: center;

  .buttons {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 25%;
    height: 100%;
  }
`;
