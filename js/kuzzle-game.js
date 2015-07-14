var KuzzleGame = function(game) {};

KuzzleGame.prototype = {
    isGameStarted: false,
    countDownTimer: null,
    countDown: 0,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.KuzzleManager.init(this);
        KuzzleGame.MusicManager.init();
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
        this.game.stage.disableVisibilityChange = true;

        KuzzleGame.Background.create(this.game);
        KuzzleGame.SoundEffect.init(this.game);
        KuzzleGame.MusicManager.currentMusic.music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        KuzzleGame.MusicManager.currentMusic.music.onPlay.add(this.generateLevel, this);

        KuzzleGame.Player.init(this.game);
        KuzzleGame.HitZone.init(this.game);
        KuzzleGame.Arrow.init(this.game);
        KuzzleGame.Arrow.arrows = this.game.add.group();
        KuzzleGame.Keyboard.init(this.game, KuzzleGame.Arrow.arrows, this);
        KuzzleGame.Spell.init(this.game);
        KuzzleGame.Text.init(this.game);
        KuzzleGame.ScoreBar.init(this.game);
        KuzzleGame.Text.displayScore();

        this.waitForPlayer();
    },

    /**
     * Update your variables here. Typically, used for update your sprites coordinates (a loop is automaticaly launched by phaser)
     */
    update: function() {
        KuzzleGame.Background.update();

        if(KuzzleGame.Arrow.arrows && this.isGameStarted) {
            var arrowLeft = 0;
            for(var i=0; i<KuzzleGame.Arrow.arrows.length; i++) {
                if(!KuzzleGame.Arrow.arrows.children[i].isAlreadyHit) {
                    arrowLeft++;
                }
                if(KuzzleGame.Arrow.arrows.children[i].y > (KuzzleGame.HitZone.hitZoneY + KuzzleGame.HitZone.hitZoneHeight) && KuzzleGame.Arrow.arrows.children[i].isAlreadyHit === false) {
                    KuzzleGame.Arrow.arrows.children[i].isAlreadyHit = true;
                    KuzzleGame.Player.miss();
                    KuzzleGame.Arrow.miss(KuzzleGame.Arrow.arrows.children[i]);
                }
            }
            if(arrowLeft === 0 && !KuzzleGame.MusicManager.currentMusic.music.isPlaying) {
                this.isGameStarted = false;
                this.game.time.events.add(Phaser.Timer.SECOND * 3, this.gameOver, this);
            }
        }

        if(KuzzleGame.Player.isBlocked) {
            KuzzleGame.Spell.unBlock();
        }

        if(KuzzleGame.Player.isReversed) {
            KuzzleGame.Spell.unReverse();
        }

        if(KuzzleGame.Spell.pacman !== null && KuzzleGame.Arrow.arrows !== null) {
            this.game.physics.arcade.overlap(KuzzleGame.Spell.pacman, KuzzleGame.Arrow.arrows, KuzzleGame.Spell.onPacmanOverlap, null,  KuzzleGame.Spell);
        }

        if(KuzzleGame.Spell.kirbyBlowingHitZone !== null && typeof KuzzleGame.Arrow.arrows !== null) {
            this.game.physics.arcade.overlap(KuzzleGame.Spell.kirbyBlowingHitZone, KuzzleGame.Arrow.arrows, KuzzleGame.Spell.onKirbyBlowingHitZoneOverlap, null,  KuzzleGame.Spell);
        }
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {
        this.game.debug.text(this.game.time.suggestedFps, 32, 32);
    },

    start: function() {
        if(this.isGameStarted == false) {
            if(KuzzleGame.KuzzleManager.connexionEstablished === false) {
                KuzzleGame.KuzzleManager.hostUnregister();
            }
            KuzzleGame.MusicManager.currentMusic.music.play();
        }
    },

    stop: function() {
        this.isGameStarted = false;
        KuzzleGame.Level.arrowsMatrix = [];
        KuzzleGame.Arrow.arrows = null;
        if(KuzzleGame.MusicManager.currentMusic.music && KuzzleGame.MusicManager.currentMusic.music.isPlaying) {
            KuzzleGame.MusicManager.currentMusic.music.stop();
        }
        this.game.state.start("kuzzlegame");
    },

    generateLevel: function() {
        if(KuzzleGame.KuzzleManager.isHost) {
            KuzzleGame.Level.generateLevel();
            KuzzleGame.KuzzleManager.throwEvent('LEVEL_GENERATION', KuzzleGame.Level.arrowsMatrix);
            KuzzleGame.Arrow.generateArrows();
            KuzzleGame.Arrow.arrows.setAll('body.move', true);
            this.isGameStarted = true;
        }
    },

    waitForPlayer: function() {
        KuzzleGame.Text.displayWaitForPlayer();
    },

    startGameCountDown: function() {
        KuzzleGame.Text.displayWaitForPlayer(true);
        this.countDown = 3;
        KuzzleGame.Text.displayStartGameCountDown(this.countDown);
        this.countDownTimer = this.game.time.create(false);
        this.countDownTimer.loop(Phaser.Timer.SECOND, this.updateCountDownTimer, this);
        this.countDownTimer.start();
    },

    updateCountDownTimer: function() {
        if(--this.countDown === 0) {
            KuzzleGame.Text.displayStartGameCountDown(this.countDown, true);
            this.countDownTimer.stop();
            this.start();
        } else {
            KuzzleGame.Text.displayStartGameCountDown(this.countDown);
        }
    },

    gameOver: function() {
        KuzzleGame.KuzzleManager.hostUnregister();
        KuzzleGame.SoundEffect.pacmanMove(true);
        this.game.state.start("gameover");
    }
};
