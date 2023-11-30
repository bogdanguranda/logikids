define(["lib/phaser"], function () {
    this.Entity = function (game, x, y, resourceName) {
        Phaser.Sprite.call(this, game, x, y, resourceName);

        this.game.add.existing(this);
    };

    Entity.prototype = Object.create(Phaser.Sprite.prototype);
    Entity.prototype.constructor = Entity;

    return Entity;
});