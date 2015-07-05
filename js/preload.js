var preload = function(game) {};

preload.prototype = {
    preload: function() {
        console.log('preload');

        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //BUTTONS
        this.game.load.spritesheet('button', 'assets/buttons/spacebar.png', 224, 70);

        // IMAGES
        this.game.load.spritesheet('arrow-1', 'assets/sprites/arrow-1.png', 62, 46, 1);
        this.game.load.spritesheet('arrow-2', 'assets/sprites/arrow-2.png', 62, 46, 1);
        this.game.load.spritesheet('arrow-3', 'assets/sprites/arrow-3.png', 46, 62, 1);
        this.game.load.spritesheet('arrow-4', 'assets/sprites/arrow-4.png', 46, 62, 1);

        // MUSICS
        this.game.load.audio('lapin', 'assets/audio/Little_Lapin_-_01_-_Baby_Blue.mp3');
        this.game.load.audio('britemores', 'assets/audio/The_Britemores_-_06_-_Sick_Of_You.mp3');
        this.game.load.audio('gazprom', 'assets/audio/gazprom_brutt_net.mp3');

        // SOUND EFFECTS
        this.game.load.audio('hit', [ 'assets/audio/soundeffects/hit.wav']);
        this.game.load.audio('miss', [ 'assets/audio/soundeffects/miss.wav']);
    },

    create: function() {
        console.log('preload create');

        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.game.load.start();

        this.game.state.start("gametitle");
    },

    loadStart: function() {
        console.log('Loading is started');
    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        console.log('File loaded');
    },

    loadComplete: function() {
        console.log('Load complete');
    }
};