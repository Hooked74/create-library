import styled, { StyledTags } from "@emotion/styled";
import React, { PureComponent } from "react";

const Button: ReturnType<PickField<StyledTags<any>, "button">> = styled.button`
  color: turquoise;
`;

export default class App extends PureComponent<{}, {}> {
  public render(): JSX.Element {
    return <Button>Create library</Button>;
  }
}
