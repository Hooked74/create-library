import "jest-enzyme";
import { configure, mount, render, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

global.shallow = shallow;
global.mount = mount;
global.render = render;
global.React = require("react");
