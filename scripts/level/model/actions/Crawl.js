define(["level/model/actions/Action"], function () {
    this.Crawl = function (game, name, sprite, isModel, distance, velocity) {
        Action.call(this, game, name, sprite, isModel);

        this.distance = distance;
        this.velocity = velocity;
        this.remainingTimeInSeconds = this.distance / this.velocity;
    };

    this.Crawl.prototype = Object.create(Action.prototype);
    this.Crawl.prototype.constructor = this.Crawl;

    this.Crawl.prototype.update = function (character) {
        if (!this.started) {
            this.animation = character.animations.play("crawl", 17, true);
            character.body.velocity.x = this.velocity;
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

    return Crawl;
});