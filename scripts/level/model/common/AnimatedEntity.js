define(["lib/phaser", "level/model/common/Entity"], function () {
    this.AnimatedEntity = function (game, x, y, resourceName, animations) {
        Entity.call(this, game, x, y, resourceName);
        for (var i = 0; i < animations.length; i++) {
            this.animations.add(animations[i].key, Phaser.Animation.generateFrameNames("", animations[i].frameStart, animations[i].frameEnd, "", 4), 24, true);
        }
    };

    this.AnimatedEntity.prototype = Object.create(Entity.prototype);
    this.AnimatedEntity.prototype.constructor = this.AnimatedEntity;

    return AnimatedEntity;
});