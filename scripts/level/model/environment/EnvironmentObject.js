define(["level/model/common/Entity"], function () {
    this.EnvironmentObject = function (game, x, y, resourceName, isCollectible) {
        Entity.call(this, game, x, y, resourceName);

        this.isCollectible = isCollectible;
    };

    this.EnvironmentObject.prototype = Object.create(Entity.prototype);
    this.EnvironmentObject.prototype.constructor = this.EnvironmentObject;

    return EnvironmentObject;
});