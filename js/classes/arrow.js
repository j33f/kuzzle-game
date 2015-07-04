KuzzleGame.Arrow = typeof KuzzleGame.Arrow === 'undefined' ? {} : KuzzleGame.Arrow;

KuzzleGame.Arrow = {
    Sprite: function() {

        this.name = 'arrow';
        this.lastTimestamp = 0;
        this.sprite = null;
        this.time = 0;
        this.count = 0;
        this.nbrLoop = 0;
        this.timeToDown = 4000;

        this.create = function(game, x, y, name) {
            this.name = name;
            this.sprite = game.add.sprite(x, y, this.name);
            this.sprite.animations.add(this.Animation.name);

            this.Animation.speed = (game.height - this.sprite.y) / this.timeToDown;
        };

        this.play = function() {
            this.sprite.play(this.Animation.name);
        };

        this.update = function(game) {
            this.lastTimestamp = this.lastTimestamp === 0 ? new Date().getTime() : this.lastTimestamp;
            var timestamp = new Date().getTime();
            this.sprite.y += this.Animation.speed * (timestamp - this.lastTimestamp);
            this.time += (timestamp - this.lastTimestamp);
            this.lastTimestamp = timestamp;

            if(this.time > 2000) {
                this.time = 0;
                console.log(this.sprite.y);
            }

            if (this.sprite.y > game.height)
            {
                this.sprite.y = 0;
            }
        };

        this.Animation = {
            name: 'down',
            speed: null
        };
    }

};
