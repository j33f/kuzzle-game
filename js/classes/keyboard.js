KuzzleGame.Keyboard = {};

KuzzleGame.Keyboard = {
    game: null,
    cursors: null,
    spaceBar: null,

    init: function(game, arrows) {
        this.game = game;
        this.arrows = arrows;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors.left.onDown.add(this.onCursorDown, this);
        this.cursors.right.onDown.add(this.onCursorDown, this);
        this.cursors.up.onDown.add(this.onCursorDown, this);
        this.cursors.down.onDown.add(this.onCursorDown, this);

        this.spaceBar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.spaceBar.onDown.add(this.onSpaceBarDown, this);

        this.escape = this.game.input.keyboard.addKey(Phaser.Keyboard.ESC);
        this.escape.onDown.add(this.onEscapeDown, this);
    },

    onCursorDown: function(key) {
        if(!KuzzleGame.Player.isBlocked) {
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
                    var arrowType = !KuzzleGame.Player.isReversed ? arrow.type : arrow.reversedType;

                    if(key.keyCode === Phaser.Keyboard.LEFT && arrowType === KuzzleGame.Level.ARROW_LEFT
                        || key.keyCode === Phaser.Keyboard.RIGHT && arrowType === KuzzleGame.Level.ARROW_RIGHT
                        || key.keyCode === Phaser.Keyboard.UP && arrowType === KuzzleGame.Level.ARROW_UP
                        || key.keyCode === Phaser.Keyboard.DOWN && arrowType === KuzzleGame.Level.ARROW_DOWN
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
    },

    onSpaceBarDown: function(key) {
        KuzzleGame.Spell.sendSpell();
    },

    onEscapeDown: function(key) {
        this.togglePause()
    },

    togglePause: function() {
        this.game.paused = !this.game.paused;
    }
};