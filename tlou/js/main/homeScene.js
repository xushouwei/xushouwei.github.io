// 主场景
var HomeScene = {
  create: function() {
    // 背景
    game.add.tileSprite(0, 0, game.width, game.height, 'background');
    this.score = 0;
    this.best = 0;
    var titleStyle = { font: "bold 12px Arial", fill: "#4DB3B3", boundsAlignH: "center" };
    var scoreStyle = { font: "bold 20px Arial", fill: "#FFFFFF", boundsAlignH: "center" };
    //score
    var scoreSprite = game.add.sprite(10, 10);
    var scoreGraphics = game.add.graphics(0, 0);
    scoreGraphics.lineStyle(5, 0xA1C5C5);
    scoreGraphics.beginFill(0x308C8C);
    scoreGraphics.drawRoundedRect(0, 0, 70, 50, 10);
    scoreGraphics.endFill();
    scoreSprite.addChild(scoreGraphics);
    var scoreTitle = game.add.text(0, 5, "SCORE", titleStyle);
    scoreTitle.setTextBounds(0, 0, 70, 50);
    scoreSprite.addChild(scoreTitle);
    this.scoreText = game.add.text(0, 20, this.score, scoreStyle);
    this.scoreText.setTextBounds(0, 0, 70, 50);
    scoreSprite.addChild(this.scoreText);
    //best
    var bestSprite = game.add.sprite(90, 10);
    var bestGraphics = game.add.graphics(0, 0);
    bestGraphics.lineStyle(5, 0xA1C5C5);
    bestGraphics.beginFill(0x308C8C);
    bestGraphics.drawRoundedRect(0, 0, 70, 50, 10);
    bestGraphics.endFill();
    bestSprite.addChild(bestGraphics);
    var bestTitle = game.add.text(0, 5, "BEST", titleStyle);
    bestTitle.setTextBounds(0, 0, 70, 50);
    bestSprite.addChild(bestTitle);
    this.bestText = game.add.text(0, 20, this.best, scoreStyle);
    this.bestText.setTextBounds(0, 0, 70, 50);
    bestSprite.addChild(this.bestText);
    // rerun
    var restartBtn = game.add.button(game.width-50, 15, 'btnRestart', this.beginGame, this);
    // mainarea
    var mainAreaSprite = game.add.sprite(10, 80);
    var mainAreaBackGraphics = game.add.graphics(0, 0);
    mainAreaBackGraphics.beginFill(0xADA79A, 0.5);
    mainAreaBackGraphics.drawRoundedRect(0, 0, 220, 220, 10);
    mainAreaBackGraphics.endFill();
    mainAreaSprite.addChild(mainAreaBackGraphics);

  },
  beginGame: function() {
    game.state.start('dungeon');
  }
};
