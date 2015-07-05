KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    game: null,
    hitZone: Object,

    arrowSpriteCollection: [],
    leftArrowSprites: [],
    rightArrowSprites: [],
    upArrowSprites: [],
    downArrowSprites: [],

    keyboardKeyToIndex: [],
    oldKeyboardState: null,
    keyboardState: null,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.MusicManager.init();
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_HARD);
        KuzzleGame.MusicManager.loadMusic(this.game);
        KuzzleGame.Level.generateLevel();

        //this.game.load.audio('gazprom', ['assets/audio/gazprom_brutt_net.mp3']);
        this.game.load.spritesheet('arrow-1', 'assets/sprites/arrow-1.png', 62, 46, 1);
        this.game.load.spritesheet('arrow-2', 'assets/sprites/arrow-2.png', 62, 46, 1);
        this.game.load.spritesheet('arrow-3', 'assets/sprites/arrow-3.png', 46, 62, 1);
        this.game.load.spritesheet('arrow-4', 'assets/sprites/arrow-4.png', 46, 62, 1);
    },

    /**
     * Initialize your variables here
     */
    create: function() {

        this.keyboardKeyToIndex = [
            Phaser.Keyboard.LEFT,
            Phaser.Keyboard.RIGHT,
            Phaser.Keyboard.UP,
            Phaser.Keyboard.DOWN
        ];

        this.arrowSpriteCollection = [];

        var music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        //music.play();

        //build arrows array
        for(var i=0; i<KuzzleGame.Level.arrowsMatrix.length; i++) {
            this.arrowSpriteCollection[i] = [];
            for(var j=0; j<KuzzleGame.Level.arrowsMatrix[i].length; j++) {
                var arrowType = KuzzleGame.Level.arrowsMatrix[i][j];
                if(arrowType != 0) {
                    this.arrowSpriteCollection[i].push(new KuzzleGame.Arrow.Sprite().create(this.game, i*100+10, -(j*100), 'arrow-' + (i+1)));
                }
            }
        }

        //arrows speed TODO UPDATE WITH BPM
        KuzzleGame.Arrow.Animation.speed = (this.game.height - 0) / 4000;

        for(var i=0; i<this.arrowSpriteCollection.length; i++) {
            for(var j=0; j<this.arrowSpriteCollection[i].length; j++ ) {
                this.arrowSpriteCollection[i][j].play();
            }
        }

        this.hitZone = new Phaser.Rectangle(0, 450, 800, 50);
    },

    /**
     * Update your variables here. Typically, used for move your sprites (a loop is automaticaly launched by phaser)
     */
    update: function() {
        this.oldKeyboardState = this.keyboardState;

        this.keyboardState = new KuzzleGame.Keyboard.State();
        this.keyboardState.addKey(this.game, Phaser.Keyboard.LEFT);
        this.keyboardState.addKey(this.game, Phaser.Keyboard.RIGHT);
        this.keyboardState.addKey(this.game, Phaser.Keyboard.UP);
        this.keyboardState.addKey(this.game, Phaser.Keyboard.DOWN);

        for(var i=0; i<this.arrowSpriteCollection.length; i++) {
            for(var j=0; j<this.arrowSpriteCollection[i].length; j++ ) {
                if(this.arrowSpriteCollection[i][j].update(this.game) == 0) {
                    this.arrowSpriteCollection[i].splice(j, 1);
                }
            }
        }
    },

    /**
     * Update your render here (Typically used for text)
     */
    render: function() {

        this.game.debug.geom(this.hitZone);

        for(var i=0; i<this.keyboardKeyToIndex.length; i++) {
            if(this.keyboardState.isKeyDown(this.keyboardKeyToIndex[i]) && !this.oldKeyboardState.isKeyDown(this.keyboardKeyToIndex[i])) {
                if(this.arrowSpriteCollection[i].length) {
                    var firstArrow = this.arrowSpriteCollection[i][0];
                    var intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                    if(!intersect.empty) {
                        this.game.debug.geom(intersect, 'rgba(255,150,0,1)');
                    } else {
                        var arrow = this.arrowSpriteCollection[i].shift();
                        arrow.remove();
                    }
                }
            }
        }
    }
};
