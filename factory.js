function Factory() {}
Factory.prototype.baseMethod = function () {
  return this.name + ' baseMethod.';
}
//factory
Factory.factory = function (name, opt) {
  var parentInstance;
  if (Object.prototype.toString.call(Factory[name]) !== '[object Function]') {
    throw name + " doesn't exists.";
  }
  parentInstance = new Factory();

  for(var key in parentInstance){
    if(!(Factory[name].prototype[key])) {
      Factory[name].prototype[key] = parentInstance[key];
    }
  }
  return (new Factory[name](opt));
}

Factory.Class1 = function () {
  this.name = 'Class1';
}