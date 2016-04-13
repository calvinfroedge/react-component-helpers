# React Component Helpers

A collection of helper methods to remove boilerplate code from your React Components.

## Instance Binding Helpers

### bindMembersToClass(that, members)

Take some methods that already exist on the class, and bind `this` to them:

```
constructor(props){
  super(props);

  bindMembersToClass(this, 'method1', 'method2');
}
```

### bindFunctionsAsInstanceMethods(that, ...funcs)

Take a list of functions, as in functions imported, and bind them to the component as instance methods:

```
constructor(props){
  super(props);

  bindFunctionsAsInstanceMethods(this, foo, bar, baz);
}
```

## State Helpers

These functions allow you to remove boilerplate methods like this from your code:

```
enableForm(event){
  event.preventDefault();
  this.setState({canSubmitForm: true});
}
...
<a href="#" onClick={::this.enableForm}>Enable form</a>
```

Instead, you can use `toggleState`, which toggles a state value between true and false, `trueState`, which sets a state value to true, and `falseState`, which sets a state value to false. Each of these functions must be bound to `this`.

Example:

```
constructor(props){
  super(props);

  this.state = {
    canSubmitForm: false,
    canDoOtherThing: false
  }

  bindFunctionsAsInstanceMethods(this, toggleState);
}
```

In render...
```
<a href="#" onClick={this.toggleState.bind(0, 'canSubmitForm')}>Toggle enable form</a>
<a href="#" onClick={this.toggleState.bind(0, 'canDoOtherThing')}>Toggle enable other thing</a>
```

## Prop Helpers

These functions handle common use cases with props, such as updating state if a prop is not equal to state, calling a callback function passed as a prop if it exists, and passing props to child components with certain exclusions. 

### passProps(props={}, ...include)

Most useful if you are wrapping another component and want to pick specific props to pass. Eliminates the boilerplate of manually passing the props.

```
let childProps = passProps(this.props, 'foo', 'bar', 'baz'); //Only foo, bar, baz will be passed

<ChildComponent {...childProps} />

```

### passPropsExcept(props={}, ...exclude)

Most useful if you are wrapping another component and want to pick specific props to pass. Eliminates the boilerplate of manually passing the props.

```
let childProps = passPropsExcept(this.props, 'foo'); //All props except foo will be passed

<ChildComponent {...childProps} />

```

### setStateFromPropIfNotEqual(props, ...keys)

Useful in `componentWillReceiveProps` for checking whether or not state items which are both managed internally and can be managed by props should be updated. State will be updated when the prop with the same key as you care about in state has a different value than the value in state.

```
constructor(props){
  super(props);

  this.state = {
    foo: props.initialFoo,
    bar: props.initialBar
  }

  bindFunctionsAsInstanceMethods(this, setStateFromPropIfNotEqual);
}
```


```
componentWillReceiveProps(nextProps){
  let { state } = this;

  this.setStateFromPropIfNotEqual('foo', 'bar');
}
```

### callbackIfPropKeyExistsWithArguments

Useful for letting a parent component handle an action in a child component. Removes the `if(this.props.foo) this.props.foo(bar)` part.

```
import {callbackIfPropKeyExistsWithArguments as cbIfProp} from 'react-component-helpers'
```

```
constructor(props){
  super(props);
}
```

```
<a href="#" onClick={cbIfProp.bind(this, 'propKey', this.state.foo, this.state.bar)}>Some action</a>
```
