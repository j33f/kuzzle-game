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
        this.spellReverse();
        var spellType = Phaser.Math.floor((KuzzleGame.Player.score - this.lastLaunchedSpellScore) / this.scoreToNextSpell);
        console.log(spellType);
        if(spellType === 0) {
            console.log('Out of mana sound effect !');
        } else {
            if(spellType === this.SPELL_BLIND) {

            } else if (spellType === this.SPELL_REVERSE) {
                this.spellReverse();
            } else if (spellType === this.SPELL_EXPLOSION) {

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
