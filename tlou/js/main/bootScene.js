// 最初始场景，用来加载进度条
var BootScene = {
  // 加载进度条
  preload: function() {
    //重定向
    if(typeof(GAME) !== "undefined") {
      this.load.baseURL = GAME + "/";
    }
    //判断是否在桌面运行
    if(!game.device.desktop){
      //游戏显示区域将被拉伸以填充画布的父元素和/或屏幕的整个大小。不保持比例
      this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
      //仅应在横向模式下运行
      this.scale.forceLandscape = true;
      this.scale.refresh();
    }
    game.load.image('loading', 'assets/gif/preloader.gif');
    game.load.image('bootBg', 'assets/img/phaser2.png');

  },
  // 跳转到加载场景
  create: function() {
    game.state.start('preload');
  }
}
