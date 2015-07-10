var KuzzleGame = function(game) {
};

KuzzleGame.prototype = {
    //player: new KuzzleGame.Player(),

    hitZone: null,
    arrows: null,
    cursors: null,
    isGameStarted: false,
    startButton: null,

    player: null,

    distanceBetweenArrows: 100,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.MusicManager.init();
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_NORMAL);
        KuzzleGame.MusicManager.loadMusic(this.game);
    },

    /**
     * Initialize your variables here
     */
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //  We only want world bounds on the left and right
        this.game.physics.setBoundsToWorld();
        this.game.time.desiredFps = 30;

        KuzzleGame.Background.create(this.game);
        KuzzleGame.SoundEffect.init(this.game);
        KuzzleGame.Arrow.init(this.game);

        KuzzleGame.MusicManager.currentMusic.music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        KuzzleGame.MusicManager.currentMusic.music.onPlay.add(this.generateLevel, this);

        this.hitZone = this.game.add.sprite(0, 400, 'button');
        this.hitZone.width = 800;
        this.hitZone.height = 100;
        this.game.physics.arcade.enable(this.hitZone, Phaser.Physics.ARCADE);

        this.cursors = this.game.input.keyboard.createCursorKeys();
        this.cursors.left.onDown.add(this.onCursorDown, this);
        this.cursors.right.onDown.add(this.onCursorDown, this);
        this.cursors.up.onDown.add(this.onCursorDown, this);
        this.cursors.down.onDown.add(this.onCursorDown, this);


        this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.start, this);
        this.startButton.anchor.setTo(0.5,0.5);
    },

    /**
     * Update your variables here. Typically, used for update your sprites coordinates (a loop is automaticaly launched by phaser)
     */
    update: function() {
        KuzzleGame.Background.update();
        if(this.arrows) {
            for(var i=0; i<this.arrows.length; i++) {
                if(this.arrows.children[i].y > (this.hitZone.y + this.hitZone.height) && this.arrows.children[i].isAlreadyHit === false) {
                    this.arrows.children[i].isAlreadyHit = true;
                    KuzzleGame.Player.miss();
                }
            }
        }
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {
        this.game.debug.text(this.game.time.suggestedFps, 32, 32);

        this.displayScore();
    },

    start: function() {
        this.startButton.destroy();
        this.isGameStarted = true;

        KuzzleGame.MusicManager.currentMusic.music.play();
    },

    pause: function() {
        this.game.paused = true;
        // Add a input listener that can help us return from being paused
        this.game.input.onDown.add(this.unPause, this);
    },

    unPause: function() {
        this.game.paused = false;
    },

    onCursorDown: function(key) {
        var arrow = null;

        for(var i=0; i<this.arrows.children.length; i++) {
            arrow = this.arrows.children[i];
            if(!arrow.isAlreadyHit) {
                break;
            }
        }

        if(arrow !== null) {
            var hit = this.game.physics.arcade.overlap(this.hitZone, arrow);
            if(hit) {
                if(key.keyCode === Phaser.Keyboard.LEFT && arrow.type === KuzzleGame.Level.ARROW_LEFT
                || key.keyCode === Phaser.Keyboard.RIGHT && arrow.type === KuzzleGame.Level.ARROW_RIGHT
                || key.keyCode === Phaser.Keyboard.UP && arrow.type === KuzzleGame.Level.ARROW_UP
                || key.keyCode === Phaser.Keyboard.DOWN && arrow.type === KuzzleGame.Level.ARROW_DOWN
                ) {
                    arrow.isAlreadyHit = true;
                    KuzzleGame.Player.hit();
                    KuzzleGame.Arrow.hit(this.game, arrow);
                } else {
                    arrow.visible = false;
                    arrow.isAlreadyHit = true;
                    KuzzleGame.Player.miss();
                    KuzzleGame.Arrow.miss(arrow);
                }
            } else {
                arrow.visible = false;
                arrow.isAlreadyHit = true;
                KuzzleGame.Player.miss();
                KuzzleGame.Arrow.miss(arrow);
            }
        }
    },

    outOfBounds: function(obj) {
        if(obj.y > this.game.height) {
            obj.destroy();
        }
    },

    displayScore: function() {
        this.game.debug.text('Score: ' + KuzzleGame.Player.score, this.game.width - 200, 32);
    },

    generateLevel: function() {
        KuzzleGame.Level.generateLevel();

        this.arrows = this.game.add.group();
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
            }
        }

        this.arrows.setAll('body.move', true);
    }
};
