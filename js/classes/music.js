KuzzleGame.Music = typeof KuzzleGame.Music === 'undefined' ? {} : KuzzleGame.Music;

KuzzleGame.Music = function(identifier,bpm,filePath,difficulty){

    this.identifier=identifier;
    this.bpm = bpm;
    this.filePath = filePath;
    this.difficulty = difficulty;

};
