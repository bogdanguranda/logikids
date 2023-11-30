define(function () {
    this.UIManager = function (game) {
        this.game = game;
    };

    this.UIManager.prototype.loadAssets = function () {
        this.game.load.image("btnReady", "img/level/ui/btnReady.png");
    };

    this.UIManager.prototype.create = function (levelScene) {
        this.btnReady = this.game.add.sprite(levelScene.background.width / 2, 50, "btnReady");
        this.btnReady.anchor.setTo(0.5, 0.5);
        this.btnReady.scale.setTo(0.5, 0.5);
        this.btnReady.inputEnabled = true;
        this.btnReady.events.onInputDown.add(function () {
            if (!levelScene.timelineManager.timeline.hasStarted()) {
                levelScene.timelineManager.timeline.startExecution();
                this.btnReadyText.setText("Restart");
                levelScene.timelineManager.disableActions();
            } else {
                this.btnReadyText.setText("Start");
                this.cleanUp();
                this.game.state.restart(true, true, {
                    "campaignNumber": levelScene.campaignNumber,
                    "levelNumber": levelScene.levelNumber
                })
            }
        }, this);
        this.game.physics.arcade.enable(this.btnReady);

        this.btnReadyText = this.game.add.text(this.btnReady.x, this.btnReady.y, "Start",
            {font: "24px " + this.game.customConfigurations.ui.fontFamily, fill: '#ffffff'});
        this.btnReadyText.anchor.setTo(0.5, 0.5);
    };

    this.UIManager.prototype.displayFinish = function (isMainObjectiveReached, isSecondaryObjectiveReached) {
        if (isMainObjectiveReached) {
            this.mainObjectiveReachedText = this.game.add.text(this.background.width / 2,
                this.background.height / 2, "Victory!", {
                    font: "64px " + this.game.customConfigurations.ui.fontFamily,
                    fill: '#000000'
                });
            this.mainObjectiveReachedText.anchor.setTo(0.5, 0.5);

            if (isSecondaryObjectiveReached) {
                var x = this.mainObjectiveReachedText.x;
                var y = this.mainObjectiveReachedText.y + this.mainObjectiveReachedText.height + 5;
                this.secondaryObjectiveReachedText = this.game.add.text(x, y, "Secondary objective completed!", {
                    font: "28px " + this.game.customConfigurations.ui.fontFamily,
                    fill: '#000000'
                });
                this.secondaryObjectiveReachedText.anchor.setTo(0.5, 0.5);
            }
        } else {
            this.mainObjectiveReachedText = this.game.add.text(this.background.width / 2,
                this.background.height / 2, "Game over, try again!", {
                    font: "64px " + this.game.customConfigurations.ui.fontFamily,
                    fill: '#000000'
                });
            this.mainObjectiveReachedText.anchor.setTo(0.5, 0.5);
        }
    };

    this.UIManager.prototype.cleanUp = function () {
        this.game.resourceUtil.cleanUp(this.btnReady);
        this.game.resourceUtil.cleanUp(this.btnReadyText);
        if (this.mainObjectiveReachedText != null) {
            this.game.resourceUtil.cleanUp(this.mainObjectiveReachedText);
        }
        if (this.secondaryObjectiveReachedText != null) {
            this.game.resourceUtil.cleanUp(this.secondaryObjectiveReachedText);
        }
    };

    return UIManager;
});
