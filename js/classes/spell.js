KuzzleGame.Spell = {};

KuzzleGame.Spell = {
    game: null,

    SPELL_BLIND: 1,
    SPELL_REVERSE: 2,
    SPELL_EXPLOSION: 3,
    SPELL_BLOCK: 4,

    scoreToNextSpell: 0,
    lastLaunchedSpellScore: 0,

    blockedTime: 3000,
    reverseTime: 3000,

    pacman: null,

    init: function(game) {
        this.game = game;
    },

    generateSpell: function() {
        //count maximum score
        var scoreMax = this.fibonacci(KuzzleGame.Arrow.arrows.length, 0, 1);
        this.scoreToNextSpell = Phaser.Math.floor(scoreMax / 4 / 4);
    },

    fibonacci: function(length, total, index) {
        total = total + index;
        if(index < length) {
            total = this.fibonacci(length, total, ++index);
        }

        return total;
    },

    sendSpell: function() {
        this.spellExplosion();
        var spellType = Phaser.Math.floor((KuzzleGame.Player.score - this.lastLaunchedSpellScore) / this.scoreToNextSpell);
        console.log(spellType);
        if(spellType === 0) {
            console.log('Out of mana sound effect !');
        } else {
            if(spellType === this.SPELL_BLIND) {

            } else if (spellType === this.SPELL_REVERSE) {
                this.spellReverse();
            } else if (spellType === this.SPELL_EXPLOSION) {
                this.spellExplosion();
            } else if (spellType === this.SPELL_BLOCK) {
                this.spellBlock();
            }
        }

        //KuzzleGame.KuzzleManager.throwEvent('pause');
    },

    spellBlind: function() {
        
    },

    spellReverse: function() {
        KuzzleGame.Player.isReversed = true;
        KuzzleGame.Player.reversedTimestamp = this.game.time.time;
    },

    unReverse: function() {
        if((this.game.time.time - KuzzleGame.Player.reversedTimestamp) > this.reverseTime) {
            KuzzleGame.Player.isReversed = false;
        }
    },

    spellExplosion: function() {
        this.pacman = this.game.add.sprite(0, this.game.height / 2, 'pacman');
        this.pacman.scale.set(2,2);
        this.game.physics.enable(this.pacman, Phaser.Physics.ARCADE);
        var pacmanAnimation = this.pacman.animations.add('move');
        pacmanAnimation.play(20, true);

        var tween = this.game.add.tween(this.pacman).to({ x: this.game.width, y: this.pacman.y }, 8000, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(function(sprite) {
            sprite.destroy();
        }, this);
    },

    onPacmanCollide: function(pacman, arrow) {
        KuzzleGame.Player.miss();
        arrow.isAlreadyHit = true;
        arrow.body.velocity.y = 0;
        this.game.add.tween(arrow).to({x: pacman.x + pacman.width, y: (pacman.y + pacman.height)}, 400, Phaser.Easing.Linear.None, true, 0, true);
        this.game.add.tween(arrow).to({angle: 359}, 400, Phaser.Easing.Linear.None, true, 0, true);
        this.game.add.tween(arrow.scale).to({x: 0, y: 0}, 400, Phaser.Easing.Linear.None, true);
    },

    spellBlock: function() {
        KuzzleGame.Player.isBlocked = true;
        KuzzleGame.Player.blockedTimestamp = this.game.time.time;
    },

    unBlock: function() {
        if((this.game.time.time - KuzzleGame.Player.blockedTimestamp) > this.blockedTime) {
            KuzzleGame.Player.isBlocked = false;
        }
    }
};
