import expect from 'expect'
import jsdom from 'mocha-jsdom'
import { toggleState, trueState, falseState, bindMembersToClass, bindFunctionsAsInstanceMethods, incStateValue, decStateValue } from '../src'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

class TestComponent extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      foo: false,
      bar: 1
    }

    bindFunctionsAsInstanceMethods(this, toggleState, trueState, falseState, incStateValue, decStateValue);
  }

  render(){
    let { toggleState, trueState, falseState } = this;

    return <div>
      <a ref="makeTrue" onClick={trueState.bind(0, 'foo')} href="#">Make true</a>  
      <a ref="makeFalse" onClick={falseState.bind(0, 'foo')} href="#">Make false</a>  
      <a ref="toggle" onClick={toggleState.bind(0, 'foo')} href="#">Toggle</a>  
    </div>;
  }
}

describe('state-helpers', ()=>{
  var React;
  jsdom();
  var component;
  let props = {foo: 1, baz: 2, bar: 3};

  it('Should toggle state as expected', ()=>{
    var React = require('react');
    component = TestUtils.renderIntoDocument(<TestComponent />);
    TestUtils.Simulate.click(component.refs.makeTrue);
    expect(component.state.foo).toBe(true);
    TestUtils.Simulate.click(component.refs.makeFalse);
    expect(component.state.foo).toBe(false);
    TestUtils.Simulate.click(component.refs.toggle);   
    expect(component.state.foo).toBe(true);
  });

  it('Should increment and decrement state value', ()=>{
    var React = require('react');
    component = TestUtils.renderIntoDocument(<TestComponent />);
    component.incStateValue('bar');
    expect(component.state.bar).toBe(2);
    component.decStateValue('bar');
    expect(component.state.bar).toBe(1);
  });
})
