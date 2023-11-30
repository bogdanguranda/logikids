define(["level/model/common/AnimatedEntity"], function () {
    this.Enemy = function (game, x, y, resourceName, animations, damage) {
        AnimatedEntity.call(this, game, x, y, resourceName, animations);
        this.damage = damage;
    };

    this.Enemy.prototype = Object.create(AnimatedEntity.prototype);
    this.Enemy.prototype.constructor = this.Enemy;

    return Enemy;
});