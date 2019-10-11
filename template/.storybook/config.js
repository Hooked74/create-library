import React from "react";
import { addParameters, configure, addDecorator } from "@storybook/<%= react ? "react" : "html" %>";
import { create } from "@storybook/theming";
import GlobalStylesDecorator from "./decorator/global-styles.<%= react ? "tsx" : "ts" %>";

// adding css reset - storybook includes a css loader
import { version } from "../package.json";

const theme = create({
  brandName: "<%= name %>",
  brandUrl: "https://github.com/<%= repo %>"
});

addParameters({
  options: {
    // currently not using any addons
    showPanel: false,
    theme
  }
});

// Using theme would be good for this, but it looks like theme is just for the chrome around the story
addDecorator(GlobalStylesDecorator);

// automatically import all files ending in *.stories.js
const req = require.context("../stories/", true, /.stories.tsx?$/);

function loadStories() {
  req.keys().forEach(filename => req(filename));
}

configure(loadStories, module);

// Doing this more complex check as console.table || console.log makes CI cry
const table = Object.prototype.hasOwnProperty.call(console, "table") ? console.table : console.log;

console.log("environment");
table([
  ["<%= name %> version", version],
  ["react version", React.version],
  ["process.env.NODE_ENV", process.env.NODE_ENV]
]);
