<% if (react) { %>
import { storiesOf } from "@storybook/react";
import React from "react";

const handler: Handler = () => alert("It is handler!");

storiesOf("Squares", module)
  .add("red square", () => (
    <div style={{ width: 100, height: 100, background: "red" }} onClick={handler} role="button" />
  ))
  .add("blue square", () => (
    <div style={{ width: 100, height: 100, background: "blue" }} role="button" />
  ));
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
