KuzzleGame.SoundEffect = {};

KuzzleGame.SoundEffect = {
    game: null,

    hitSoundEffect: null,
    missSoundEffect: null,

    init: function(game) {
        this.game = game;
        this.hitSoundEffect = this.game.add.audio('hit');
        this.missSoundEffect = this.game.add.audio('miss');
    },

    hit: function() {
        this.hitSoundEffect.play();
    },

    miss: function() {
        this.missSoundEffect.play();
    }
};

