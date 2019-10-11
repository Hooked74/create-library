<% if (react) { %>
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
<% } else { %>
export default function App(): HTMLButtonElement {
  const button: HTMLButtonElement = document.createElement("button");
  button.style.color = "turquoise";
  return button;
}
<% } %>
