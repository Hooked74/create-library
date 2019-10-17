<% if (react) { %>import "jest-enzyme";
import { configure, mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
<% } %>import faker from "faker";

<% if (react) { %>configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require("react");
<% } %>global.fakerStatic = faker;
