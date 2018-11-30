var game = new Phaser.Game(1136, 640, Phaser.AUTO, 'gamebox');

//场景库
game.States = {};

//boot场景
game.States.boot = function() {
  //preload, create, update, render 预加载，创建，更新，呈现  (预加载，创建会一次进行, 更新会不停地调用) 
  this.preload = BootScene.preload;
  this.create = BootScene.create;
};

//预加载场景，用于加载资源
game.States.preload = function() {
  this.preload = PreloadScene.preload;
//  this.create = PreloadScene.create;
};

//登录
game.States.login = function() {
  this.create = LoginScene.create.bind(LoginScene);
};

//主页
game.States.home = function() {
  this.create = HomeScene.create.bind(HomeScene);
};

//副本
game.States.dungeon = function() {
  this.create = Dungeon.create.bind(Dungeon);
  this.update = Dungeon.update.bind(Dungeon);
};

//副本2 龙骨
game.States.dungeon2 = function() {
  this.create = Dungeon2.create.bind(Dungeon2);
  this.update = Dungeon2.update.bind(Dungeon2);
  this.render = Dungeon2.render.bind(Dungeon2);
};

game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('login', game.States.login);
game.state.add('home', game.States.home);
game.state.add('dungeon', game.States.dungeon);
game.state.add('dungeon2', game.States.dungeon2);
//入口
game.state.start('boot');