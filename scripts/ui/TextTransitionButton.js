define(["ui/TransitionButton"], function () {
    this.TextTransitionButton = function (game, x, y, imgName, centered, sceneName, transData, text, textSize, textColor, textFont, textCentered) {
        TransitionButton.call(this, callback, game, x, y, imgName, centered, sceneName, transData);

        this.text = this.game.add.text(this.button.x, this.button.y, text, {
            font: textSize + " " + textFont,
            fill: textColor
        });

        if (centered) {
            if (textCentered) {
                this.text.anchor.setTo(0.5, 0.5);
            } else {
                this.text.x = this.button.x - this.button.width / 2;
                this.text.y = this.button.y - this.button.height / 2;
            }
        } else {
            if (textCentered) {
                this.text.anchor.setTo(0.5, 0.5);
                this.text.x = this.button.x + this.button.width / 2;
                this.text.y = this.button.y + this.button.height / 2;
            }
        }
    };

    this.TextTransitionButton.prototype = Object.create(TransitionButton.prototype);
    this.TextTransitionButton.prototype.constructor = this.TextTransitionButton;

    this.TextTransitionButton.prototype.destroy = function () {
        this.text.destroy();
        TransitionButton.prototype.destroy.call(this)
    };

    return Button;
});