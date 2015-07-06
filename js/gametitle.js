var GameTitle = function(game) {};

GameTitle.prototype = {
    preload: function() {
    },

    create: function() {
        //var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.playGame, this);
        //playButton.anchor.setTo(0.5,0.5);
        this.playGame();
    },

    playGame: function() {
        this.game.state.start("kuzzlegame");
    }
};
