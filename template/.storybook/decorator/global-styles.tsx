/// <reference path="../../src/react-app-env.d.ts" />

import { colors } from "@atlaskit/theme";
import styled, { StyledTags } from "@emotion/styled";
import React from "react";

const GlobalStyles: ReturnType<PickField<StyledTags<any>, "div">> = styled.div`
  background-color: ${colors.N0};
  min-height: 100vh;
  color: ${colors.N900};
`;

export default (storyFn: (...args: any[]) => any) => <GlobalStyles>{storyFn()}</GlobalStyles>;
