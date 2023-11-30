define(["level/model/actions/Action"], function () {
    this.Attack = function (game, name, sprite, isModel) {
        Action.call(this, game, name, sprite, isModel);
    };

    this.Attack.prototype = Object.create(Action.prototype);
    this.Attack.prototype.constructor = this.Attack;

    this.Attack.prototype.update = function (character) {
        if (!this.started) {
            this.animation = character.animations.play("attack", 24, false);
            this.started = true;
        }

        if (this.animation.isFinished) {
            character.animations.stop();
            this.finished = true;
        }
    };

    return Attack;
});