<h1 align="center"><strong>Create Library</strong></h1>

[![Build Status](https://travis-ci.org/Hooked74/create-library.svg?branch=master)](https://travis-ci.org/Hooked74/create-library)
[![npm](https://img.shields.io/npm/v/@hooked74/create-library)](https://www.npmjs.com/package/@hooked74/create-library)
[![License](https://img.shields.io/npm/l/@hooked74/create-library)](https://github.com/Hooked74/create-library/blob/master/LICENSE)

<br />

<div style="text-align:center"><img src="https://i.imgur.com/nm9UcDY.png" alt="tools" height="200"/></div>

This application generates a starter library kit.

## Table of contents

<!--ts-->
   * [Usage](#usage)
   * [Options](#command-options)
   * [Configuration](#configuration)
<!--te-->

## Usage

```
npx @hooked74/create-library [<name>]
```

**name** is optional parameter.

## Command Options

**-c, --config <json|file>**
Transfer partial or full configuration in json format or in file format for library generation.

**-f, --force**
Generate library with default configuration options (from *default-config.json* file).

## Configuration

The configuration has the following structure:

```json
{
  "name": "my-library",
  "scope": "hooked74",
  "author": "Igor Novikov",
  "email": "novikovio74@gmail.com",
  "repoAuthor": "Hooked74",
  "repoName": "my-library",
  "typePrefix": "H74"
}
```

### **name**

It is used for: creating a local directory, generating a package name, generating a repository name (if **repoName** is not used), generating the main type namespace, generating final assembly files, etc. It is a required parameter.

### **scope**

It is used to generate the full package name. It is a optional parameter.

### **author**

It is used to generate author in **package.json** and generate license. It is a optional parameter.

### **email**

It is used to generate author in **package.json** and for feedback in **travis-ci** configuration. It is a optional parameter.

### **repoAuthor**

It is used to generate the full repository name in many parts of the environment. It is a required parameter.

### **repoName**

It is used to generate the full repository name in many parts of the environment. It is a optional parameter (if not specified then **name** will be used).

### **typePrefix**

It is used to generate standard type namespace alias. It is necessary to avoid type intersection in a global scope. It is a optional parameter.
