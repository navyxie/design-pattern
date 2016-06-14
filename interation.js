//迭代器模式

var interation = (function(){
  return function(list) {
    var index = 0, length = list.length;
    return {
      next:function(){
        if(this.hasNext()){
          return list[++index];
        }
        return null;
      },
      hasNext:function(){
        return index < (length - 1);
      },
      rewind:function(){
        index = 0;
      },
      current:function(){
        return list[index];
      },
      previous:function(){
        if(this.hasPrevious()){
          return list[--index];
        }
        return null;
      },
      hasPrevious:function(){
        return index > 0;
      },
      first:function(){
        return list[0];
      },
      last:function(){
        return list[length-1];
      },
      equal:function(i){
        i = i || 0;
        if(list[i] !== undefined){
          return list[i];
        }
        return null;
      },
      add:function(item,i){
        i = i || length-1;
        list.splice(i,0,item);
        length++;
        return item;
      },
      delete:function(i){
        i = i || length;
        if(this.equal(i) !== null){
          var item = this[i];
          list.splice(i,1);
          length--;
          return item;
        }
        return null;        
      },
      getIndex:function(){
        return index;
      }
    }
  }
})();