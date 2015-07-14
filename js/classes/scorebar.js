KuzzleGame.ScoreBar = {
    game: null,

    progressBar: null,

    init: function(game) {
        this.game = game;
    },

    createProgressBar: function() {
        this.hurtLines = this.game.add.graphics(0, 0);
        this.hurtLines.lineStyle(30, 0xCF152A, 1);
        //this.hurtLines.drawRect(0, 0, this.game.width, this.game.height);
        this.hurtLines.alpha = 0;
    }
};
