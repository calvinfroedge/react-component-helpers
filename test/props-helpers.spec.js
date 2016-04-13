import expect from 'expect'
import jsdom from 'mocha-jsdom'
import { passProps, passPropsExcept, setStateFromPropIfNotEqual, callbackIfPropKeyExistsWithArguments as cb } from '../src'
import React from 'react'
import ReactDOM from 'react-dom'
import TestUtils from 'react-addons-test-utils'

class InnerComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return <div id="inner">inner</div>;
  }
}

class TestPassPropsComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let childProps = passProps(this.props, 'foo');

    return <div><InnerComponent ref="child" {...childProps} /></div>;
  }
}

class TestExcludePropsComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    let childProps = passPropsExcept(this.props, 'foo', 'baz');

    return <div><InnerComponent ref="child" {...childProps} /></div>
  }
}

class TestCallbackComponent extends React.Component {
  constructor(props){
    super(props);
  }

  render(){
    return (
      <div>
        <a href="#" ref="link" onClick={cb.bind(this, 'fooCb', 'some arg')}>Click me!</a>
      </div>
    );
  }
}

describe('props-helpers', ()=>{
  var React;
  jsdom();
  var component;
  let props = {foo: 1, baz: 2, bar: 3};

  //Assertions
  it('Should have foo, but not baz or bar', ()=>{
    var React = require('react');
    component = TestUtils.renderIntoDocument(<TestPassPropsComponent {...props} />);
    let p = component.refs.child.props;
    expect(p.foo).toExist();
    expect(p.baz).toNotExist();
    expect(p.bar).toNotExist();
  });

  it('Should have bar, but exclude foo and baz', ()=>{
    var React = require('react');
    component = TestUtils.renderIntoDocument(<TestExcludePropsComponent {...props} />);
    let p = component.refs.child.props;
    expect(p.bar).toExist();
    expect(p.foo).toNotExist();
    expect(p.baz).toNotExist();
  });

  it('Should call the callback', ()=>{
    let argResult;
    let eventResult;

    let fn = (arg, event)=>{
      argResult = arg;
      eventResult = event;
    }

    var React = require('react');
    component = TestUtils.renderIntoDocument(<TestCallbackComponent fooCb={fn} />);
    TestUtils.Simulate.click(component.refs.link);
    expect(argResult).toExist();
    expect(eventResult).toExist();
  });
})
