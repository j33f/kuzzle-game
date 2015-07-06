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

    arrows: null,
    cursors: null,


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
        //this.game.physics.startSystem(Phaser.Physics.ARCADE);
        //  We only want world bounds on the left and right
        this.game.physics.setBoundsToWorld();

        KuzzleGame.MusicManager.currentMusic.music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        
        console.log(KuzzleGame.MusicManager.currentMusic.music.duration);


        //this.hit = this.game.add.audio('hit');
        //this.miss = this.game.add.audio('miss');

        //arrows speed TODO UPDATE WITH BPM
        //KuzzleGame.Arrow.Animation.speed = (this.game.height - 0) / KuzzleGame.MusicManager.currentMusic.difficulty;

        this.hitZone = this.game.add.sprite(0, 450, 'button');
        this.hitZone.width = 800;
        this.hitZone.height = 100;

        this.game.physics.arcade.enable(this.hitZone, Phaser.Physics.ARCADE);

        this.arrows = this.game.add.group();
        this.arrows.enableBody = true;
        this.arrows.physicsBodyType = Phaser.Physics.ARCADE;

        //build arrows array
        for(var i=0; i<KuzzleGame.Level.arrowsMatrix.length; i++) {
            var arrowType = KuzzleGame.Level.arrowsMatrix[i];
            if(arrowType != 0) {
                var arrow = this.arrows.create(arrowType*100+10, -(i*100) - 500, 'arrow-' + arrowType);
                arrow.name = arrowType;
                arrow.isAlreadyHit = false;
                arrow.checkWorldBounds = true;
                arrow.events.onOutOfBounds.add( this.outOfBounds, this );
                //console.log( arrow.events.onOutOfBounds.dispatch() );
            }
        }
        this.arrows.setAll('body.velocity.y', 0);

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

        if(this.isGameStarted /*&& !KuzzleGame.MusicManager.currentMusic.music.isDecoding*/) {

            //this.game.physics.arcade.overlap(this.arrows, this.hitZone, this.overlapHandler, null, this);

            /*this.oldKeyboardState = this.keyboardState;

            this.keyboardState = new KuzzleGame.Keyboard.State();
            this.keyboardState.addKey(this.game, Phaser.Keyboard.LEFT);
            this.keyboardState.addKey(this.game, Phaser.Keyboard.RIGHT);
            this.keyboardState.addKey(this.game, Phaser.Keyboard.UP);
            this.keyboardState.addKey(this.game, Phaser.Keyboard.DOWN);*/



            /*for(var i=0; i<this.arrowSpriteCollection.length; i++) {
                if(this.arrowSpriteCollection[i].update(this.game) == 0) {
                    if(!this.arrowSpriteCollection[i].alreadyHit) {
                        KuzzleGame.Player.combo = 0;
                    }
                    this.arrowSpriteCollection.splice(i, 1);
                }
            }
            */
        }
    },

    /**
     * Update your render here (Typically used for text, sounds, display)
     */
    render: function() {

        if(this.isGameStarted /*&& !KuzzleGame.MusicManager.currentMusic.music.isDecoding*/) {


            console.log(KuzzleGame.MusicManager.currentMusic.music.totalDuration);

            //this.game.debug.rectangle(this.hitZone);
            /*for(var i=0; i<this.keyboardKeyToIndex.length; i++) {
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
            }*/
        }
    },

    start: function() {
        this.startButton.destroy();
        this.isGameStarted = true;

        this.arrows.setAll('body.velocity.y', 400);
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

    //on arrows over hitZone
    /*overlapHandler: function(obj1, obj2) {
    },*/

    onCursorDown: function(key) {
        var arrow = null;

        /*for(var key,val in this.arrows) {
            console.log(key, val);
        }*/

        /*this.arrows.forEach(function(val) {
            if(!val.isAlreadyHit) {
                arrow = val;
            }
        });*/

        console.log(arrow.y);

        if(arrow !== null) {
            if(key.keyCode === Phaser.Keyboard.LEFT) {
                console.log(this.game.physics.arcade.overlap(this.hitZone, this.arrows));
                //var intersect = Phaser.Rectangle.intersection(arrow, this.hitZone);
                //console.log(intersect);
            }
            if(key.keyCode === Phaser.Keyboard.RIGHT) {
                var intersect = Phaser.Rectangle.intersection(arrow, this.hitZone);
                console.log(intersect);
            }
            if(key.keyCode === Phaser.Keyboard.UP) {
                var intersect = Phaser.Rectangle.intersection(arrow, this.hitZone);
                console.log(intersect);
            }
            if(key.keyCode === Phaser.Keyboard.DOWN) {
                var intersect = Phaser.Rectangle.intersection(arrow, this.hitZone);
                console.log(intersect);
            }
        }
    },

    outOfBounds: function(obj) {
        if(obj.y > this.game.height) {
            this.arrows.remove(obj);
            obj.destroy();
        }
        //console.log('out of bounds');
        //remove all if out of bounds
    }
};
