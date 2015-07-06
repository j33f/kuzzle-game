KuzzleGame.Player = typeof KuzzleGame.Player === 'undefined' ? {} : KuzzleGame.Player;

KuzzleGame.Player = {
    name: 'player 1',
    score: 0,
    combo: 0,
    accumulatedScore: 0,

    hit: function() {
        console.log('it\'s a hit !');
        this.combo++;
        this.score += this.combo;
    },

    miss: function() {
        console.log('MISS !');
        this.combo = 0;
    }
};