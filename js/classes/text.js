KuzzleGame.Text = {
    game: null,

    scoreText: null,
    comboText: null,
    bonusText: null,
    reverseText: null,
    blockText: null,
    waitForPlayerText: null,
    startGameCountDownText: null,
    pressSpaceBarText: null,
    pauseText: null,

    init: function(game) {
        this.game = game;

        this.scoreText = this.game.add.text(this.game.width - 230, 32, 'Score: ' + KuzzleGame.Player.score, { font: "bold 20px Arial", fill: "#26E6FF" });
        this.scoreText.stroke = '#000000';
        this.scoreText.strokeThickness = 3;

        this.comboText = this.game.add.text(this.game.width - 230, 62, 'Combo: ' + KuzzleGame.Player.combo, { font: "bold 20px Arial", fill: "#26E6FF" });
        this.comboText.stroke = '#000000';
        this.comboText.strokeThickness = 3;

        this.bonusText = this.game.add.text(this.game.width - 230, 92, 'Bonus: ', { font: "bold 20px Arial", fill: "#26E6FF" });
        this.bonusText.stroke = '#000000';
        this.bonusText.strokeThickness = 3;

        this.opponentScore = this.game.add.text(this.game.width - 230, 122, 'Opponent score: ' + KuzzleGame.Player.opponentScore, { font: "bold 20px Arial", fill: "#26E6FF" });
        this.opponentScore.stroke = '#000000';
        this.opponentScore.strokeThickness = 3;
    },

    displayScore: function() {
        this.scoreText.setText('Score: ' + KuzzleGame.Player.score);
        this.displayCombo();
        //this.displayBonus();
    },

    displayCombo: function() {
        this.comboText.setText('Combo: ' + KuzzleGame.Player.combo);
    },

    displayReverse: function(remove) {
        if(remove) {
            this.reverseText.destroy();
            this.reverseText = null;
        } else {
            if(this.reverseText === null) {
                this.reverseText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'REVERSE', { font: "bold 60px Arial", fill: "#ff0044", align: 'center' });
                this.reverseText.anchor.setTo(0.5, 0.5);
            } else {
                this.reverseText.setText('REVERSE');
            }
        }
    },

    displayBlocking: function(remove) {
        if(remove) {
            this.blockText.destroy();
            this.blockText = null;
        } else {
            if(this.blockText === null) {
                this.blockText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'KEYS BLOCKED', { font: "bold 60px Arial", fill: "#ff0044", align: 'center' });
                this.blockText.anchor.setTo(0.5, 0.5);
            } else {
                this.blockText.setText('KEYS BLOCKED');
            }
        }
    },

    displayWaitForPlayer: function(remove) {
        if(remove) {
            this.waitForPlayerText.destroy();
            this.waitForPlayerText = null;
        } else {
            if(this.waitForPlayerText !== null) {
                this.waitForPlayerText.destroy();
                this.waitForPlayerText = null;
            }

            this.waitForPlayerText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Wait for another player ...', { font: "bold 40px Arial", fill: "#B545FF", align: 'center' });
            this.waitForPlayerText.anchor.setTo(0.5, 0.5);
            this.waitForPlayerText.stroke = '#000000';
            this.waitForPlayerText.strokeThickness = 3;
            this.waitForPlayerText.alpha = 0.0;

            this.game.add.tween(this.waitForPlayerText).to( { alpha: 1 }, 1000, "Linear", true);
        }
    },

    displayStartGameCountDown: function(count, remove) {
        if(remove) {
            this.startGameCountDownText.destroy();
            this.startGameCountDownText = null;
        } else {
            if(this.startGameCountDownText === null) {
                this.startGameCountDownText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, count, { font: "bold 60px Arial", fill: "#ff0044", align: 'center' });
                this.startGameCountDownText.anchor.setTo(0.5, 0.5);
            } else {
                this.startGameCountDownText.setText(count);
            }
        }
    },

    displayPressSpaceBar: function(remove) {
        if(remove && this.pressSpaceBarText) {
            this.pressSpaceBarText.destroy();
            this.pressSpaceBarText = null;
        } else {
            if(this.pressSpaceBarText === null) {
                this.pressSpaceBarText = this.game.add.text(this.game.width - 230, 152, 'Press Spacebar !', { font: "bold 25px Arial", fill: "#ff0044" });
                var pressSpaceBarTween = this.game.add.tween(this.pressSpaceBarText).to({alpha: 0}, 250, Phaser.Easing.Linear.None, true, 0, -1);
                pressSpaceBarTween.yoyo(true, 0);
            } else {
                this.pressSpaceBarText.setText('Press Spacebar !');
            }
        }
    },

    displayOpponentScore: function() {
        this.opponentScore.setText('Opponent score: ' + KuzzleGame.Player.opponentScore);
    },

    displayPause: function(remove) {
        if(remove) {
            this.pauseText.destroy();
            this.pauseText = null;
        } else {
            if(this.pauseText === null) {
                this.pauseText = this.game.add.text(this.game.world.centerX, this.game.world.centerY, "Pause...\nPress esc to resume", { font: "bold 40px Arial", fill: "#ff0044", align: 'center' });
                this.pauseText.anchor.setTo(0.5, 0.5);
            } else {
                this.pauseText.setText("Pause...\nPress esc to resume");
            }
        }
    }
};