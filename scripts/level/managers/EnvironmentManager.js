define(["level/model/environment/EnvironmentObject", "level/model/common/AnimatedEntity", "level/model/environment/Enemy"], function () {
    this.EnvironmentManager = function (game) {
        this.game = game;

        this.environment = [];
        this.collectibles = [];
        this.enemies = [];
    };

    this.EnvironmentManager.prototype.loadAssets = function () {
        this.game.load.atlasJSONHash("coin", "img/level/objects/coin.png", "img/level/objects/coin.json");
        this.game.load.image("dummy", "img/level/objects/dummy.png");
        this.game.load.image("horizontalWall", "img/level/objects/horizontalWall.png");
        this.game.load.image("verticalWall", "img/level/objects/verticalWall.png");
        this.game.load.image("gate", "img/level/objects/gate.png");
        this.game.load.image("ladder", "img/level/objects/ladder.png");
    };

    this.EnvironmentManager.prototype.create = function (jsonLevelData) {
        var environment = jsonLevelData.environment;
        for (var key in environment) {
            if (environment.hasOwnProperty(key)) {
                var itemInfo = environment[key];

                var item = new EnvironmentObject(this.game, itemInfo.position.x, itemInfo.position.y, itemInfo.texture, false);
                this.game.physics.arcade.enable(item);
                item.body.collideWorldBounds = true;
                item.body.immovable = true;
                item.body.moves = false;

                this.environment.push(item);
            }
        }

        var collectibles = jsonLevelData.collectibles;
        for (var keyC in collectibles) {
            if (collectibles.hasOwnProperty(keyC)) {
                var itemInfoC = collectibles[keyC];

                var itemC = new AnimatedEntity(this.game, itemInfoC.position.x, itemInfoC.position.y, itemInfoC.texture, itemInfoC.animations);
                this.game.physics.arcade.enable(itemC);
                itemC.body.collideWorldBounds = true;
                itemC.body.immovable = true;
                itemC.body.moves = false;
                itemC.animations.play("standing", 24, true);
                this.collectibles.push(itemC);
            }
        }

        var enemies = jsonLevelData.enemies;
        for (var keyE in enemies) {
            if (enemies.hasOwnProperty(keyE)) {
                var itemInfoE = enemies[keyE];

                var itemE = new Enemy(this.game, itemInfoE.position.x, itemInfoE.position.y, itemInfoE.texture, itemInfoE.animations, itemInfoE.damage);
                this.game.physics.arcade.enable(itemE);
                itemE.body.collideWorldBounds = true;
                itemE.body.immovable = true;
                itemE.body.moves = false;
                this.enemies.push(itemE);
            }
        }
    };

    this.EnvironmentManager.prototype.cleanUp = function () {
        this.game.resourceUtil.cleanUpArray(this.environment);
        this.game.resourceUtil.cleanUpArray(this.collectibles);
        this.game.resourceUtil.cleanUpArray(this.enemies);

        this.environment = [];
        this.collectibles = [];
        this.enemies = [];
    };

    return EnvironmentManager;
});