var preload = function(game) {};

preload.prototype = {
    preload: function() {
        var loadingBar = this.add.sprite(160, 240, "loading");
        loadingBar.anchor.setTo(0.5,0.5);
        this.load.setPreloadSprite(loadingBar);

        //BUTTONS
        this.game.load.spritesheet('button', 'assets/buttons/spacebar.png', 224, 70);

        // IMAGES
        this.game.load.spritesheet('arrows', 'assets/sprites/arrows.png', 64, 63);
        this.game.load.spritesheet('explosion', 'assets/sprites/explosion.png', 64, 64, 24);
        this.game.load.spritesheet('pacman', 'assets/sprites/pacman_28x28.png', 28, 28, 4);
        this.game.load.spritesheet('kirby', 'assets/sprites/kirby.png', 28, 26, 1);

        // SOUND EFFECTS
        this.game.load.audio('hit', [ 'assets/audio/soundeffects/hit.wav']);
        this.game.load.audio('miss', [ 'assets/audio/soundeffects/miss.wav']);
        this.game.load.audio('spell-bonus', [ 'assets/audio/soundeffects/spell-bonus.wav']);
        this.game.load.audio('pacman-move', [ 'assets/audio/soundeffects/pacman-move.wav']);
        this.game.load.audio('pacman-eat', [ 'assets/audio/soundeffects/pacman-eat.wav']);
    },

    create: function() {
        this.game.load.onLoadStart.add(this.loadStart, this);
        this.game.load.onFileComplete.add(this.fileComplete, this);
        this.game.load.onLoadComplete.add(this.loadComplete, this);
        this.game.load.start();

        this.game.state.start("gametitle");
    },

    loadStart: function() {
        //console.log('Loading is started');
    },

    fileComplete: function(progress, cacheKey, success, totalLoaded, totalFiles) {
        //console.log('File loaded');
    },

    loadComplete: function() {
        //console.log('Load complete');
    }
};