function finish(key, value, event){
  event && event.preventDefault && event.preventDefault();
  let obj = {};
  obj[key] = value;
  this.setState(obj);
}

/**
 * Toggle between true and false values
 */
export function toggleState(key, event){
  finish.call(this, key, !this.state[key], event);
}

/**
 * Toggle to true value
 */
export function trueState(key, event){
  finish.call(this, key, true, event);
}

/**
 * Toggle to a false value
 */
export function falseState(key, event){
  finish.call(this, key, false, event);
}

/**
 * Increment a state value
 */
export function incStateValue(key, event){
  let value = this.state[key] + 1;
  finish.call(this, key, value, event);
}

/**
 * Decrement a state value
 */
export function decStateValue(key, event){
  let value = this.state[key] - 1;
  finish.call(this, key, value, event);
}
