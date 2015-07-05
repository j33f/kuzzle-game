KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    game: null,
    hitZone: Object,

    arrowSpriteCollection: [],

    keyboardKeyToIndex: [],
    oldKeyboardState: null,
    keyboardState: null,

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        KuzzleGame.MusicManager.init();
        KuzzleGame.Difficulty.setDifficulty(KuzzleGame.Difficulty.DIFFICULTY_EXTREME);
        KuzzleGame.MusicManager.loadMusic(this.game);
        KuzzleGame.Level.generateLevel();

        //this.game.load.audio('gazprom', ['assets/audio/gazprom_brutt_net.mp3']);
        this.game.load.spritesheet('arrow-1', 'assets/sprites/arrow-1.png', 62, 46, 1);
        this.game.load.spritesheet('arrow-2', 'assets/sprites/arrow-2.png', 62, 46, 1);
        this.game.load.spritesheet('arrow-3', 'assets/sprites/arrow-3.png', 46, 62, 1);
        this.game.load.spritesheet('arrow-4', 'assets/sprites/arrow-4.png', 46, 62, 1);

        this.game.load.audio('hit', [ 'assets/audio/soundeffects/hit.wav']);
        this.game.load.audio('miss', [ 'assets/audio/soundeffects/miss.wav']);
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
        music.play();

        //arrows speed TODO UPDATE WITH BPM
        KuzzleGame.Arrow.Animation.speed = (this.game.height - 0) / KuzzleGame.MusicManager.currentMusic.difficulty;

        //build arrows array
        for(var i=0; i<KuzzleGame.Level.arrowsMatrix[0].length; i++) {
            var arrowType = KuzzleGame.Level.arrowsMatrix[0][i];
            if(arrowType != 0) {
                this.arrowSpriteCollection.push(new KuzzleGame.Arrow.Sprite().create(this.game, arrowType*100+10, -(i*100) + 100, 'arrow-' + arrowType, arrowType));
            }
        }

        for(var i=0; i<this.arrowSpriteCollection.length; i++) {
            this.arrowSpriteCollection[i].play();
        }

        this.hitZone = new Phaser.Rectangle(0, 450, 800, 50);

        this.hit = this.game.add.audio('hit');
        this.miss = this.game.add.audio('miss');

        //FPS calcul
        this.time = 0;
        this.count = 0;
    },

    /**
     * Update your variables here. Typically, used for update your sprites coordinates (a loop is automaticaly launched by phaser)
     */
    update: function() {
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

        //FPS calcul
        this.time += this.game.time.elapsedMS;
        this.count++;
        if(this.time > 1000) {
            console.log(this.count);
            this.time = 0;
            this.count = 0;
        }
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {
        this.game.debug.geom(this.hitZone);
        for(var i=0; i<this.keyboardKeyToIndex.length; i++) {
            if(this.keyboardState.isKeyDown(this.keyboardKeyToIndex[i]) && !this.oldKeyboardState.isKeyDown(this.keyboardKeyToIndex[i])) {
                if(this.arrowSpriteCollection.length) {
                    var firstArrow = this.arrowSpriteCollection[0];
                    //check if type is good
                    var intersect = Phaser.Rectangle.intersection(firstArrow.rectangle, this.hitZone);
                    if(!intersect.empty && !firstArrow.alreadyHit && firstArrow.type == i+1) {
                        firstArrow.alreadyHit = true;
                        KuzzleGame.Player.hit();
                        this.hit.play();
                        //this.game.debug.geom(intersect, 'rgba(255,150,0,1)');
                    } else {
                        var arrow = this.arrowSpriteCollection.shift();
                        arrow.remove();
                        KuzzleGame.Player.miss();
                        this.miss.play();
                    }
                }
            }
        }
    }
};
