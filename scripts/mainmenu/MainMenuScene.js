define(["ui/TransitionButton"], function () {
    this.MainMenuScene = function (game) {
        this.game = game;
    };

    this.MainMenuScene.prototype.preload = function () {
        this.game.load.image("mainMenuBackground", "img/mainmenu/background.png");
        this.game.load.spritesheet("btnPlay", "img/mainmenu/ui/btnPlay.png", 321, 110, 3);
        this.game.load.spritesheet("btnRanking", "img/common/ui/btnRanking.png", 61, 50, 3);
        this.game.load.spritesheet("btnShop", "img/common/ui/btnShop.png", 54, 51, 3);
        this.game.load.spritesheet("btnGold", "img/common/ui/btnGold.png", 132, 46, 3);
    };

    this.MainMenuScene.prototype.create = function () {
        this.background = this.game.add.sprite(0, 0, "mainMenuBackground");
        this.btnPlay = new TransitionButton(this.game, this.game.world.centerX, this.game.world.centerY, "btnPlay", true, "CampaignSelectionScene");
        this.btnRanking = new TransitionButton(this.game, 0, 0, "btnRanking", false, "RankingScene");
        this.btnShop = new TransitionButton(this.game, this.btnRanking.button.x + this.btnRanking.button.width + 5, this.btnRanking.button.y, "btnShop", false, "ShopScene");
        this.btnGold = new TransitionButton(this.game, this.game.world.width - 132, this.btnRanking.button.y, "btnGold", false, "ShopScene");
    };

    this.MainMenuScene.prototype.shutdown = function () {
        this.game.resourceUtil.cleanUp(this.background);
        this.game.resourceUtil.cleanUp(this.btnPlay);
        this.game.resourceUtil.cleanUp(this.btnRanking);
        this.game.resourceUtil.cleanUp(this.btnShop);
        this.game.resourceUtil.cleanUp(this.btnGold);
    };

    return MainMenuScene;
})
;