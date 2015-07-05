KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    game: null,
    hitZone: Object,

    arrowSpriteCollection: [],
    leftArrowSprites: [],
    rightArrowSprites: [],
    upArrowSprites: [],
    downArrowSprites: [],

    leftKey: null,
    rightKey: null,
    upKey: null,
    downKey: null,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.MusicManager.init();
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_HARD);
        KuzzleGame.MusicManager.loadMusic(this.game);
        KuzzleGame.Level.generateLevel();

        //this.game.load.audio('gazprom', ['assets/audio/gazprom_brutt_net.mp3']);
        //this.game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
        this.game.load.spritesheet('arrow', 'assets/sprites/arrow.png', 62, 46, 1);
    },

    /**
     * Initialize your variables here
     */
    create: function() {
        this.arrowSpriteCollection = [];
        this.leftArrowSprites = [];
        this.rightArrowSprites = [];
        this.upArrowSprites = [];
        this.downArrowSprites = [];

        this.arrowSpriteCollection.push(this.leftArrowSprites, this.rightArrowSprites, this.upArrowSprites, this.downArrowSprites);

        var music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        //music.play();

        var leftArrow = new KuzzleGame.Arrow.Sprite();
        leftArrow.create(this.game, 10, 0, 'arrow');
        this.leftArrowSprites.push(leftArrow);

        var rightArrow = new KuzzleGame.Arrow.Sprite();
        rightArrow.create(this.game, 110, 0, 'arrow');
        this.rightArrowSprites.push(rightArrow);

        var upArrow = new KuzzleGame.Arrow.Sprite();
        upArrow.create(this.game, 210, 0, 'arrow');
        this.upArrowSprites.push(upArrow);

        var downArrow = new KuzzleGame.Arrow.Sprite();
        downArrow.create(this.game, 310, 0, 'arrow');
        this.downArrowSprites.push(downArrow);

        for(var i=0; i<this.arrowSpriteCollection.length; i++) {
            for(var j=0; j<this.arrowSpriteCollection[i].length; j++ ) {
                this.arrowSpriteCollection[i][j].play();
            }
        }

        this.hitZone = new Phaser.Rectangle(0, 450, 800, 50);

        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },

    /**
     * Update your variables here. Typically, used for move your sprites (a loop is automaticaly launched by phaser)
     */
    update: function() {
        for(var i=0; i<this.arrowSpriteCollection.length; i++) {
            for(var j=0; j<this.arrowSpriteCollection[i].length; j++ ) {
                this.arrowSpriteCollection[i][j].update(this.game);
            }
        }
    },

    /**
     * Update your render here (Typically used for text)
     */
    render: function() {

        this.game.debug.geom(this.hitZone);

        var firstArrow;
        var intersect;
        var arrow;

        if(this.leftKey.isDown) {
            if(this.leftArrowSprites.length) {
                firstArrow = this.leftArrowSprites[0];
                intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                if(!intersect.empty) {
                    this.game.debug.geom(intersect, 'rgba(255,150,0,1)');
                } else {
                    arrow = this.leftArrowSprites.shift();
                    arrow.remove();
                }
            }
        }

        if(this.rightKey.isDown) {
            if(this.rightArrowSprites.length) {
                firstArrow = this.rightArrowSprites[0];
                intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                if(!intersect.empty) {
                    this.game.debug.geom(intersect, 'rgba(255,150,0,1)');
                } else {
                    arrow = this.rightArrowSprites.shift();
                    arrow.remove();
                }
            }
        }

        if(this.upKey.isDown) {
            if(this.upArrowSprites.length) {
                firstArrow = this.upArrowSprites[0];
                intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                if(!intersect.empty) {
                    this.game.debug.geom(intersect, 'rgba(255,150,0,1)');
                } else {
                    arrow = this.upArrowSprites.shift();
                    arrow.remove();
                }
            }
        }

        if(this.downKey.isDown) {
            if(this.downArrowSprites.length) {
                firstArrow = this.downArrowSprites[0];
                intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                if(!intersect.empty) {
                    this.game.debug.geom(intersect, 'rgba(255,150,0,1)');
                } else {
                    arrow = this.downArrowSprites.shift();
                    arrow.remove();
                }
            }
        }
    }
};
