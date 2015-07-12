KuzzleGame.SoundEffect = {};

KuzzleGame.SoundEffect = {
    game: null,

    hitSoundEffect: null,
    missSoundEffect: null,
    notEnoughScoreEffect: null,
    pacmanMoveEffect: null,
    pacmanEatEffect: null,
    newBonusEffect: null,

    init: function(game) {
        this.game = game;
        this.hitSoundEffect = this.game.add.audio('hit');
        this.missSoundEffect = this.game.add.audio('miss');
        this.pacmanMoveEffect = this.game.add.audio('pacman-move');
        this.pacmanEatEffect = this.game.add.audio('pacman-eat');
        this.newBonusEffect = this.game.add.audio('spell-bonus');

        this.hitSoundEffect.volume = 0.4;
        this.missSoundEffect.volume = 0.4;
        this.pacmanMoveEffect.volume = 0.4;
        this.pacmanEatEffect.volume = 0.4;
        this.newBonusEffect.volume = 0.4;
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
            if(!this.pacmanMoveEffect.isPlaying) {
                this.pacmanMoveEffect.loopFull();
            }
        } else {
            this.pacmanMoveEffect.stop();
        }
    },

    pacmanEat: function() {
        this.pacmanEatEffect.play();
    },

    newBonus: function() {
        this.newBonusEffect.play();
    }
};

