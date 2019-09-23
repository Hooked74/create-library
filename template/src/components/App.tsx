import styled, { CreateStyledComponentIntrinsic } from "@emotion/styled";
import { Theme } from "@storybook/theming";
import React, { PureComponent } from "react";

const Button: ReturnType<CreateStyledComponentIntrinsic<"button", {}, Theme>> = styled.button`
  color: turquoise;
`;

export default class App extends PureComponent<{}, {}> {
  public render(): JSX.Element {
    return <Button>Create library</Button>;
  }
}
