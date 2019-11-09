import "@atlaskit/css-reset";<% if (react) { %>
import { colors } from "@atlaskit/theme";
import styled, { CreateStyledComponentIntrinsic } from "@emotion/styled";
import { Theme } from "@storybook/theming";
import React from "react";

const GlobalStyles: ReturnType<CreateStyledComponentIntrinsic<"div", {}, Theme>> = styled.div`
  background-color: ${colors.N0};
  min-height: 100vh;
  color: ${colors.N900};
`;

export default (storyFn: (...args: any[]) => any) => <GlobalStyles>{storyFn()}</GlobalStyles>;
<% } else { %>

export default (storyFn: (...args: any[]) => any) =>
  `<div style="min-height: 100vh;">${storyFn()}</div>`;
<% } %>
