import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
import React from "react";
import Template from './Template';

configure({adapter:new Adapter()});

describe("Template", ()=>{
  let wrapper;

  beforeAll(() => {
    wrapper = mount(<Template />)
  });

  it('should show Template Line component', ()=>{
    expect(wrapper).toBeDefined();
  });

});
