<% if (react) { %>
// tslint:disable:jsx-no-lambda
import { storiesOf } from "@storybook/react";
import React from "react";
import Square from "../src/components/Square";

storiesOf("Squares", module)
  .add("red square", () => <Square onClick={() => alert("It is handler!")} background="red" />)
  .add("blue square", () => <Square background="blue" />);
<% } else { %>
import { storiesOf } from "@storybook/html";

storiesOf("Squares", module)
  .add(
    "red square",
    () =>
      '<div role="button" style="width: 100px; height: 100px; background: red;" onclick="alert(\'It is handler!\')"></div>'
  )
  .add(
    "blue square",
    () => '<div role="button" style="width: 100px; height: 100px; background: blue;"></div>'
  );
<% } %>
