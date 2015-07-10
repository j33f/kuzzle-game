KuzzleGame.SoundEffect = {};

KuzzleGame.SoundEffect = {
    game: null,

    hitSoundEffect: null,
    missSoundEffect: null,

    init: function(game) {
        this.game = game;
        this.hitSoundEffect = this.game.add.audio('hit');
        this.missSoundEffect = this.game.add.audio('miss');
        this.hitSoundEffect.volume = 0.2;
        this.missSoundEffect.volume = 0.2;
    },

    hit: function() {
        this.hitSoundEffect.play();
    },

    miss: function() {
        this.missSoundEffect.play();
    }
};

