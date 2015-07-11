KuzzleGame.Arrow = {};

KuzzleGame.Arrow = {
    game: null,
    arrows: null,
    distanceBetweenArrows: 100,

    init: function(game) {
        this.game = game;
    },

    generateArrows: function() {
        this.arrows.enableBody = true;
        this.arrows.physicsBodyType = Phaser.Physics.ARCADE;

        var bps = KuzzleGame.MusicManager.currentMusic.bpm / 60;
        //build arrows array
        for(var i=0; i<KuzzleGame.Level.arrowsMatrix.length; i++) {
            var arrowType = KuzzleGame.Level.arrowsMatrix[i];
            if(arrowType != 0) {
                var arrow = this.arrows.create(arrowType*100+10, 0 - (i*this.distanceBetweenArrows), 'arrow-' + arrowType);
                arrow.y -= arrow.height/2;
                arrow.name = 'arrow' + i;
                arrow.type = arrowType;
                arrow.isAlreadyHit = false;
                arrow.checkWorldBounds = true;
                arrow.events.onOutOfBounds.add( this.outOfBounds, this );
                arrow.body.move = false;
                arrow.body.velocity.y = this.distanceBetweenArrows * bps;

                if(arrowType === KuzzleGame.Level.ARROW_LEFT) {
                    arrow.reversedType = KuzzleGame.Level.ARROW_RIGHT;
                } else if(arrowType === KuzzleGame.Level.ARROW_RIGHT) {
                    arrow.reversedType = KuzzleGame.Level.ARROW_LEFT;
                } else if(arrowType === KuzzleGame.Level.ARROW_UP) {
                    arrow.reversedType = KuzzleGame.Level.ARROW_DOWN;
                } else if(arrowType === KuzzleGame.Level.ARROW_DOWN) {
                    arrow.reversedType = KuzzleGame.Level.ARROW_UP;
                }
            }
        }

        KuzzleGame.Spell.generateSpell();
    },

    hit: function(sprite) {
        this.game.add.tween(sprite.scale).to({ x: 2, y: 2 }, 200, Phaser.Easing.Bounce.Out, true);
        //this.game.add.tween(sprite).from({ x: 100 }, 500, Phaser.Easing.Bounce.Out, true);
    },

    miss: function(sprite) {
        sprite.visible = false;
        var explosion = this.game.add.sprite(sprite.x, sprite.y, 'explosion');
        var animation = explosion.animations.add('explode');
        animation.onLoop.add(this.onExplosionLooped, this);
        animation.play(75, true);
    },

    onExplosionLooped: function(sprite, animation) {
        sprite.destroy();
    },

    outOfBounds: function(arrow) {
        if(arrow.y > this.game.height) {
            arrow.destroy();
        }
    }
};
