KuzzleGame.Arrow = typeof KuzzleGame.Arrow === 'undefined' ? {} : KuzzleGame.Arrow;

KuzzleGame.Arrow = {
    Sprite: function() {

        this.name = 'arrow';
        this.x = null;
        this.y = null;
        this.sprite = null;


        this.create = function(game, x, y, name) {
            this.name = name;
            this.x = x;
            this.y = y;
            this.sprite = game.add.sprite(x, y, this.name);
            this.sprite.animations.add(this.Animation.name);
        };

        this.play = function() {
            this.sprite.play(this.Animation.name, this.Animation.speed, true);
        };

        this.update = function() {
            this.sprite.y += 5;
        };

        this.Animation = {
            name: 'down',
            speed: 10
        };
    }

};
