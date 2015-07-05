KuzzleGame.MusicManager = typeof KuzzleGame.MusicManager === 'undefined' ? {} : KuzzleGame.MusicManager;

KuzzleGame.MusicManager = {

    musics: [],
    currentMusic: null,

    init: function(){
        this.musics.push(new KuzzleGame.Music('lapin',110,'assets/audio/Little_Lapin_-_01_-_Baby_Blue.mp3',KuzzleGame.Difficulty.DIFFICULTY_NORMAL));
        this.musics.push(new KuzzleGame.Music('britemores',160,'assets/audio/The_Britemores_-_06_-_Sick_Of_You.mp3',KuzzleGame.Difficulty.DIFFICULTY_HARD));
        this.musics.push(new KuzzleGame.Music('gazprom',300,'assets/audio/gazprom_brutt_net.mp3',KuzzleGame.Difficulty.DIFFICULTY_EXTREME));
    },

    loadMusic: function(game){
        for(var i=0;i<this.musics.length;i++){

            if(this.musics[i].difficulty == KuzzleGame.Difficulty.currentDifficulty){
                //game.load.audio(this.musics[i].identifier, [this.musics[i].filePath]);
                this.currentMusic = this.musics[i];
                break;
            }
        }
    }
};


