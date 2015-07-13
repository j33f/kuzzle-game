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

        KuzzleGame.Player.init();
        KuzzleGame.Arrow.init(this.game);
        KuzzleGame.Arrow.arrows = this.game.add.group();
        KuzzleGame.Keyboard.init(this.game, KuzzleGame.Arrow.arrows);
        KuzzleGame.HitZone.init(this.game);
        KuzzleGame.Spell.init(this.game);
        KuzzleGame.Text.init(this.game);
        KuzzleGame.Text.displayScore();

        this.waitForPlayer();
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
            if(arrowLeft === 0 && this.isGameStarted && !KuzzleGame.MusicManager.currentMusic.music.isPlaying) {
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

        if(typeof KuzzleGame.Spell.pacman !== 'undefined' && typeof KuzzleGame.Arrow.arrows !== 'undefined') {
            this.game.physics.arcade.collide(KuzzleGame.Spell.pacman, KuzzleGame.Arrow.arrows, KuzzleGame.Spell.onPacmanCollide, null,  KuzzleGame.Spell);
        }
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {
        this.game.debug.text(this.game.time.suggestedFps, 32, 32);
    },

    start: function() {
        this.isGameStarted = true;

        if(KuzzleGame.KuzzleManager.isHost){
            KuzzleGame.KuzzleManager.throwEvent('START_GAME','start');
        }

        KuzzleGame.MusicManager.currentMusic.music.play();
    },

    generateLevel: function() {
        console.log('GENERATE LEVEL');
        if(KuzzleGame.KuzzleManager.isHost) {
            KuzzleGame.Level.generateLevel();
            KuzzleGame.kuzzleGame.throwEvent('LEVEL_GENERATION', KuzzleGame.Level.arrowsMatrix);
            KuzzleGame.Arrow.generateArrows();
            KuzzleGame.Arrow.arrows.setAll('body.move', true);
        }
    },

    waitForPlayer: function() {
        KuzzleGame.Text.displayWaitForPlayer();
        //this.game.time.events.add(Phaser.Timer.SECOND * 5, this.startGameCountDown, this);
        /*var timer = this.game.time.create(false);
        timer.loop(Phaser.Timer.SECOND, this.startGameCountDown, this);
        timer.start();*/
    },

    startGameCountDown: function() {
        //console.log(KuzzleGame.KuzzleManager.connexionEstablished);
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
        this.game.state.start("gameover");
    }
};
