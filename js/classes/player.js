KuzzleGame.Player = {};

KuzzleGame.Player = {
    name: 'player 1',
    score: 0,
    combo: 0,
    accumulatedScore: 0,

    hit: function() {
        this.combo++;
        this.score += this.combo;
        KuzzleGame.SoundEffect.hit();
    },

    miss: function() {
        this.combo = 0;
        KuzzleGame.SoundEffect.miss();
    }
};