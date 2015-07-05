var GameTitle = function(game) {};

GameTitle.prototype = {
    preload: function() {
        console.log('game title preload');
    },

    create: function() {
        console.log('game title create');

        //var playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.playGame, this);
        //playButton.anchor.setTo(0.5,0.5);
        this.playGame();
    },

    playGame: function() {
        console.log('playgame')
        this.game.state.start("kuzzlegame");
    }
};
