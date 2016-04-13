/**
 * Take one or objects, and mix into a react class instance
 */
export function mixin(instance, ...mixins){
  mixins.forEach((mix)=>{
    for(var key in mix){
      if(key == 'constructor') continue;
      instance[key] = mix[key].bind(instance);
    }

    if(mix.constructor) mix.constructor.call(instance, instance.props);
  });
}

/**
 * Takes existing class members, and bind them 
 */
export function bindMembersToClass(that, ...members){
  members.forEach((item)=>{
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

