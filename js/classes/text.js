KuzzleGame.Text = {};

KuzzleGame.Text = {
    game: null,

    scoreText: null,
    comboText: null,
    bonusText: null,
    reverseText: null,

    init: function(game) {
        this.game = game;

        this.scoreText = this.game.add.text(this.game.width - 200, 32, 'Score: ' + KuzzleGame.Player.score, { font: "bold 20px Arial", fill: "#ff0044" });
        this.comboText = this.game.add.text(this.game.width - 200, 62, 'Combo: ' + KuzzleGame.Player.combo, { font: "bold 20px Arial", fill: "#ff0044" });
        this.bonusText = this.game.add.text(this.game.width - 200, 92, 'Bonus: ' + KuzzleGame.Spell.getActualSpellType(), { font: "bold 20px Arial", fill: "#ff0044" });
    },

    displayScore: function() {
        this.scoreText.setText('Score: ' + KuzzleGame.Player.score);
        this.displayCombo();
        this.displayBonus();
    },

    displayCombo: function() {
        this.comboText.setText('Combo: ' + KuzzleGame.Player.combo);
    },

    displayBonus: function() {
        this.bonusText.setText('Bonus: ' + KuzzleGame.Spell.getActualSpellType());
    },

    displayReverse: function(remove) {
        if(remove) {
            this.reverseText.destroy();
        } else {
            this.reverseText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'REVERSE', { font: "bold 60px Arial", fill: "#ff0044" });
            this.reverseText.anchor.setTo(0.5, 0.5);
        }
    }
};