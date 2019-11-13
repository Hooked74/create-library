import "@atlaskit/css-reset";<% if (react) { %>
import styled, { CreateStyledComponentIntrinsic } from "@emotion/styled";
import { Theme } from "@storybook/theming";
import React from "react";

const GlobalStyles: ReturnType<CreateStyledComponentIntrinsic<"div", {}, Theme>> = styled.div`
  background-color: white;
  min-height: 100vh;
  color: #333;
`;

export default (storyFn: (...args: any[]) => any) => <GlobalStyles>{storyFn()}</GlobalStyles>;
<% } else { %>

export default (storyFn: (...args: any[]) => any) =>
  `<div style="min-height: 100vh;">${storyFn()}</div>`;
<% } %>
