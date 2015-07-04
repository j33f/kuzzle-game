KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {



    preload: function() {
        console.log('preload game');
    },

    create: function() {
        sprite.create(200, 360, 'mummy', 5);
    }
}