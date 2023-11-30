define(["level/model/actions/Action"], function () {
    this.Walk = function (game, name, sprite, isModel, distance) {
        Action.call(this, game, name, sprite, isModel);

        this.distance = distance; // tested with 100 default
        this.defaultVelocity = 100;
        this.remainingTimeInSeconds = this.distance / this.defaultVelocity;
    };

    this.Walk.prototype = Object.create(Action.prototype);
    this.Walk.prototype.constructor = this.Walk;

    this.Walk.prototype.update = function (character) {
        if (!this.started) {
            this.animation = character.animations.play("walk", 16, true);
            character.body.velocity.x = this.defaultVelocity;
            this.lastTime = this.game.time.totalElapsedSeconds();
            this.started = true;
        }

        if (this.remainingTimeInSeconds > 0) {
            this.currentTime = this.game.time.totalElapsedSeconds();
            var elapsedTime = this.currentTime - this.lastTime;
            this.remainingTimeInSeconds -= elapsedTime;
            this.lastTime = this.currentTime;
        } else {
            character.body.velocity.x = 0;
            character.animations.stop();
            this.finished = true;
        }
    };

    return Walk;
});