define(["level/managers/UIManager", "level/managers/EnvironmentManager", "level/managers/CharacterManager",
    "level/managers/TimelineManager", "level/managers/ObjectivesManager"], function () {
    this.LevelScene = function (game) {
        this.game = game;

        this.uiManager = new UIManager(this.game);
        this.environmentManager = new EnvironmentManager(this.game);
        this.characterManager = new CharacterManager(this.game);
        this.timelineManager = new TimelineManager(this.game);
        this.objectivesManager = new ObjectivesManager(this.game);
    };

    this.LevelScene.prototype.init = function (levelInfo) {
        this.campaignNumber = levelInfo.campaignNumber;
        this.levelNumber = levelInfo.levelNumber;

        this.levelFileAssetName = "campaign" + this.campaignNumber + "Level" + this.levelNumber;
        this.levelFilePath = "data/campaign/campaign" + this.campaignNumber + "/level" + this.levelNumber + ".json";
    };

    this.LevelScene.prototype.preload = function () {
        this.game.load.json(this.levelFileAssetName, this.levelFilePath);
        this.game.load.image("levelBackground", "img/level/background.png");
        this.uiManager.loadAssets();
        this.environmentManager.loadAssets();
        this.characterManager.loadAssets();
        this.timelineManager.loadAssets();
    };

    this.LevelScene.prototype.create = function () {
        var jsonLevelData = this.game.cache.getJSON(this.levelFileAssetName);
        this.background = this.game.add.sprite(0, 0, "levelBackground");
        this.environmentManager.create(jsonLevelData);
        this.timelineManager.create(this.background.height);
        this.characterManager.create(jsonLevelData.character);
        this.objectivesManager.create(jsonLevelData);
        this.uiManager.create(this);
    };

    this.LevelScene.prototype.update = function () {
        this.game.physics.arcade.collide(this.characterManager.character, this.timelineManager.actionsBar);

        if (this.timelineManager.timeline.hasStarted()) {
            this.timelineManager.timeline.updateExecution(this.characterManager.character);
            this.characterManager.updateCharacter(this.environmentManager.environment, this.environmentManager.collectibles,
                this.environmentManager.enemies, this.timelineManager.timeline);
            if (this.timelineManager.timeline.hasFinished()) {
                this.uiManager.displayFinish(this.objectivesManager.isMainObjectiveReached(this.characterManager.character),
                    this.objectivesManager.isSecondaryObjectiveReached(this.characterManager.character));
            }
        }
    };

    this.LevelScene.prototype.shutdown = function () {
        this.game.resourceUtil.cleanUp(this.background);
        this.uiManager.cleanUp();
        this.environmentManager.cleanUp();
        this.characterManager.cleanUp();
        this.timelineManager.cleanUp();
        this.objectivesManager.cleanUp();
    };

    return LevelScene;
});