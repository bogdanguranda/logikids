define(function () {
    this.Timeline = function (game, actionsStartingY) {
        this.game = game;

        this.actions = [];
        this.currentActionIndex = -1;

        this.actionsStartingX = 200;
        this.actionsStartingY = actionsStartingY;
        this.actionsSpacingX = 10;
        this.actionsWidth = 70.0;
    };

    this.Timeline.prototype.hasStarted = function () {
        return this.currentActionIndex >= 0;
    };

    this.Timeline.prototype.hasFinished = function () {
        return this.currentActionIndex >= this.actions.length;
    };

    this.Timeline.prototype.isRunning = function () {
        return this.hasStarted() && !this.hasFinished();
    };

    this.Timeline.prototype.startExecution = function () {
        this.currentActionIndex++;
    };

    this.Timeline.prototype.updateExecution = function (character) {
        character.body.setSize(character.animations.currentFrame.width, character.animations.currentFrame.height);
        var currentAction = this.actions[this.currentActionIndex];
        if (!currentAction.isOver()) {
            currentAction.update(character);
        } else {
            if (this.currentActionIndex < this.actions.length - 1) {
                this.currentActionIndex++;
                currentAction = this.actions[this.currentActionIndex];
                currentAction.update(character);
            }
        }
    };

    this.Timeline.prototype.addAction = function (action) {
        action.sprite.y = this.actionsStartingY;
        if (this.actions.length === 0) {
            action.sprite.x = this.actionsStartingX;
        } else {
            action.sprite.x = this.actionsStartingX + (this.actionsWidth + this.actionsSpacingX) * this.actions.length;
        }

        action.homeX = action.sprite.x;
        action.homeY = action.sprite.y;

        this.actions.push(action);
    };

    this.Timeline.prototype.removeAction = function (action) {
        var index;
        var actionToKill;
        for (var i = 0; i < this.actions.length; i++) {
            if (this.actions[i] === action) {
                actionToKill = this.actions[i];
                for (var j = this.actions.length - 1; j > i; j--) {
                    this.actions[j].sprite.x = this.actions[j - 1].homeX;
                    this.actions[j].homeX = this.actions[j - 1].homeX;
                }

                index = i;
                break;
            }
        }

        this.actions.splice(index, 1);
        if (this.currentActionIndex >= 0) {
            this.currentActionIndex--;
        }
        actionToKill.sprite.destroy();
    };

    return Timeline;
});