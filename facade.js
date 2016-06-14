//外观模式
//facade
var myevent = {
  stop:function(e){
    if(typeof e.preventDefault === 'function'){
      e.preventDefault();
    }
    if(typeof e.stopPropagation === 'function'){
      e.stopPropagation();
    }
    // IE 浏览器
    if(typeof e.returnValue === 'boolean'){
      e.returnValue = false;
    }
    if(typeof e.cancelBubble === 'boolean'){
      e.cancelBubble = true;
    }
  }
}