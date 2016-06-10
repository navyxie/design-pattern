//cache the instance in constructor static attribute.
function Singleton() {
  if (Object.prototype.toString.call(Singleton._instance) === "[object Object]") {
    return Singleton._instance;
  }
  this.name = 'singleton-pattern';
  Singleton._instance = this;
  return this;
}

//cache the instance in closure function.

function SingletonClosure() {
  //cache instance
  var _instance;
  //rewrite constructor function
  SingletonClosure = function () {
    return _instance;
  }
  //retain the prototype
  SingletonClosure.prototype = this;
  //init instance
  _instance = new SingletonClosure();
  _instance.constructor = SingletonClosure;

  //do something
  _instance.name = 'singleton-pattern';
  return _instance;
}