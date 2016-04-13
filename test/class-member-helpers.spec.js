import expect from 'expect'
import jsdom from 'mocha-jsdom'
import { mixin, bindMembersToClass, bindFunctionsAsInstanceMethods } from '../src'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

let mixme = {
  testMix: function(){
    this.setState({mix: true});
  }
}

let bar = function(){
  this.setState({foo: false});
}

class TestComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      foo: false
    }

    bindMembersToClass(this, 'foo');
    bindFunctionsAsInstanceMethods(this, bar);
    mixin(this, mixme);
  }

  foo(){
    this.setState({foo: true});
  }

  render(){

    return <div>test</div>;
  }
}

describe('props-helpers', ()=>{
  var React;
  jsdom();
  var component;

  before(()=>{
    var React = require('react');
    component = TestUtils.renderIntoDocument(<TestComponent />);
  })

  //Assertions
  it('Should do correct bindings', ()=>{
    expect(component.foo).toExist();
    expect(component.bar).toExist();
    component.foo();
    expect(component.state.foo).toBe(true);
    component.bar();
    expect(component.state.foo).toBe(false);
    component.testMix();
    expect(component.state.mix).toBe(true);
  });
})
