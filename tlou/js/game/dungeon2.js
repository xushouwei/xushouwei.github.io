//副本场景
var Dungeon2 ={
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
		var factory = dragonBones.PhaserFactory.factory;
		//机器人
		factory.parseDragonBonesData(game.cache.getItem("assets/dragonBones/mecha_1502b/mecha_1502b_ske.json", Phaser.Cache.JSON).data);
        factory.parseTextureAtlasData(game.cache.getItem("assets/dragonBones/mecha_1502b/mecha_1502b_tex.json", Phaser.Cache.JSON).data, game.cache.getImage("assets/dragonBones/mecha_1502b/mecha_1502b_tex.png", true).base);
        //demo
        factory.parseDragonBonesData(game.cache.getItem("assets/dragonBones/demo/demo_ske.json", Phaser.Cache.JSON).data);
        factory.parseTextureAtlasData(game.cache.getItem("assets/dragonBones/demo/demo_tex.json", Phaser.Cache.JSON).data, game.cache.getImage("assets/dragonBones/demo/demo_tex.png", true).base);
       
        this.robot = new Mecha();
		
	},
	update : function(){
//		this.player.x += this.btn.x / 10;
//		this.player.y += this.btn.y / 10;
		//人动
//		this.spineboy.x += this.btn.x / 10;
		//图动
		this.ground.autoScroll(-this.btn.x*2, 0);
	},
	render : function(){
		dragonBones.PhaserFactory.factory.dragonBones.advanceTime(-1.0); // update.
	},
	_dragUpdate : function(btn,p,xx,yy){
		var d = Math.sqrt(xx * xx + yy * yy); 
		if(d>50){d=50;}
		var r = Math.atan2(yy, xx);
		this.btn.x = Math.cos(r)*d;
		this.btn.y = Math.sin(r)*d;
		
		if(xx>0){
			this.robot.move(1);
		}else if(xx == 0){
			this.robot.move(0);
		}else{
			this.robot.move(-1);
		}
	},
	_dragStop : function(btn){
		this.btn.x = 0;
		this.btn.y = 0;
		//图停
		this.ground.stopScroll();

		this.robot.move(0);
	},
	spineboyUpdate : function(){
//		this.spineboy.setAnimationByName(0, 'jump', false);
//		this.spineboy.addAnimationByName(0, 'walk', true);
		
//		this.armatureDisplay.animation.fadeIn("attack_01");
	},
	toHome: function() {
	    game.state.start('home');
	}
//	,dragonBonesUpdate : function(){
//		dragonBones.animation.WorldClock.clock.advanceTime(0.02);
//	}
};

var Mecha = /** @class */ (function () {
    function Mecha() {
        this._isSquating = false;
        this._faceDir = 1;
        this._moveDir = 0;
        this._moveDirOld = 0;
        this._speedX = 0.0;
        this._walkState = null;
        this._armature = dragonBones.PhaserFactory.factory.buildArmatureDisplay("mecha_1502b");
        this._armature.x = 200;
        this._armature.y = 550;
        game.world.add(this._armature);
        
        this._demo = dragonBones.PhaserFactory.factory.buildArmatureDisplay("Armature");
        this._demo.x = 500;
        this._demo.y = 550;
        game.world.add(this._demo);
        this._demo.animation.fadeIn("hit", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
    }
    Mecha.prototype.move = function (dir) {
        if (this._moveDir === dir) {
            return;
        }
        this._moveDir = dir;
        this._updateAnimation();
    };
//    Mecha.prototype.jump = function () {
//        if (this._isJumpingA) {
//            return;
//        }
//        this._isJumpingA = true;
//        this._armature.animation.fadeIn("jump_1", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
//        this._walkState = null;
//    };
//    Mecha.prototype.squat = function (isSquating) {
//        if (this._isSquating === isSquating) {
//            return;
//        }
//        this._isSquating = isSquating;
//        this._updateAnimation();
//    };
//    Mecha.prototype.attack = function (isAttacking) {
//        if (this._isAttackingA === isAttacking) {
//            return;
//        }
//        this._isAttackingA = isAttacking;
//    };
//    Mecha.prototype.switchWeaponL = function () {
//        this._weaponL.eventDispatcher.removeEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
//        this._weaponLIndex++;
//        this._weaponLIndex %= Mecha.WEAPON_L_LIST.length;
//        var weaponName = Mecha.WEAPON_L_LIST[this._weaponLIndex];
//        this._weaponL = dragonBones.PhaserFactory.factory.buildArmature(weaponName);
//        this._armature.getSlot("weapon_l").childArmature = this._weaponL;
//        this._weaponL.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
//    };
//    Mecha.prototype.switchWeaponR = function () {
//        this._weaponR.eventDispatcher.removeEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
//        this._weaponRIndex++;
//        this._weaponRIndex %= Mecha.WEAPON_R_LIST.length;
//        var weaponName = Mecha.WEAPON_R_LIST[this._weaponRIndex];
//        this._weaponR = dragonBones.PhaserFactory.factory.buildArmature(weaponName);
//        this._armature.getSlot("weapon_r").childArmature = this._weaponR;
//        this._weaponR.eventDispatcher.addEvent(dragonBones.EventObject.FRAME_EVENT, this._frameEventHandler, this);
//    };
//    Mecha.prototype.switchSkin = function () {
//        this._skinIndex++;
//        this._skinIndex %= Mecha.SKINS.length;
//        var skinName = Mecha.SKINS[this._skinIndex];
//        var skinData = dragonBones.PhaserFactory.factory.getArmatureData(skinName).defaultSkin;
//        dragonBones.PhaserFactory.factory.replaceSkin(this._armature, skinData, false, ["weapon_l", "weapon_r"]);
//    };
//    Mecha.prototype.aim = function (x, y) {
//        this._target.x = x;
//        this._target.y = y;
//    };
//    Mecha.prototype.update = function () {
//        this._updatePosition();
//        this._updateAim();
//        this._updateAttack();
//    };
//    Mecha.prototype._animationEventHandler = function (event) {
//        switch (event.type) {
//            case dragonBones.EventObject.FADE_IN_COMPLETE:
//                if (event.animationState.name === "jump_1") {
//                    this._speedY = -Mecha.JUMP_SPEED;
//                    if (this._moveDir !== 0) {
//                        if (this._moveDir * this._faceDir > 0) {
//                            this._speedX = Mecha.MAX_MOVE_SPEED_FRONT * this._faceDir;
//                        }
//                        else {
//                            this._speedX = -Mecha.MAX_MOVE_SPEED_BACK * this._faceDir;
//                        }
//                    }
//                    this._armature.animation.fadeIn("jump_2", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
//                }
//                break;
//            case dragonBones.EventObject.FADE_OUT_COMPLETE:
//                if (event.animationState.name === "attack_01") {
//                    this._isAttackingB = false;
//                    this._attackState = null;
//                }
//                break;
//            case dragonBones.EventObject.COMPLETE:
//                if (event.animationState.name === "jump_4") {
//                    this._isJumpingA = false;
//                    this._updateAnimation();
//                }
//                break;
//        }
//    };
//    Mecha.prototype._frameEventHandler = function (event) {
//        if (event.name === "fire") {
//            this._helpPoint.x = event.bone.global.x;
//            this._helpPoint.y = event.bone.global.y;
//            var globalPoint = event.armature.display.toGlobal(this._helpPoint);
//            this._helpPoint.x = globalPoint.x - Game.instance.x;
//            this._helpPoint.y = globalPoint.y - Game.instance.y;
//            this._fire(this._helpPoint);
//        }
//    };
//    Mecha.prototype._fire = function (firePoint) {
//        var radian = this._faceDir < 0 ? Math.PI - this._aimRadian : this._aimRadian;
//        var bullet = new Bullet("bullet_01", "fire_effect_01", radian + Math.random() * 0.02 - 0.01, 40, firePoint);
//        Game.instance.addBullet(bullet);
//    };
    Mecha.prototype._updateAnimation = function () {
    	if (this._isSquating) {
            this._speedX = 0;
            this._armature.animation.fadeIn("squat", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
            return;
        }
        if (this._moveDir === 0) {
            this._speedX = 0;
            this._armature.animation.fadeIn("idle", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
            this._walkState = null;
        }
        else {
            if (this._walkState === null) {
                this._walkState = this._armature.animation.fadeIn("walk", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP);
                this._walkState.resetToPose = false;
            }
//            if (this._moveDir * this._faceDir > 0) {
                this._walkState.timeScale = Mecha.MAX_MOVE_SPEED_FRONT / Mecha.NORMALIZE_MOVE_SPEED;
//            }
//            else {
//                this._walkState.timeScale = -Mecha.MAX_MOVE_SPEED_BACK / Mecha.NORMALIZE_MOVE_SPEED;
//            }
            if (this._moveDir * this._faceDir > 0) {
                this._speedX = Mecha.MAX_MOVE_SPEED_FRONT * this._faceDir;
            }
            else {
                this._speedX = -Mecha.MAX_MOVE_SPEED_BACK * this._faceDir;
            }
        }
        
        //是否反转
        if(this._moveDirOld != 0 &&
        	this._moveDir != 0 &&
        	parseInt(this._moveDirOld) + parseInt(this._moveDir) == 0 ){
        	this._armature.armature.flipX = !this._armature.armature.flipX;
        }
        console.log("_moveDirOld:" + this._moveDirOld + "-------_moveDir" + this._moveDir + "-------parseInt" + (parseInt(this._moveDirOld) + parseInt(this._moveDir)))
        if(this._moveDir != 0){
            //设置历史方向
            this._moveDirOld = this._moveDir;
        }
    };
//    Mecha.prototype._updatePosition = function () {
//        if (this._speedX !== 0.0) {
//            this._armatureDisplay.x += this._speedX;
//            if (this._armatureDisplay.x < -Game.instance.stageWidth * 0.5) {
//                this._armatureDisplay.x = -Game.instance.stageWidth * 0.5;
//            }
//            else if (this._armatureDisplay.x > Game.instance.stageWidth * 0.5) {
//                this._armatureDisplay.x = Game.instance.stageWidth * 0.5;
//            }
//        }
//        if (this._speedY !== 0.0) {
//            if (this._speedY < 5.0 && this._speedY + Game.G >= 5.0) {
//                this._armature.animation.fadeIn("jump_3", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
//            }
//            this._speedY += Game.G;
//            this._armatureDisplay.y += this._speedY;
//            if (this._armatureDisplay.y > Game.GROUND) {
//                this._armatureDisplay.y = Game.GROUND;
//                this._speedY = 0.0;
//                this._armature.animation.fadeIn("jump_4", -1.0, -1, 0, Mecha.NORMAL_ANIMATION_GROUP).resetToPose = false;
//            }
//        }
//    };
//    Mecha.prototype._updateAim = function () {
//        this._faceDir = this._target.x > this._armatureDisplay.x ? 1 : -1;
//        if (this._armatureDisplay.armature.flipX !== this._faceDir < 0) {
//            this._armatureDisplay.armature.flipX = !this._armatureDisplay.armature.flipX;
//            if (this._moveDir !== 0) {
//                this._updateAnimation();
//            }
//        }
//        var aimOffsetY = this._armature.getBone("chest").global.y * this._armatureDisplay.scale.y;
//        if (this._faceDir > 0) {
//            this._aimRadian = Math.atan2(this._target.y - this._armatureDisplay.y - aimOffsetY, this._target.x - this._armatureDisplay.x);
//        }
//        else {
//            this._aimRadian = Math.PI - Math.atan2(this._target.y - this._armatureDisplay.y - aimOffsetY, this._target.x - this._armatureDisplay.x);
//            if (this._aimRadian > Math.PI) {
//                this._aimRadian -= Math.PI * 2.0;
//            }
//        }
//        var aimDir = 0;
//        if (this._aimRadian > 0.0) {
//            aimDir = -1;
//        }
//        else {
//            aimDir = 1;
//        }
//        if (this._aimState === null || this._aimDir !== aimDir) {
//            this._aimDir = aimDir;
//            // Animation mixing.
//            if (this._aimDir >= 0) {
//                this._aimState = this._armature.animation.fadeIn("aim_up", -1.0, -1, 0, Mecha.AIM_ANIMATION_GROUP);
//            }
//            else {
//                this._aimState = this._armature.animation.fadeIn("aim_down", -1.0, -1, 0, Mecha.AIM_ANIMATION_GROUP);
//            }
//            this._aimState.resetToPose = false;
//        }
//        this._aimState.weight = Math.abs(this._aimRadian / Math.PI * 2);
//        this._armature.invalidUpdate();
//    };
//    Mecha.prototype._updateAttack = function () {
//        if (!this._isAttackingA || this._isAttackingB) {
//            return;
//        }
//        this._isAttackingB = true;
//        this._attackState = this._armature.animation.fadeIn("attack_01", -1.0, -1, 0, Mecha.ATTACK_ANIMATION_GROUP);
//        this._attackState.resetToPose = false;
//        this._attackState.autoFadeOutTime = this._attackState.fadeTotalTime;
//    };
    Mecha.JUMP_SPEED = 20;
    Mecha.NORMALIZE_MOVE_SPEED = 3.6;
    Mecha.MAX_MOVE_SPEED_FRONT = Mecha.NORMALIZE_MOVE_SPEED * 1.4;
    Mecha.MAX_MOVE_SPEED_BACK = Mecha.NORMALIZE_MOVE_SPEED * 1.0;
    Mecha.NORMAL_ANIMATION_GROUP = "normal";
    Mecha.AIM_ANIMATION_GROUP = "aim";
    Mecha.ATTACK_ANIMATION_GROUP = "attack";
    Mecha.WEAPON_L_LIST = ["weapon_1502b_l", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d", "weapon_1005e"];
    Mecha.WEAPON_R_LIST = ["weapon_1502b_r", "weapon_1005", "weapon_1005b", "weapon_1005c", "weapon_1005d"];
    Mecha.SKINS = ["mecha_1502b", "skin_a", "skin_b", "skin_c"];
    return Mecha;
}());