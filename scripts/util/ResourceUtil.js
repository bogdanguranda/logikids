define(function () {
    this.ResourceUtil = function () {
    };

    this.ResourceUtil.prototype.cleanUp = function (resource) {
        resource.destroy();
        resource = null;
    };

    this.ResourceUtil.prototype.cleanUpArray = function (resourceArr) {
        var length = resourceArr.length;
        for (var i = 0; i < length; i++) {
            this.cleanUp(resourceArr[i]);
        }
        resourceArr = null;
    };

    return ResourceUtil;
});
