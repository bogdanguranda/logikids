define(["level/model/common/AnimatedEntity"], function () {
    this.Character = function (game, x, y, resourceName, animations) {
        AnimatedEntity.call(this, game, x, y, resourceName, animations);
        this.inventory = [];
        this.enemiesKilled = [];
    };

    this.Character.prototype = Object.create(AnimatedEntity.prototype);
    this.Character.prototype.constructor = this.Character;

    return Character;
});