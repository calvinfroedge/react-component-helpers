/**
 * Take another object, and mix it into a react class instance
 */
export function mixin(instance, mix){
  for(var key in mix){
    instance[key] = mix[key].bind(instance);
  }
}

/**
 * Takes existing class members, and bind them 
 */
export function bindMembersToClass(that, ...members){
  members.map((item)=>{
    that[item] = that[item].bind(that);
  });
}

/**
 * Takes a list of functions, grab their names, and binds them to the class
 */
export function bindFunctionsAsInstanceMethods(that, ...funcs){
  funcs.forEach((func)=>{
    that[func.name] = func.bind(that);
  });
}

