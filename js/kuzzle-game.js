var KuzzleGame = function(game) {
};

KuzzleGame.prototype = {
    game: null,
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
        KuzzleGame.MusicManager.currentMusic.music.play();

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

        this.hitZone = new Phaser.Rectangle(0, 450, 800, 100);

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
        /*this.time += this.game.time.elapsedMS;
        this.count++;
        if(this.time > 1000) {
            //console.log(this.count);
            this.time = 0;
            this.count = 0;
        }*/
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {
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
