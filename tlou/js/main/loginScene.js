// 主场景
var LoginScene = {
  create: function() {
    // 背景
    game.add.tileSprite(0, 0, game.width, game.height, 'background');
    //logo图片
    var logo = game.add.image(0, 0, 'logo');
    //设置位置
    logo.reset((game.width - logo.width) / 2, (game.height - logo.height) / 2 - 50);
    var startBtn = game.add.button(0, 0, 'btnStart', this.toHome, this);
    startBtn.reset((game.width - startBtn.width) / 2, (game.height - startBtn.height) / 2 + 100);
  },
  toHome: function() {
    game.state.start('home');
  }
};
