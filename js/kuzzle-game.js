var KuzzleGame = function(game) {
};

KuzzleGame.prototype = {
    hitZone: Object,
    arrowSpriteCollection: [],

    keyboardKeyToIndex: [
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.UP,
        Phaser.Keyboard.DOWN
    ],

    oldKeyboardState: null,
    keyboardState: null,

    isGameStarted: false,
    startButton: null,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.MusicManager.init();
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_NORMAL);
        KuzzleGame.MusicManager.loadMusic(this.game);
        KuzzleGame.Level.generateLevel();
    },

    /**
     * Initialize your variables here
     */
    create: function() {
        KuzzleGame.MusicManager.currentMusic.music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);

        this.hit = this.game.add.audio('hit');
        this.miss = this.game.add.audio('miss');

        //arrows speed TODO UPDATE WITH BPM
        KuzzleGame.Arrow.Animation.speed = (this.game.height - 0) / KuzzleGame.MusicManager.currentMusic.difficulty;

        //build arrows array
        for(var i=0; i<KuzzleGame.Level.arrowsMatrix[0].length; i++) {
            var arrowType = KuzzleGame.Level.arrowsMatrix[0][i];
            if(arrowType != 0) {
                this.arrowSpriteCollection.push(new KuzzleGame.Arrow.Sprite().create(this.game, arrowType*100+10, -(i*100) - 500, 'arrow-' + arrowType, arrowType));
            }
        }

        for(var i=0; i<this.arrowSpriteCollection.length; i++) {
            this.arrowSpriteCollection[i].play();
        }

        this.hitZone = new Phaser.Rectangle(0, 450, 800, 100);


        this.startButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY, 'button', this.start, this);
        this.startButton.anchor.setTo(0.5,0.5);
    },

    /**
     * Update your variables here. Typically, used for update your sprites coordinates (a loop is automaticaly launched by phaser)
     */
    update: function() {
        if(this.isGameStarted && !KuzzleGame.MusicManager.currentMusic.music.isDecoding) {
            this.oldKeyboardState = this.keyboardState;

            this.keyboardState = new KuzzleGame.Keyboard.State();
            this.keyboardState.addKey(this.game, Phaser.Keyboard.LEFT);
            this.keyboardState.addKey(this.game, Phaser.Keyboard.RIGHT);
            this.keyboardState.addKey(this.game, Phaser.Keyboard.UP);
            this.keyboardState.addKey(this.game, Phaser.Keyboard.DOWN);

            for(var i=0; i<this.arrowSpriteCollection.length; i++) {
                if(this.arrowSpriteCollection[i].update(this.game) == 0) {
                    if(!this.arrowSpriteCollection[i].alreadyHit) {
                        KuzzleGame.Player.combo = 0;
                    }
                    this.arrowSpriteCollection.splice(i, 1);
                }
            }
        }
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {

        if(this.isGameStarted && !KuzzleGame.MusicManager.currentMusic.music.isDecoding) {
            this.game.debug.geom(this.hitZone);
            for(var i=0; i<this.keyboardKeyToIndex.length; i++) {
                if(this.keyboardState.isKeyDown(this.keyboardKeyToIndex[i]) && !this.oldKeyboardState.isKeyDown(this.keyboardKeyToIndex[i])) {
                    if(this.arrowSpriteCollection.length) {
                        var arrowIndex = 0;
                        var firstArrow = this.arrowSpriteCollection[arrowIndex];
                        if(firstArrow.alreadyHit) {
                            arrowIndex++;
                            firstArrow = this.arrowSpriteCollection[arrowIndex];
                        }
                        //check if type is good
                        var intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                        if(!intersect.empty && !firstArrow.alreadyHit && firstArrow.type == i+1) {
                            firstArrow.alreadyHit = true;
                            KuzzleGame.Player.hit();
                            this.hit.play();
                        } else {
                            //arrow.remove();
                            //var arrow = this.arrowSpriteCollection.shift();
                            firstArrow.sprite.loadTexture('button', 1, false);
                            firstArrow.alreadyHit = true;
                            KuzzleGame.Player.miss();
                            this.miss.play();
                        }
                    }
                }
            }
        }
    },

    start: function() {
        this.startButton.destroy();
        this.isGameStarted = true;
        KuzzleGame.MusicManager.currentMusic.music.play();
    }
};
