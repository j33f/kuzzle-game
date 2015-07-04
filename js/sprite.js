KuzzleGame.sprite = typeof KuzzleGame.sprite === 'undefined' ? {} : KuzzleGame;

KuzzleGame.sprite = {
    game: null,

    sprite: null,

    init: function(game) {
        console.log(game);
        this.game = game;
        console.log(this.game);
    },

    create: function(x, y, name, frameNumber) {
        this.sprite = this.game.add.sprite(x, y, name, frameNumber);
    }
};
