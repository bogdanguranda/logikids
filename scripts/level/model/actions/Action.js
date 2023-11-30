define(function () {
    this.Action = function (game, name, sprite, isModel) {
        this.game = game;
        this.name = name;
        this.sprite = sprite;
        this.homeX = sprite.x;
        this.homeY = sprite.y;
        this.isModel = isModel;
        this.started = false;
        this.finished = false;
    };

    this.Action.prototype.update = function (character) {
        // Abstract method. Override in child classes.
    };

    this.Action.prototype.moveHome = function () {
        this.sprite.x = this.homeX;
        this.sprite.y = this.homeY;
    };

    this.Action.prototype.isOver = function () {
        return this.finished;
    };

    this.Action.prototype.destroy = function () {
        this.sprite.destroy();
    };

    return Action;
});