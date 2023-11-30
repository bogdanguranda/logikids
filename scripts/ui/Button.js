define(function () {
    this.Button = function (game, x, y, imgName, centered, callback) {
        this.game = game;

        this.button = this.game.add.button(x, y, imgName, callback, this, 1, 0, 2);
        if (centered) {
            this.button.anchor.setTo(0.5, 0.5);
        }
    };

    this.Button.prototype.destroy = function () {
        this.button.destroy();
    };

    return Button;
});