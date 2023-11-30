define(["ui/Button"], function () {
    this.TransitionButton = function (game, x, y, imgName, centered, sceneName, transData) {
        var callback = function () {
            this.game.state.start(sceneName, true, false, transData);
        };
        Button.call(this, game, x, y, imgName, centered, callback);
    };

    this.TransitionButton.prototype = Object.create(Button.prototype);
    this.TransitionButton.prototype.constructor = this.TransitionButton;

    this.TransitionButton.prototype.destroy = function() {
        Button.prototype.destroy.call(this)
    };

    return TransitionButton;
});