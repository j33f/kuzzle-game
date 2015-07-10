var KuzzleGame = function(game) {
};

KuzzleGame.prototype = {
    arrows: null,
    isGameStarted: false,
    startButton: null,

    player: null,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.MusicManager.init();
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_EXTREME);
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

        this.hitZone = this.game.add.sprite(0, 400, 'button');
        this.hitZone.width = 800;
        this.hitZone.height = 100;
        this.game.physics.arcade.enable(this.hitZone, Phaser.Physics.ARCADE);

        KuzzleGame.Background.create(this.game);
        KuzzleGame.SoundEffect.init(this.game);

        KuzzleGame.Arrow.init(this.game);
        KuzzleGame.Arrow.arrows = this.game.add.group();

        KuzzleGame.Keyboard.init(this.game, this.arrows);

        KuzzleGame.MusicManager.currentMusic.music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        KuzzleGame.MusicManager.currentMusic.music.onPlay.add(this.generateLevel, this);

        KuzzleGame.HitZone.init(this.game);

        this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.start, this);
        this.startButton.anchor.setTo(0.5,0.5);
    },

    /**
     * Update your variables here. Typically, used for update your sprites coordinates (a loop is automaticaly launched by phaser)
     */
    update: function() {
        KuzzleGame.Background.update();

        if(KuzzleGame.MusicManager.currentMusic.music && KuzzleGame.MusicManager.currentMusic.music.isPlaying) {
            KuzzleGame.MusicManager.currentMusic.music.stop();
        }

        if(KuzzleGame.Arrow.arrows) {
            for(var i=0; i<KuzzleGame.Arrow.arrows.length; i++) {
                if(KuzzleGame.Arrow.arrows.children[i].y > (KuzzleGame.HitZone.hitZoneY + KuzzleGame.HitZone.hitZoneHeight) && KuzzleGame.Arrow.arrows.children[i].isAlreadyHit === false) {
                    KuzzleGame.Arrow.arrows.children[i].isAlreadyHit = true;
                    KuzzleGame.Player.miss();
                    KuzzleGame.Arrow.miss(KuzzleGame.Arrow.arrows.children[i]);
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

    displayScore: function() {
        this.game.debug.text('Score: ' + KuzzleGame.Player.score, this.game.width - 200, 32);
    },

    generateLevel: function() {
        KuzzleGame.Level.generateLevel();

        KuzzleGame.Arrow.generateArrows();
        KuzzleGame.Arrow.arrows.setAll('body.move', true);
    }
};
