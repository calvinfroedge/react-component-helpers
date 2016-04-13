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

