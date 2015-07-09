KuzzleGame.Background = typeof KuzzleGame.Background === 'undefined' ? function(game){this.game = game;} : KuzzleGame.Background;

KuzzleGame.Background.prototype = {
    game: null,
    sprite: null,
    filter: null,

    create: function() {
        console.log('background create');
        var fragmentSrc = [

            "precision mediump float;",

            "uniform vec2      resolution;",
            "uniform float     time;",

            "#define PI 90",

            "void main( void ) {",

            "vec2 p = ( gl_FragCoord.xy / resolution.xy ) - 0.5;",

            "float sx = 0.3 * (p.x + 0.8) * sin( 900.0 * p.x - 1. * pow(time, 0.55)*5.);",

            "float dy = 4./ ( 500.0 * abs(p.y - sx));",

            "dy += 1./ (25. * length(p - vec2(p.x, 0.)));",

            "gl_FragColor = vec4( (p.x + 0.1) * dy, 0.3 * dy, dy, 1.1 );",

            "}"];

        filter = new Phaser.Filter(this.game, null, fragmentSrc);
        filter.setResolution(this.game.width, this.game.height);

        this.sprite = this.game.add.sprite();
        this.sprite.width = this.game.width;
        this.sprite.height = this.game.height;

        this.sprite.filters = [ filter ];
    },

    update: function() {
        console.log('background update');
        filter.update();
    }
};