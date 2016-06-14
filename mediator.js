//中介者模式
var mediator = {
  players:{},
  setup:function(){
    var players = this.players;
    players.home = new Player('Home');
    players.guest = new Player('Guest');
  },
  played:function(){
    var players = this.players;
    var score = {
      Home:players.home.points,
      Guest:players.guest.points
    };
    scoreBoard.update(score);
  },
  keypress:function(e){
    e = e || window.event;
    if(e.which === 49){
      mediator.players.home.play();
      return;
    }
    if(e.which === 48){
      mediator.players.guest.play();
      return;
    }
  }
}
function Player(name){
  this.points = 0;
  this.name = name;
}
Player.prototype.play = function(){
  this.points += 1;
  mediator.played();
}
var scoreBoard = {
  element:document.getElementById('results'),
  update:function(score){
    var i , msg = '';
    for(i in score){
      if(score.hasOwnProperty(i)){
        msg += '<p><strong>' + i + '<\/strong>';
        msg += score[i];
        msg += '<\/p>';
      }
    }
    this.element.innerHTML = msg;
  }
}

//init game
mediator.setup();
window.onkeypress = mediator.keypress;
setTimeout(function(){
  window.onkeypress = null;
  alert('game over!')
},3000);