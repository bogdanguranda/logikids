define(["lib/phaser", "level/logic/Timeline", "level/model/actions/Walk", "level/model/actions/Jump", "level/model/actions/Attack", "level/model/actions/Crawl",
    "level/model/actions/Climb", "level/model/actions/Pick"], function () {
    this.TimelineManager = function (game) {
        this.game = game;

        this.actionsNames = [];
        this.actions = {};
    };

    this.TimelineManager.prototype.loadAssets = function () {
        this.game.load.image("actionsBar", "img/level/ui/actionsBar.png");

        this.game.load.image("actionWalk", "img/level/actions/walk.png");
        this.game.load.image("actionJump", "img/level/actions/jump.png");
        this.game.load.image("actionAttack", "img/level/actions/attack.png");
        this.game.load.image("actionCrawl", "img/level/actions/crawl.png");
        this.game.load.image("actionClimb", "img/level/actions/climb.png");
        this.game.load.image("actionPick", "img/level/actions/pick.png");

        this.actionsNames.push("actionWalk");
        this.actionsNames.push("actionJump");
        this.actionsNames.push("actionAttack");
        this.actionsNames.push("actionCrawl");
        this.actionsNames.push("actionClimb");
        this.actionsNames.push("actionPick");

        this.game.load.image("timelineBar", "img/level/ui/timelineBar.png");
        this.game.load.image("timelineCharacterIcon", "img/level/ui/timelineCharacterIcon.png");
    };

    this.TimelineManager.prototype.create = function (actionsBarY) {
        this.actionsBar = this.game.add.sprite(0, actionsBarY, "actionsBar");
        this.game.physics.arcade.enable(this.actionsBar);
        this.actionsBar.body.immovable = true;

        this.actionsBarText = this.game.add.text(20, this.actionsBar.y + this.actionsBar.height / 2, "Actions",
            {font: "38px " + this.game.customConfigurations.ui.fontFamily, fill: '#4d2600'});
        this.actionsBarText.anchor.y = 0.5;

        var actionsWidth = 70.0;
        var actionsSpacing = 5;
        var actionsStartingX = this.actionsBarText.right + actionsWidth / 2 + actionsSpacing;
        var actionsY = this.actionsBar.y + this.actionsBar.height / 2;

        this.timelineBar = this.game.add.sprite(0, this.actionsBar.y + this.actionsBar.height, "timelineBar");
        this.timelineCharacterIcon = this.game.add.sprite(80, this.timelineBar.y + this.timelineBar.height / 2, "timelineCharacterIcon");
        this.timelineCharacterIcon.anchor.setTo(0.5, 0.5);

        this.timeline = new Timeline(this.game, this.timelineBar.y + (this.timelineBar.height / 2));

        for (var i = 0; i < this.actionsNames.length; i++) {
            var action = this.createAction(this.actionsNames[i], actionsStartingX + (actionsWidth + actionsSpacing) * i, actionsY, true);
            this.actions[action.name] = action;
        }
    };

    this.TimelineManager.prototype.createAction = function (actionName, x, y, isModel) {
        var sprite = this.game.add.sprite(x, y, actionName);
        sprite.anchor.setTo(0.5, 0.5);
        sprite.inputEnabled = true;
        sprite.input.enableDrag();
        this.game.physics.arcade.enable(sprite);

        var action;
        if (actionName === "actionWalk") {
            action = new Walk(this.game, actionName, sprite, isModel, 100);
        } else if (actionName === "actionJump") {
            action = new Jump(this.game, actionName, sprite, isModel, 400, 100);
        } else if (actionName === "actionAttack") {
            action = new Attack(this.game, actionName, sprite, isModel);
        } else if (actionName === "actionCrawl") {
            action = new Crawl(this.game, actionName, sprite, isModel, 100, 100);
        } else if (actionName === "actionClimb") {
            action = new Climb(this.game, actionName, sprite, isModel, 100);
        } else if (actionName === "actionPick") {
            action = new Pick(this.game, actionName, sprite, isModel);
        }

        this.setActionHandlers(action);

        return action;
    };

    this.TimelineManager.prototype.setActionHandlers = function (action) {
        if (action.isModel) {
            action.sprite.events.onDragStop.add(function () {
                if (Phaser.Rectangle.intersects(action.sprite.getBounds(), this.timelineBar.getBounds())) {
                    var cloneAction = this.createAction(action.name, action.sprite.x, action.sprite.y, false);
                    this.timeline.addAction(cloneAction);
                }
                action.moveHome();
            }, this);
        } else {
            action.sprite.events.onDragStop.add(function () {
                if (!Phaser.Rectangle.intersects(action.sprite.getBounds(), this.timelineBar.getBounds())) {
                    this.timeline.removeAction(action);
                } else {
                    action.moveHome();
                }
            }, this);
        }
    };

    this.TimelineManager.prototype.disableActions = function () {
        for (var key in this.actions) {
            if (this.actions.hasOwnProperty(key)) {
                this.actions[key].sprite.input.disableDrag();
            }
        }

        for (var i = 0; i < this.timeline.actions.length; i++) {
            this.timeline.actions[i].sprite.input.disableDrag();
        }
    };

    this.TimelineManager.prototype.cleanUp = function () {
        this.game.resourceUtil.cleanUp(this.actionsBar);
        this.game.resourceUtil.cleanUp(this.actionsBarText);
        this.actionsNames = [];
        this.actions = {};

        this.game.resourceUtil.cleanUp(this.timelineBar);
        this.game.resourceUtil.cleanUp(this.timelineCharacterIcon);
        this.timeline = null;
    };

    return TimelineManager;
});