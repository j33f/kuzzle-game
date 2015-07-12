KuzzleGame.Text = {};

KuzzleGame.Text = {
    game: null,

    scoreText: null,
    comboText: null,

    init: function(game) {
        this.game = game;

        this.scoreText = this.game.add.text(this.game.width - 200, 32, 'Score: ' + KuzzleGame.Player.score, { font: "bold 20px Arial", fill: "#ff0044" });
        this.comboText = this.game.add.text(this.game.width - 200, 62, 'Combo: ' + KuzzleGame.Player.combo, { font: "bold 20px Arial", fill: "#ff0044" });
    },

    displayScore: function() {
        this.scoreText.setText('Score: ' + KuzzleGame.Player.score);
        this.comboText.setText('Combo: ' + KuzzleGame.Player.combo);
    },

    displayCombo: function() {
        this.comboText.setText('Combo: ' + KuzzleGame.Player.combo);
    }
};