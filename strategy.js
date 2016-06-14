//策略模式
//strategy

var validator = {
  types:{},//所有可用的检查
  messages:[],//错误信息
  config:{},//当前配置
  validate:function (data) {
    var i , msg , type , checker , result_ok;
    //重置所有消息
    this.messages = [];
    for(i in data){
      if(data.hasOwnProperty(i)){
        type = this.config[i];
        checker = this.types[type];
        if(!type){
          continue;//不需要验证
        }
        if(!checker){
          throw {
            name:"ValidationError",
            message:"No handler to validate type " + type
          }
        }
        result_ok = checker.validate(data[i]);
        if(!result_ok){
          msg = "Invalid value for " + i + ", " + checker.instructions;
          this.messages.push(msg);
        }
      }
    }
    return this.hasErrors();
  },
  hasErrors:function(){
    return this.messages.length !== 0;
  }
};
validate.config['first_name'] = 'isNonEmpty';
validate.config['age'] = 'isNumber';
validator.types.isNonEmpty = {
  validate:function(value){
    return value !== "";
  },
  instructions:'the value cannot be empty'
}
validator.types.isNumber = {
  validate:function(value){
    return !isNaN(value);
  },
  instructions:'the value can only be a valid number.'
}
validator.validate({first_name:'navy',age:18});