<h1 align="center"><strong><%= markdownName %></strong></h1>

[![Build Status](https://travis-ci.org/<%= repo %>.svg?branch=master)](https://travis-ci.org/<%= repo %>)
[![npm](https://img.shields.io/npm/v/<%= package %>)](https://www.npmjs.com/package/<%= package %>)
[![License](https://img.shields.io/npm/l/<%= package %>)](https://github.com/<%= repo %>/blob/master/LICENSE)
[![Codecov](https://img.shields.io/codecov/c/github/<%= repo %>?token=<token>)](https://codecov.io/gh/<%= repo %>) <!-- TODO: add codecov token -->
[![Module Size](https://img.shields.io/badge/dynamic/json?color=success&label=module%20size&query=%24.module&url=https%3A%2F%2Fraw.githubusercontent.com%2F<%= encodedRepo %>%2Fmaster%2F.size-snapshot.json)](https://github.com/<%= repo %>/blob/master/.size-snapshot.json)


## Table of contents

<!--ts-->
   * [Install](#install)
   * [Usage](#usage)
<!--te-->

## Install

```
npm install <%= package %>
```

## Usage

You can run some built-in commands:

<% if (storybook) { %>
### **npm run storybook**

This command allows you to run a [storybook](https://storybook.js.org/) in development mode. By default, it will be launched on **http://localhost:9002**. The port can be configured in the **.env** file. Storybook is an open source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.
<% } %>

### **npm run build**

Builds the app for production. Your app is ready to be deployed.

### **npm run test:watch**

Runs the test watcher in an interactive mode. By default, runs tests related to files changed since the last commit.

<% if (cypress) { %>
### **npm run test:browser:open**

Runs tests using [cypress](https://www.cypress.io/). Defaults to port **9002**. The port can be configured in the **.env** file. \
``
To run the tests, you need a running server with the base url specified in .env in the variable CYPRESS_BASE_URL.
``
<% } %>

<% if (cypress && storybook) { %>
### **npm run test:browser**

Runs tests using [cypress](https://www.cypress.io/). Defaults to port **9002**. The port can be configured in the **.env** file. Also on the same port a [storybook](https://storybook.js.org/) will be launched over which testing will be carried out.
<% } %>
