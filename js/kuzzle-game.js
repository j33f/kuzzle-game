KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    game: null,
    sprites: null,

    instance: function() {
        return this;
    },

    /**
     * Load your assets here. This is the first function launched
     */
    preload: function() {
        this.game.load.spritesheet('mummy', 'assets/sprites/metalslug_mummy37x45.png', 37, 45, 18);
    },

    /**
     * Initialize your variables here
     */
    create: function() {

        var leftArrow = KuzzleGame.Arrow.Sprite;
        leftArrow.create(this.game, 10, 10);
        leftArrow.play();

        var rightArrow = KuzzleGame.Arrow.Sprite;
        rightArrow.create(this.game, 50, 10);
        rightArrow.play();
    },

    /**
     * Update your variables here. Typically, used for move your sprites (a loop is automaticaly launched by phaser)
     */
    update: function() {

    },

    /**
     * Update your render here (Typically used for text)
     */
    render: function() {
    }
};