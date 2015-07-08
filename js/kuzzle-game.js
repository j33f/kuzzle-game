var KuzzleGame = function(game) {
};

KuzzleGame.prototype = {
    //player: new KuzzleGame.Player(),

    hitZone: Object,
    arrows: null,
    cursors: null,
    isGameStarted: false,
    startButton: null,

    player: Object,

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

        this.player = new KuzzleGame.Player();

        KuzzleGame.MusicManager.currentMusic.music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        KuzzleGame.MusicManager.currentMusic.music.onPlay.add(this.generateLevel, this);
        /*KuzzleGame.MusicManager.currentMusic.music.onDecoded.add(function() {
            console.log('decoded');
        }, this);*/

        //this.hit = this.game.add.audio('hit');
        //this.miss = this.game.add.audio('miss');

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
        //KuzzleGame.MusicManager.currentMusic.music.loopFull();
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
            arrow.visible = false;
            var hit = this.game.physics.arcade.overlap(this.hitZone, arrow);
            if(hit) {
                if(key.keyCode === Phaser.Keyboard.LEFT && arrow.type === KuzzleGame.Level.ARROW_LEFT
                || key.keyCode === Phaser.Keyboard.RIGHT && arrow.type === KuzzleGame.Level.ARROW_RIGHT
                || key.keyCode === Phaser.Keyboard.UP && arrow.type === KuzzleGame.Level.ARROW_UP
                || key.keyCode === Phaser.Keyboard.DOWN && arrow.type === KuzzleGame.Level.ARROW_DOWN
                ) {
                    arrow.isAlreadyHit = true;
                    this.player.hit();
                } else {
                    arrow.isAlreadyHit = true;
                    this.player.miss();
                    this.explosion(arrow);
                }
            } else {
                arrow.isAlreadyHit = true;
                this.player.miss();
                this.explosion(arrow);
            }
        }
    },

    outOfBounds: function(obj) {
        if(obj.y > this.game.height) {
            obj.destroy();
        }
    },

    displayScore: function() {
        this.game.debug.text('Score: ' + this.player.score, this.game.width - 200, 32);
    },

    generateLevel: function() {
        KuzzleGame.Level.generateLevel();

        this.arrows = this.game.add.group();
        this.arrows.enableBody = true;
        this.arrows.physicsBodyType = Phaser.Physics.ARCADE;

        var bps = KuzzleGame.MusicManager.currentMusic.bpm / 60;
        console.log(KuzzleGame.MusicManager.currentMusic.bpm, bps);

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
    },

    explosion: function(sprite) {
        var explode = this.game.add.sprite(sprite.x, sprite.y, 'explosion', 1);
        var anim = explode.animations.add('explode');
        anim.loop = false;
        anim.play(15, true);
    }
};
