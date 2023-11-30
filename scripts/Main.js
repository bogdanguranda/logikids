require(["lib/phaser", "BootScene"], function () {
    var game = new Phaser.Game(1280, 720, Phaser.AUTO, "game-main");
    var bootScene = new BootScene(game);

    game.state.add("BootScene", bootScene);
    game.state.start("BootScene");
});