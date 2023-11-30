define(["level/model/actions/Action"], function () {
    this.Jump = function (game, name, sprite, isModel, distanceY, distanceX) {
        Action.call(this, game, name, sprite, isModel);

        this.distanceY = distanceY; // tested with 400 default
        this.distanceX = distanceX; // tested with 200 default

        this.defaultVelocityX = this.distanceX;
        this.defaultVelocityY = -this.distanceY;

        this.remainingTime = this.defaultVelocityX / this.defaultVelocityX;
        this.jumpTime = this.remainingTime - (1 / 4) * this.remainingTime;
        this.fallingTime = this.jumpTime - (1 / 3) * this.jumpTime;
        this.landingTime = this.fallingTime - (2 / 3) * this.fallingTime;

        this.isJumping = false;
        this.isFalling = false;
        this.hasLanded = false;
    };

    this.Jump.prototype = Object.create(Action.prototype);
    this.Jump.prototype.constructor = this.Jump;

    this.Jump.prototype.update = function (character) {
        if (!this.started) {
            this.animation = character.animations.play("jumpCrouch", 24, false);
            this.lastTime = this.game.time.totalElapsedSeconds();
            this.started = true;
        }

        if (this.remainingTime > 0) {
            if (!this.isJumping && this.remainingTime <= this.jumpTime) {
                this.animation = character.animations.play("jumpJump", 24, false);
                character.body.gravity.y = 0;
                character.body.velocity.y = this.defaultVelocityY;
                character.body.velocity.x = this.defaultVelocityX;
                this.isJumping = true;
            }

            if (!this.isFalling && this.remainingTime <= this.fallingTime) {
                this.animation = character.animations.play("jumpFall", 24, false);
                character.body.gravity.y = 1500;
                character.body.velocity.y = 0;
                this.isFalling = true;
            }

            if (!this.hasLanded && this.remainingTime <= this.landingTime) {
                this.animation = character.animations.play("jumpLand", 24, false);
                character.body.velocity.x = 0;
                this.hasLanded = true;
            }

            this.currentTime = this.game.time.totalElapsedSeconds();
            var elapsedTime = this.currentTime - this.lastTime;
            this.remainingTime -= elapsedTime;
            this.lastTime = this.currentTime;
        } else {
            character.body.velocity.x = 0;
            character.body.velocity.y = 0;
            character.animations.stop();
            this.finished = true;
        }
    };

    return Jump;
});