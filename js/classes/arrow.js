KuzzleGame.Arrow = {};

KuzzleGame.Arrow = {
    game: null,

    init: function(game) {
        this.game = game;
    },

    hit: function(sprite) {
        this.game.add.tween(sprite.scale).to({ x: 1.2, y: 1.2 }, 500, Phaser.Easing.Bounce.Out, true);
        //this.game.add.tween(sprite).to({ x: 1.2, y: 1.2 }, 500, Phaser.Easing.Bounce.Out, true);
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
    }
};
