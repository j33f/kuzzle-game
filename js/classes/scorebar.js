KuzzleGame.ScoreBar = {
    game: null,

    progressBar: null,

    init: function(game) {
        this.game = game;
        this.createProgressBar();
    },

    createProgressBar: function() {
        this.progressBar = this.game.add.graphics(this.game.width - 230, 150);
        this.anchor.set(0.5, 0.5);
        this.progressBar.lineStyle(30, 0xE6ED1F, 1);
        this.progressBar.lineTo(this.progressBar.x + 5, 0);
        //this.hurtLines.drawRect(0, 0, this.game.width, this.game.height);
    }
};
