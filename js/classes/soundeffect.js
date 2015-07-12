KuzzleGame.SoundEffect = {};

KuzzleGame.SoundEffect = {
    game: null,

    hitSoundEffect: null,
    missSoundEffect: null,
    notEnoughScoreEffect: null,
    pacmanMoveEffect: null,
    pacmanEatEffect: null,

    init: function(game) {
        this.game = game;
        this.hitSoundEffect = this.game.add.audio('hit');
        this.missSoundEffect = this.game.add.audio('miss');
        this.pacmanMoveEffect = this.game.add.audio('pacman-move');
        this.pacmanEatEffect = this.game.add.audio('pacman-eat');

        this.hitSoundEffect.volume = 0.2;
        this.missSoundEffect.volume = 0.2;
        this.pacmanMoveEffect.volume = 0.2;
        this.pacmanEatEffect.volume = 0.2;
    },

    hit: function() {
        this.hitSoundEffect.play();
    },

    miss: function() {
        this.missSoundEffect.play();
    },

    notEnoughScore: function() {
        this.notEnoughScoreEffect.play();
    },

    pacmanMove: function(stop) {
        if(!stop) {
            this.pacmanMoveEffect.loopFull();
        } else {
            this.pacmanMoveEffect.stop();
        }
    },

    pacmanEat: function() {
        this.pacmanEatEffect.play();
    }
};

