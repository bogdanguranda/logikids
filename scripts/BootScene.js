define(["mainmenu/MainMenuScene", "campaignselection/CampaignSelectionScene", "levelselection/LevelSelectionScene", "level/LevelScene", "shop/ShopScene", "ranking/RankingScene", "util/ResourceUtil"], function () {
    this.BootScene = function (game) {
        this.game = game;
    };

    this.BootScene.prototype.preload = function () {
        this.game.load.json("configurations", "data/config.json");
    };

    this.BootScene.prototype.create = function () {
        this.game.customConfigurations = this.game.cache.getJSON("configurations");
        this.game.resourceUtil = new ResourceUtil();
        this.game.state.add("MainMenuScene", new MainMenuScene(this.game));
        this.game.state.add("RankingScene", new RankingScene(this.game));
        this.game.state.add("ShopScene", new ShopScene(this.game));
        this.game.state.add("CampaignSelectionScene", new CampaignSelectionScene(this.game));
        this.game.state.add("LevelSelectionScene", new LevelSelectionScene(this.game));
        this.game.state.add("LevelScene", new LevelScene(this.game));
        this.game.state.start("MainMenuScene");
    };

    return BootScene;
});