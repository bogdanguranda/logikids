define(["level/model/actions/Action"], function () {
    this.Climb = function (game, name, sprite, isModel, distance) {
        Action.call(this, game, name, sprite, isModel);

        this.distance = distance;
        this.remaining = this.distance;
    };

    this.Climb.prototype = Object.create(Action.prototype);
    this.Climb.prototype.constructor = this.Climb;

    this.Climb.prototype.update = function (character) {
        if (!this.started) {
            character.animations.play("climb", 24, false);
            this.started = true;
        }

        if (this.remaining > 0) {
            character.y -= 5;
            this.remaining -= 5;
        } else {
            character.animations.stop(null, true);
            this.finished = true;
        }
    };

    return Climb;
});