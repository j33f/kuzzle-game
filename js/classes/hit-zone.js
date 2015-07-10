KuzzleGame.HitZone = {};

KuzzleGame.HitZone = {
    game: null,

    hitZoneX: 0,
    hitZoneY: 0,
    hitZoneWidth: 0,
    hitZoneHeight: 0,

    rectangle: null,

    init: function(game) {
        this.game = game;

        this.hitZoneY = this.game.height * 0.75;
        this.hitZoneWidth = this.game.width;
        this.hitZoneHeight = this.game.height*0.15;

        this.createLines();
    },

    createLines: function() {
        var upLine = this.game.add.graphics(0, 0);
        upLine.beginFill(0xFF3300);
        upLine.lineStyle(10, 0xffd900, 1);
        upLine.moveTo(this.hitZoneX, this.hitZoneY);
        upLine.lineTo(this.hitZoneWidth, this.hitZoneY);
        upLine.endFill();

        var downLine = this.game.add.graphics(0, 0);
        downLine.beginFill(0xFF3300);
        downLine.lineStyle(10, 0xffd900, 1);
        downLine.moveTo(this.hitZoneX, this.hitZoneY + this.hitZoneHeight);
        downLine.lineTo(this.hitZoneWidth, this.hitZoneY + this.hitZoneHeight);
        downLine.endFill();

        this.rectangle = this.game.add.sprite(this.hitZoneX, this.hitZoneY, null);
        this.rectangle.width = this.hitZoneWidth;
        this.rectangle.height = this.hitZoneHeight;
        this.game.physics.enable(this.rectangle, Phaser.Physics.ARCADE);
    }
};