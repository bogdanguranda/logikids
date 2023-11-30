define(["ui/TransitionButton"], function () {
    this.CampaignSelectionScene = function (game) {
        this.game = game;
    };

    this.CampaignSelectionScene.prototype.preload = function () {
        this.game.load.json("campaignSelectionInfo", "data/campaign/campaignSelectionInfo.json");
        this.game.load.image("campaignSelectionBackground", "img/campaignselection/background.png");
        this.game.load.onFileComplete.add(this.fileComplete, this);
    };

    this.CampaignSelectionScene.prototype.fileComplete = function (progress, cacheKey, success, totalLoaded, totalFiles) {
        if (cacheKey === "campaignSelectionInfo") {
            this.campaignSelectionInfo = this.game.cache.getJSON("campaignSelectionInfo");
            this.game.load.spritesheet("btnCampaign1", "img/campaignselection/btnCampaign1.png", this.campaignSelectionInfo.btnCampaign1.width, this.campaignSelectionInfo.btnCampaign1.height, 3);
            this.game.load.spritesheet("btnCampaign2", "img/campaignselection/btnCampaign2.png", this.campaignSelectionInfo.btnCampaign2.width, this.campaignSelectionInfo.btnCampaign2.height, 3);
            this.game.load.spritesheet("btnCampaign3", "img/campaignselection/btnCampaign3.png", this.campaignSelectionInfo.btnCampaign3.width, this.campaignSelectionInfo.btnCampaign3.height, 3);
        }
    };

    this.CampaignSelectionScene.prototype.create = function () {
        this.background = this.game.add.sprite(0, 0, "campaignSelectionBackground");
        this.btnCampaign1 = new TransitionButton(this.game, this.campaignSelectionInfo.btnCampaign1.x, this.campaignSelectionInfo.btnCampaign1.y, "btnCampaign1", false, "LevelSelectionScene", 1);
        this.btnCampaign2 = new TransitionButton(this.game, this.campaignSelectionInfo.btnCampaign2.x, this.campaignSelectionInfo.btnCampaign2.y, "btnCampaign2", false, "LevelSelectionScene", 2);
        this.btnCampaign3 = new TransitionButton(this.game, this.campaignSelectionInfo.btnCampaign3.x, this.campaignSelectionInfo.btnCampaign3.y, "btnCampaign3", false, "LevelSelectionScene", 3);
    };

    this.CampaignSelectionScene.prototype.shutdown = function () {
        this.game.resourceUtil.cleanUp(this.background);
        this.game.resourceUtil.cleanUp(this.btnCampaign1);
        this.game.resourceUtil.cleanUp(this.btnCampaign2);
        this.game.resourceUtil.cleanUp(this.btnCampaign3);
    };

    return CampaignSelectionScene;
});