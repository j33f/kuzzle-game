KuzzleGame.Difficulty = typeof KuzzleGame.Difficulty === 'undefined' ? {} : KuzzleGame.Difficulty;

KuzzleGame.Difficulty = {
    DIFFICULTY_NORMAL: 0,
    DIFFICULTY_HARD:1,
    DIFFICULTY_EXTREME:2,
    currentDifficulty: 0,


    setDifficulty: function(difficulty){
        if(difficulty == this.DIFFICULTY_NORMAL || difficulty == this.DIFFICULTY_HARD || difficulty == this.DIFFICULTY_EXTREME){
            this.currentDifficulty = difficulty;
        }
    }



};


