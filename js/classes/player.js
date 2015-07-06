Player = typeof KuzzleGame.Player === 'undefined' ? function(game){this.init()} : KuzzleGame.Player;

KuzzleGame.Player.prototype = {
    name: 'player 1',
    score: 0,
    combo: 0,
    accumulatedScore: 0,

    init: function() {
        console.log('init');
    },

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