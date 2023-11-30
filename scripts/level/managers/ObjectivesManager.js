define(function () {

    this.ObjectivesManager = function (game) {
        this.game = game;
    };

    this.ObjectivesManager.prototype.create = function (jsonLevelData) {
        this.objectives = jsonLevelData.objectives;
        this.mainObjectiveText = this.game.add.text(25, 10, "Objective: " + this.objectives.mainObjective.text, {
            font: "18px " + this.game.customConfigurations.ui.fontFamily,
            fill: '#000000'
        });

        if (this.objectives.secondaryObjective != null) {
            this.secondaryObjectiveText = this.game.add.text(25, 30, "Secondary objective: " + this.objectives.secondaryObjective.text, {
                font: "18px " + this.game.customConfigurations.ui.fontFamily,
                fill: '#000000'
            });
        }
    };

    this.ObjectivesManager.prototype.isMainObjectiveReached = function (character) {
        var objective = this.objectives.mainObjective;
        return this.isObjectiveReached(objective, character);
    };

    this.ObjectivesManager.prototype.isSecondaryObjectiveReached = function (character) {
        var objective = this.objectives.secondaryObjective;
        return this.isObjectiveReached(objective, character);
    };

    this.ObjectivesManager.prototype.isObjectiveReached = function (objective, character) {
        if (objective == null) {
            return false;
        }

        if (objective.type == "position") {
            var xToReach = objective.data.x;

            var characterX = character.sprite.x;

            var difX = xToReach - characterX;
            if (difX < 0) {
                difX = -1 * difX;
            }

            var errorMargin = 25;
            if (difX < errorMargin) {
                return true;
            }
        } else if (objective.type == "collect") {
            var collectibles = objective.data;
            var colLength = collectibles.length;
            for (var j = 0; j < colLength; j++) {
                var found = false;
                var collectible = collectibles[j];
                var length = character.inventory.length;
                for (var i = 0; i < length; i++) {
                    var item = character.inventory[i];
                    if (item == collectible) {
                        found = true;
                    }
                }

                if (!found) {
                    return false;
                }
            }

            return true;
        } else if (objective.type == "kill") {
            var enemies = objective.data;
            var enLength = enemies.length;
            for (var j = 0; j < enLength; j++) {
                var found = false;
                var enemy = enemies[j];
                var length = character.enemiesKilled.length;
                for (var i = 0; i < length; i++) {
                    var item = character.enemiesKilled[i];
                    if (item == enemy) {
                        found = true;
                    }
                }

                if (!found) {
                    return false;
                }
            }

            return true;
        }

        return false;
    };

    this.ObjectivesManager.prototype.cleanUp = function () {
        this.mainObjectiveText.destroy();
        if (this.secondaryObjectiveText != null) {
            this.secondaryObjectiveText.destroy();
        }
    };

    return ObjectivesManager;
});