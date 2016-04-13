/**
 * This function is useful for passing all props to wrapped components, with a few exclusions
 */
export function passProps(props={}, ...include){
  let toPass = {};
  let inclusions = {
  };

  include.forEach((item)=>{
    inclusions[item] = true;
  });

  Object.keys(props).forEach((prop)=>{
    if(inclusions[prop]){
      toPass[prop] = props[prop];
    } else {}
  });

  return toPass;
}

/*
 * This function is useful for passing all props to wrapped components, with a few exclusions
 */
export function passPropsExcept(props={}, ...exclude){
  let toPass = {};
  let exclusions = {
    'exclude': true
  };

  exclude.forEach((item)=>{
    exclusions[item] = true;
  });

  Object.keys(props).forEach((prop)=>{
    if(exclusions[prop]){} else {
      toPass[prop] = props[prop];
    }
  });

  return toPass;
}


/**
 * Will automatically set state from a prop if state key and prop key are not equal.
 *
 * Expects to be bound by the calling component, i.e. setStateFromPropIfNotEqual.bind(this)
 */
export function setStateFromPropIfNotEqual(props, ...keys){
  let { state } = this;
  let obj = {};

  keys.forEach((key)=>{
    if(props[key] != state[key]){
      obj[key] = props[key];
    }
  });

  if(Object.keys(obj).length > 0) this.setState(obj);
}

/**
 * Used to conditionally call a prop callback with arguments, if that prop exists...
 *
 * i.e.: if(props.cb) prop.cb(arg1, arg2)
 *
 * Expects to be bound by the calling component.
 */
export function callbackIfPropKeyExistsWithArguments(key, ...args){
  let { props } = this;
  if(props[key]){
    props[key](...args);
  }
}
