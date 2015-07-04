KuzzleGame.Arrow = typeof KuzzleGame.Arrow === 'undefined' ? {} : KuzzleGame.Arrow;

KuzzleGame.Arrow = {
    Sprite: {

        name: 'mummy',
        frames: 18,

        sprite: null,

        create: function(game, x, y) {
            this.sprite = game.add.sprite(x, y, this.name, this.speed);
            this.sprite.animations.add(this.Animation.name);
        },

        play: function() {
            this.sprite.play(this.Animation.name, this.Animation.speed, true);
        },

        Animation: {
            name: 'down',
            speed: 10
        }
    }

};
