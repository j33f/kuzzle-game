KuzzleGame.Difficulty = typeof KuzzleGame.Difficulty === 'undefined' ? {} : KuzzleGame.Difficulty;

KuzzleGame.Difficulty = {
    DIFFICULTY_NORMAL: 2000,
    DIFFICULTY_HARD: 1500,
    DIFFICULTY_EXTREME: 1000,
    currentDifficulty: 0,


    setDifficulty: function(difficulty){
        if(difficulty == this.DIFFICULTY_NORMAL || difficulty == this.DIFFICULTY_HARD || difficulty == this.DIFFICULTY_EXTREME){
            this.currentDifficulty = difficulty;
        }
    }



};


