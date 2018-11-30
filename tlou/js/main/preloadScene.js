// 加载其他资源的场景
var PreloadScene = {
  // 加载其他所有资源
  preload: function() {
	//龙骨初始化
	dragonBones.PhaserFactory.init(this.game); // Static factory init. 
    // 背景
	game.add.image(0, 0, 'bootBg');
	//进度条
    var preloadSprite = game.add.sprite(10, game.height-25,  'loading');
    preloadSprite.width = game.width-20;
    game.load.setPreloadSprite(preloadSprite);
	//百分比
	text = game.add.text(32, game.height-55, 'File Complete: 0%', { fill: '#ffffff' });
	
    game.load.onFileComplete.add(PreloadScene.fileComplete, this);
    game.load.onLoadComplete.add(PreloadScene.loadComplete, this);
  
    /*资源加载*/
    game.load.image('background', 'assets/img/bg.png');
    game.load.image('logo', 'assets/img/logo.png');
    game.load.image('btnStart', 'assets/img/btn-start.png');
    game.load.image('btnRestart', 'assets/img/btn-restart.png');
    game.load.image('btnTryagain', 'assets/img/btn-tryagain.png');
    game.load.image('ground', 'assets/img/ground.png');
    
    //dungeon
    game.load.json('assets/dragonBones/mecha_1502b/mecha_1502b_ske.json', 'assets/dragonBones/mecha_1502b/mecha_1502b_ske.json');
    game.load.json('assets/dragonBones/mecha_1502b/mecha_1502b_tex.json', 'assets/dragonBones/mecha_1502b/mecha_1502b_tex.json', null);
    game.load.image('assets/dragonBones/mecha_1502b/mecha_1502b_tex.png', 'assets/dragonBones/mecha_1502b/mecha_1502b_tex.png');
    
    game.load.json('assets/dragonBones/demo/demo_ske.json', 'assets/dragonBones/demo/demo_ske.json');
    game.load.json('assets/dragonBones/demo/demo_tex.json', 'assets/dragonBones/demo/demo_tex.json');
    game.load.image('assets/dragonBones/demo/demo_tex.png', 'assets/dragonBones/demo/demo_tex.png');

//    game.cache.addImage('mecha_1502b_tex.png', 'assets/dragonBones/mecha_1502b/mecha_1502b_tex.png');
//    game.load.image('dragon_image', 'assets/img/dragon_atlas.png');
//    game.load.json('dragon_atlas', 'assets/json/spirit/dragon_atlas.json');
//    game.load.atlas('atlas1', 'assets/img/dragon_atlas.png', 'assets/json/spirit/dragon_atlas.json'); 
//    game.load.json('dragon', 'assets/json/spirit/dragon_skeleton.json');
    
    //spine
    game.plugins.add(Fabrique.Plugins.Spine);
    game.load.spine('spineboy', 'assets/json/spirit/spineboy.json');
    game.load.spritesheet("touch", "assets/img/touch.png",64,64);
    
//     for(var i=0 ; i <100 ; i++){
//       game.load.image('btnTryagain'+i, 'assets/img/btn-tryagain.png'+i);
//     }
    
    game.load.start();
  },
  fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
	// 文件加载进度
	text.setText("File Complete: " + progress + "% - " + totalLoaded + " out of " + totalFiles);
  },
  // 跳转到开始界面
  loadComplete: function() {
    game.state.start('login');
  },
};
