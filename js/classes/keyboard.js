KuzzleGame.Keyboard = {};

KuzzleGame.Keyboard = {
    game: null,
    cursors: null,

    init: function(game, arrows) {
        this.game = game;
        this.arrows = arrows;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors.left.onDown.add(this.onCursorDown, this);
        this.cursors.right.onDown.add(this.onCursorDown, this);
        this.cursors.up.onDown.add(this.onCursorDown, this);
        this.cursors.down.onDown.add(this.onCursorDown, this);
    },

    onCursorDown: function(key) {
        var arrow = null;

        for(var i=0; i<KuzzleGame.Arrow.arrows.children.length; i++) {
            arrow = KuzzleGame.Arrow.arrows.children[i];
            if(!arrow.isAlreadyHit) {
                break;
            }
        }

        if(arrow !== null) {
            var hit = this.game.physics.arcade.overlap(KuzzleGame.HitZone.rectangle, arrow);
            if(hit) {
                if(key.keyCode === Phaser.Keyboard.LEFT && arrow.type === KuzzleGame.Level.ARROW_LEFT
                    || key.keyCode === Phaser.Keyboard.RIGHT && arrow.type === KuzzleGame.Level.ARROW_RIGHT
                    || key.keyCode === Phaser.Keyboard.UP && arrow.type === KuzzleGame.Level.ARROW_UP
                    || key.keyCode === Phaser.Keyboard.DOWN && arrow.type === KuzzleGame.Level.ARROW_DOWN
                ) {
                    arrow.isAlreadyHit = true;
                    KuzzleGame.Player.hit();
                    KuzzleGame.Arrow.hit(arrow);
                } else {
                    arrow.isAlreadyHit = true;
                    KuzzleGame.Player.miss();
                    KuzzleGame.Arrow.miss(arrow);
                }
            } else {
                arrow.isAlreadyHit = true;
                KuzzleGame.Player.miss();
                KuzzleGame.Arrow.miss(arrow);
            }
        }
    }
};