//观察者模式

function isType(obj,type){
  return Object.prototype.toString.call(obj) === '[object '+ type +']'
}
function isObject(obj){
  return isType(obj,'Object')
}
function isFunction(fn){
  return isType(fn,'Function')
}
function isString(str){
  return isType(str,'String')
}
function isUndefined(und){
  return isType(und,'Undefined')
}
function isArray(arr){
  return isType(arr,'Array')
}

//publisher object
var publisher = {
  subscribers:{},
  subscribe:function(type,fn,context){
    if(!isString(type)){
      return;
    }
    if(!isFunction(fn)){
      return;
    }
    if(isUndefined(this.subscribers[type])){
      this.subscribers[type] = [];
    }
    this.subscribers[type].push({fn:fn,context:context || this});
  },
  unsubscribe:function(type,fn,context){
    this.visitSubscribers('unsubscribe',type,fn,context)
  },
  publish:function(type,data){
    this.visitSubscribers('publish',type,data)
  },
  visitSubscribers:function(action,type,arg,context){
    var subscribers = this.subscribers[type];
    if(isUndefined(subscribers) || !isArray(subscribers)){
      return;
    }
    for(var i = 0 , len = subscribers.length ; i < len; i++){
      if(action === 'publish'){
        subscribers[i].fn.call(subscribers[i].context,arg);
      }else{
        if(subscribers[i].fn === arg && subscribers[i].context === context){
          subscribers[i].splice(i,1)
        }
      }
    }
  },
  on:publisher.subscribe,
  emit:publisher.publish,
  fire:publisher.publish,
  remove:publisher.unsubscribe
};

//make obj to publisher
function makePublisher(obj){
  if(!isObject(obj)){
    return;
  }
  for(var i in publisher){
    if(publisher.hasOwnProperty(i) && isFunction(publisher[i])){
      obj[i] = publisher[i];
    }
  }
  obj.subscribers = obj.subscribers || {};
}