KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    game: null,
    sprites: null,
    rectangle: null,

    leftArrow: null,
    rightArrow: null,
    upArrow: null,
    downArrow: null,

    leftKey: null,
    rightKey: null,
    upKey: null,
    downKey: null,

    intersects: null,

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
        this.sprites = [];

        music = this.game.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
        //music.play();

        this.leftArrow = new KuzzleGame.Arrow.Sprite();
        this.leftArrow.create(this.game, 10, 0, 'arrow');
        this.sprites.push(this.leftArrow);

        this.rightArrow = new KuzzleGame.Arrow.Sprite();
        this.rightArrow.create(this.game, 110, 0, 'arrow');
        this.sprites.push(this.rightArrow);

        this.upArrow = new KuzzleGame.Arrow.Sprite();
        this.upArrow.create(this.game, 210, 0, 'arrow');
        this.sprites.push(this.upArrow);

        this.downArrow = new KuzzleGame.Arrow.Sprite();
        this.downArrow.create(this.game, 310, 0, 'arrow');
        this.sprites.push(this.downArrow);

        for(var i=0; i<this.sprites.length; i++) {
            this.sprites[i].play();
        }

        this.rectangle = new Phaser.Rectangle(0, 450, 800, 50);

        this.leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
        this.upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    },

    /**
     * Update your variables here. Typically, used for move your sprites (a loop is automaticaly launched by phaser)
     */
    update: function() {
        for(var i=0; i<this.sprites.length; i++) {
            this.sprites[i].update(this.game);
        }

        if (this.upKey.isDown)
        {
            this.upArrow.Rectangle.getRectangle();
            this.intersects = Phaser.Rectangle.intersection(this.upArrow.Rectangle.getRectangle(), this.rectangle);
            /*if(!this.intersects.empty) {
                this.game.debug.geom(this.intersects, 'rgba(255,150,0,1)');
            }*/
        }
        /*else if (downKey.isDown)
        {
            //sprite.y++;
        }

        if (leftKey.isDown)
        {
            sprite.x--;
        }
        else if (rightKey.isDown)
        {
            sprite.x++;
        }*/
    },

    /**
     * Update your render here (Typically used for text)
     */
    render: function() {
        this.game.debug.geom(this.rectangle);
        if(this.intersects) {
            console.log('test');
            this.game.debug.geom(this.intersects);
        }
    }
};
