KuzzleGame.Text = {
    game: null,

    scoreText: null,
    comboText: null,
    bonusText: null,
    reverseText: null,
    waitForPlayerText: null,
    startGameCountDownText: null,

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
    },

    displayWaitForPlayer: function(remove) {
        if(remove) {
            this.waitForPlayerText.destroy();
        } else {
            this.waitForPlayerText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Wait for another player ...', { font: "bold 40px Arial", fill: "#ff0044" });
            this.waitForPlayerText.anchor.setTo(0.5, 0.5);
        }
    },

    displayStartGameCountDown: function(count, remove) {
        if(remove) {
            this.startGameCountDownText.destroy();
        } else {
            if(!this.startGameCountDownText) {
                this.startGameCountDownText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, count, { font: "bold 60px Arial", fill: "#ff0044" });
                this.startGameCountDownText.anchor.setTo(0.5, 0.5);
            } else {
                this.startGameCountDownText.setText(count);
            }
        }
    }
};