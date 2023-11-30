define(["level/model/actions/Action"], function () {
    this.Pick = function (game, name, sprite, isModel) {
        Action.call(this, game, name, sprite, isModel);
    };

    this.Pick.prototype = Object.create(Action.prototype);
    this.Pick.prototype.constructor = this.Pick;

    this.Pick.prototype.update = function (character) {
        if (!this.started) {
            this.animation = character.animations.play("pick", 24, false);
            this.started = true;
        }

        if (this.animation.isFinished) {
            character.animations.stop();
            this.finished = true;
        }
    };

    return Pick;
});