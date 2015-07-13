KuzzleGame.Player = {
    name: 'player 1',
    score: 0,
    combo: 0,
    accumulatedScore: 0,
    isBlocked: false,
    blockedTimestamp: 0,
    isReversed: false,
    reversedTimestamp: 0,

    hit: function() {
        this.combo++;
        this.score += this.combo;
        KuzzleGame.SoundEffect.hit();
        if(KuzzleGame.Spell.getActualSpellType() !== 0 && KuzzleGame.Spell.actualBonus !== KuzzleGame.Spell.getActualSpellType()) {
            KuzzleGame.Spell.actualBonus = KuzzleGame.Spell.getActualSpellType();
            KuzzleGame.SoundEffect.newBonus();
        }
        KuzzleGame.Text.displayScore();
    },

    miss: function() {
        this.combo = 0;
        KuzzleGame.SoundEffect.miss();
        KuzzleGame.Text.displayCombo();
    }
};