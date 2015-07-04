KuzzleGame.Arrow = typeof KuzzleGame.Arrow === 'undefined' ? {} : KuzzleGame.Arrow;

KuzzleGame.Arrow = {
    Sprite: function() {

        this.name = 'arrow';
        this.sprite = null;
        this.timeToDown = 2000;

        this.create = function(game, x, y, name) {
            this.name = name;
            this.sprite = game.add.sprite(x, y, this.name);
            this.sprite.animations.add(this.Animation.name);
            this.Animation.speed = (game.height - this.sprite.y) / this.timeToDown;
            this.Rectangle.init(x, y, this.sprite.width, this.sprite.height);
        };

        this.play = function() {
            this.sprite.play(this.Animation.name);
        };

        this.update = function(game) {
            this.sprite.y += this.Animation.speed * game.time.elapsed;

            this.Rectangle.init(this.sprite.x, this.sprite.y, this.sprite.width, this.sprite.height);

            if (this.sprite.y > game.height)
            {
                this.sprite.y = 0;
            }
        };

        this.Animation = {
            name: 'down',
            speed: 0
        };

        this.Rectangle = {
            x: 0,
            y: 0,
            width: 0,
            height: 0,

            init: function(x, y, width, height) {
                this.x = x;
                this.y = y;
                this.width = width;
                this.height = height;
            },

            getRectangle: function() {
                return new Phaser.Rectangle(this.x, this.y, this.width, this.height);
            }
        };
    }

};
