//装饰者模式

//extend
function Sale(price){
  this.price = price || 100;
}
Sale.prototype.getPrice = function(){
  return this.price;
}
Sale.prototype.decorate = function(decorator){
  var F = function(){};
  var overrides = this.constructor.decorators[decorator];
  if(!overrides){
    throw {Error:'has no decorator: ' + decorator}
  }
  F.prototype = this;
  var newObj = new F();
  newObj.uber = F.prototype;//保存父类原型
  for(var i in overrides){
    if(overrides.hasOwnProperty(i)){
      newObj[i] = overrides[i];//当前装饰的对象赋值给newObj
    }
  }
  return newObj;
}
Sale.decorators = {};
Sale.decorators.plus = {
  getPrice:function(){
    var price = this.uber.getPrice();
    price += 1;
    return price;
  }
}
Sale.decorators.sub = {
  getPrice:function(){
    var price = this.uber.getPrice();
    price -= 1;
    return price;
  }
}
Sale.decorators.rmb = {
  getPrice:function(){
    var price = this.uber.getPrice();
    return '&yuan;'+price;
  }
}

//another implement way , list

function List(price){
  this.price = price || 100;
  this.decorators_list = {};
}
List.decorators = {};
List.decorators.plus = {
  getPrice:function(price){
    return price+1;
  }
}
List.decorators.sub = {
  getPrice:function(price){
    return --price
  }
}
List.decorators.rmb = {
  getPrice:function(price){
    return '&yuan;'+price;
  }
}

List.prototype.decorate = function(key,decorator){
  if(!this.decorators_list[key]){
    this.decorators_list[key] = [];
  }
  this.decorators_list[key].push(decorator);
}
List.prototype.getPrice = function(){
  var price = this.price,i,max,name;
  var decorators = this.decorators_list['price'];
  if(!decorators){
    return this;
  }
  for(i = 0 , len = decorators.length ; i < len ; i++){
    name = decorators[i];
    price = List.decorators[name].getPrice(price);
  }
  return price;
}