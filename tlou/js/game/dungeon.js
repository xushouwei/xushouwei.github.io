//副本场景
var Dungeon ={
	create : function(){
		
	    //场景
		this.ground = game.add.tileSprite(0, game.height-180, game.width, 180, "ground",0); 
		
		//手柄
		this.btnA = game.add.button(400, 200, "touch", this.spineboyUpdate, this, 2, 2, 2, 2);
		
		this.btnB = game.add.sprite(500, 200, "touch",3);
		this.gamePad = game.add.sprite(100, 260, "touch",0);
		this.gamePad.anchor.set(0.5);
		this.btn = this.gamePad.addChild(game.make.sprite(0, 0, "touch",1));
		this.btn.anchor.set(0.5);
		this.btn.inputEnabled = true;
		this.btn.input.enableDrag();
		this.btn.events.onDragUpdate.add(this._dragUpdate,this);
		this.btn.events.onDragStop.add(this._dragStop,this);
		
		 // rerun
		this.restartBtn = game.add.button(game.width-50, 15, 'btnRestart', this.toHome, this);

		//加载龙骨
//		dragonBones.game = game;
//		// hardcoded ids for the dragonBones elements to target
//		var armatureName = "Dragon";//PigDragonBones";
//		var skeletonId = "Dragon";//piggy";
//		var animationId = "walk";//run";
//		// fetch the skeletonData from cache
//		var skeletonJSON = game.cache.getJSON('dragon');
//		// fetch the atlas data from cache
//		var atlasJson = game.cache.getJSON('dragon_atlas');
//		// make an array listing the names of which images to use from the atlas
//		//var partsList = ["arm_front", "head_ninja", "body", "fore_leg", "rear_leg", "rear arm"];
//		var partsList = [
//		            "armL.png",
//		            "armR.png",
//		            "armUpperL.png",
//		            "armUpperR.png",
//		            "beardL.png",
//		            "beardR.png",
//		            "body.png",
//		            "clothes1.png",
//		            "eyeL.png",
//		            "eyeR.png",
//		            "hair.png",
//		            "handL.png",
//		            "handR.png",
//		            "head.png",
//		            "legL.png",
//		            "legR.png",
//		            "tail.png",
//		            "tailTip.png"
//		            ];
//		// fetch the atlas image
//		var texture = game.cache.getImage("dragon_image");
//		// and the atlas id
//		var atlasId = 'atlas1';
//		// pass the variables all through to a utility method to generate the dragonBones armature
//		
//		var config = {
//		    armatureName: armatureName,
//		    skeletonId: skeletonId,
//		    animationId: animationId,
//		    atlasId: atlasId,
//		    partsList: partsList
//		};
//		
//		var armature = dragonBones.makeArmaturePhaser(config, skeletonJSON, atlasJson, texture);
//		
//		
//		//var armature = dragonBones.makePhaserArmature(armatureName, skeletonId, animationId, skeletonData, atlasJson, texture, partsList, atlasId);
//		// get the root display object from the armature
//		var bonesBase = armature.getDisplay();
//		// position it
//		bonesBase.x = 100;
//		bonesBase.y = 200;
//		// add it to the display list
//		game.world.add(bonesBase);
//		
//		
//		game.time.events.loop(20, this.dragonBonesUpdate, this);
		
	    //spine
		this.spineboy = game.add.spine(200, 300, 'spineboy');
	    // set up the mixes!
		this.spineboy.setMixByName('walk', 'jump', 0.2);
		this.spineboy.setMixByName('jump', 'walk', 0.4);

		this.spineboy.setAnimationByName(0, 'jump', false);
//	    game.input.onDown.add(this.spineboyUpdate, this);

	},
	update : function(){
//		this.player.x += this.btn.x / 10;
//		this.player.y += this.btn.y / 10;
		//人动
//		this.spineboy.x += this.btn.x / 10;
		//图动
		this.ground.autoScroll(-this.btn.x*2, 0);
	},
	_dragUpdate : function(btn,p,xx,yy){
		var d = Math.sqrt(xx * xx + yy * yy); 
		if(d>50){d=50;}
		var r = Math.atan2(yy, xx);
		this.btn.x = Math.cos(r)*d;
		this.btn.y = Math.sin(r)*d;
	},
	_dragStop : function(btn){
		this.btn.x = 0;
		this.btn.y = 0;
		//图停
		this.ground.stopScroll();
	},
	spineboyUpdate : function(){
		this.spineboy.setAnimationByName(0, 'jump', false);
		this.spineboy.addAnimationByName(0, 'walk', true);
	},
	toHome: function() {
	    game.state.start('home');
	}
//	,dragonBonesUpdate : function(){
//		dragonBones.animation.WorldClock.clock.advanceTime(0.02);
//	}
};