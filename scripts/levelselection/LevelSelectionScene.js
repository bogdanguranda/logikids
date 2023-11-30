define(["ui/TransitionButton"], function () {
    this.LevelSelectionScene = function (game) {
        this.game = game;
    };

    this.LevelSelectionScene.prototype.init = function (campaignNumber) {
        this.campaignNumber = campaignNumber;
    };

    this.LevelSelectionScene.prototype.preload = function () {
        this.game.load.json("campaign" + this.campaignNumber + "Info", "data/campaign/campaign" + this.campaignNumber + "/info.json");
        this.game.load.image("levelSelectionCampaign" + this.campaignNumber + "Background", "img/levelselection/campaign" + this.campaignNumber + "/background.png");
        this.game.load.onFileComplete.add(this.fileComplete, this);
    };

    this.LevelSelectionScene.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        if (cacheKey === "campaign" + this.campaignNumber + "Info") {
            this.campaignInfo = this.game.cache.getJSON("campaign" + this.campaignNumber + "Info");
            for (var i = 1; i <= this.campaignInfo.numberOfLevels; i++) {
                this.game.load.spritesheet("campaign" + this.campaignNumber + "btnLevel" + i, "img/levelselection/campaign" + this.campaignNumber + "/btnLevel" + i + ".png", this.campaignInfo["btnLevel" + i].width, this.campaignInfo["btnLevel" + i].height, 3);
            }
        }
    };

    this.LevelSelectionScene.prototype.create = function () {
        this.background = this.game.add.sprite(0, 0, "levelSelectionCampaign" + this.campaignNumber + "Background");
        this.levelButtons = [];
        for (var i = 1; i <= this.campaignInfo.numberOfLevels; i++) {
            this.levelButtons[i] = new TransitionButton(this.game, this.campaignInfo["btnLevel" + i].x, this.campaignInfo["btnLevel" + i].y, "campaign" + this.campaignNumber + "btnLevel" + i, false, "LevelScene", {"campaignNumber": this.campaignNumber, "levelNumber": i});
        }
    };

    this.LevelSelectionScene.prototype.shutdown = function () {
        this.game.resourceUtil.cleanUp(this.background);
        for (var i = 1; i <= this.campaignInfo.numberOfLevels; i++) {
            this.game.resourceUtil.cleanUp(this.levelButtons[i]);
        }
        this.levelButtons = null;
    };

    return LevelSelectionScene;
});