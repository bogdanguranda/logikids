define(["lib/phaser", "level/model/character/Character"], function () {
    this.CharacterManager = function (game) {
        this.game = game;
    };

    this.CharacterManager.prototype.loadAssets = function () {
        this.game.load.atlasJSONHash("swordsmanClassic", "img/level/character/swordsmanClassic.png", "img/level/character/swordsmanClassic.json");
    };

    this.CharacterManager.prototype.create = function (characterData) {
        this.character = new Character(this.game, characterData.position.x, characterData.position.y, characterData.texture, characterData.animations);
        this.character.anchor.y = 1;
        this.game.physics.arcade.enable(this.character);
        this.character.body.collideWorldBounds = true;
        this.character.body.gravity.y = 1000;
    };

    this.CharacterManager.prototype.updateCharacter = function (environment, collectibles, enemies, timeline) {
        for (var key in environment) {
            if (environment.hasOwnProperty(key)) {
                this.game.physics.arcade.collide(this.character, environment[key]);
            }
        }

        for (var i = 0; i < collectibles.length; i++) {
            var collectible = collectibles[i];
            var isPickingUp = timeline.actions[timeline.currentActionIndex].name === "actionPick";
            if (Phaser.Rectangle.intersects(this.character.getBounds(), collectible.getBounds()) && isPickingUp) {
                this.character.inventory.push(collectible.name);
                collectible.kill();
                collectibles.splice(i, 1);
                break;
            } else {
                collectible.update();
            }
        }

        for (var i = 0; i < enemies.length; i++) {
            var enemy = enemies[i];
            var isSlashing = timeline.actions[timeline.currentActionIndex].name === "actionAttack";
            if (Phaser.Rectangle.intersects(this.character.getBounds(), enemy.getBounds()) && isSlashing) {
                this.character.enemiesKilled.push(enemy.name);
                enemy.kill();
                enemies.splice(i, 1);
                break;
            } else {
                enemy.update();
            }
        }
    };

    this.CharacterManager.prototype.cleanUp = function () {
        this.game.resourceUtil.cleanUp(this.character);
    };

    return CharacterManager;
});