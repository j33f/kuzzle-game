var GameTitle = function(game) {};

GameTitle.prototype = {
    normalButton: null,
    hardButton: null,
    extremeButton: null,
    howToPlayButton: null,

    preload: function() {
    },

    create: function() {
        var gameTitle = this.game.add.text(this.game.world.centerX, this.game.world.centerY - 200, 'Game title', { font: "bold 40px Arial", fill: "#ff0044", align: "center" });
        gameTitle.anchor.setTo(0.5, 0.5);

        this.normalButton =  this.game.add.text(this.game.world.centerX,
            this.game.world.centerY - 50, 'Normal', { font: "30px Arial", fill: "#ff0044", align: "center" });
        this.normalButton.anchor.setTo(0.5, 0.5);
        this.normalButton.inputEnabled = true;
        this.normalButton.events.onInputDown.add(this.selectNormalMode, this);

        this.hardButton = this.game.add.text(this.game.world.centerX,
            this.game.world.centerY + 50, 'Hard', { font: "30px Arial", fill: "#ff0044", align: "center" });
        this.hardButton.anchor.setTo(0.5, 0.5);
        this.hardButton.inputEnabled = true;
        this.hardButton.events.onInputDown.add(this.selectHardMode, this);

        this.extremeButton = this.game.add.text(this.game.world.centerX,
            this.game.world.centerY + 150, 'Extreme', { font: "30px Arial", fill: "#ff0044", align: "center" });
        this.extremeButton.anchor.setTo(0.5, 0.5);
        this.extremeButton.inputEnabled = true;
        this.extremeButton.events.onInputDown.add(this.selectExtremeMode, this);

        this.howToPlayButton = this.game.add.text(this.game.world.centerX,
            this.game.world.centerY + 250, 'How to play', { font: "30px Arial", fill: "#ff0044", align: "center" });
        this.howToPlayButton.anchor.setTo(0.5, 0.5);
        this.howToPlayButton.inputEnabled = true;
        this.howToPlayButton.events.onInputDown.add(this.selectHowToPlay, this);

        var kirby = this.game.add.sprite(200, 360, 'kirby', 49);
        kirby.anchor.set(0.5, 0.5);
        var kirbyWalkAnimation = kirby.animations.add('walk', [9,10,11,12,13]);
        kirbyWalkAnimation.play(9, true);
        //var kirbyBlowAnimation = kirby.animations.add('blow', [49, 48]);
        //kirbyBlowAnimation.play(5, false);
    },

    playGame: function() {
        this.game.state.start("kuzzlegame");
    },

    selectNormalMode: function() {
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_NORMAL);
        this.playGame();
    },

    selectHardMode: function() {
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_HARD);
        this.playGame();
    },

    selectExtremeMode: function() {
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_EXTREME);
        this.playGame();
    },

    selectHowToPlay: function() {
        this.game.state.start("howtoplay");
    }
};
