KuzzleGame.MusicManager = typeof KuzzleGame.MusicManager === 'undefined' ? {} : KuzzleGame.MusicManager;

KuzzleGame.MusicManager = {

    musics: [],
    currentMusic: null,

    init: function(){
        this.musics.push(new KuzzleGame.Music('deepbluesky',300,['assets/audio/music/extreme/Graphiqs_Groove_-_09_-_Deep_Sky_Blue.ogg','assets/audio/music/extreme/Graphiqs_Groove_-_09_-_Deep_Sky_Blue.mp3'],KuzzleGame.Difficulty.DIFFICULTY_EXTREME));
        this.musics.push(new KuzzleGame.Music('utopia',300,['assets/audio/music/extreme/YACHT_-_01_-_Utopia_instrumental.ogg','assets/audio/music/extreme/YACHT_-_01_-_Utopia_instrumental.mp3'],KuzzleGame.Difficulty.DIFFICULTY_EXTREME));

        this.musics.push(new KuzzleGame.Music('memories',127,['assets/audio/music/hard/Risey_-_02_-_Memories_Of_Thailand_Beat_Doctors_stuck_in_Britain_remix.ogg','assets/audio/music/hard/Risey_-_02_-_Memories_Of_Thailand_Beat_Doctors_stuck_in_Britain_remix.mp3'],KuzzleGame.Difficulty.DIFFICULTY_HARD));
        this.musics.push(new KuzzleGame.Music('paradise',120,['assets/audio/music/hard/YACHT_-_08_-_Paradise_Engineering_instrumental.ogg','assets/audio/music/hard/YACHT_-_08_-_Paradise_Engineering_instrumental.mp3'],KuzzleGame.Difficulty.DIFFICULTY_HARD));

        this.musics.push(new KuzzleGame.Music('liftoff',100,['assets/audio/music/normal/Jahzzar_-_01_-_Lift_Off.ogg','assets/audio/music/normal/Jahzzar_-_01_-_Lift_Off.mp3'],KuzzleGame.Difficulty.DIFFICULTY_NORMAL));
        this.musics.push(new KuzzleGame.Music('shangrila',100,['assets/audio/music/normal/YACHT_-_10_-_Shangri-La_instrumental.ogg','assets/audio/music/normal/YACHT_-_10_-_Shangri-La_instrumental.mp3'],KuzzleGame.Difficulty.DIFFICULTY_NORMAL));
    },

    loadMusic: function(game){

        musicsMatchingDifficulty = [];

        for(var i=0;i<this.musics.length;i++){

            if(this.musics[i].difficulty == KuzzleGame.Difficulty.currentDifficulty){

                musicsMatchingDifficulty.push(this.musics[i]);

            }
        }

        random = Math.floor(Math.random() * musicsMatchingDifficulty.length);

        console.log('loading music '+musicsMatchingDifficulty[random].identifier);
        game.load.audio(musicsMatchingDifficulty[random].identifier, musicsMatchingDifficulty[random].filePath);
        this.currentMusic = musicsMatchingDifficulty[random];

    },

    loadMusicByIdentifier: function(identifier,game){

        for(var i=0;i<this.musics.length;i++){

            if(this.musics[i].identifier == identifier){
                //game.load.audio(this.musics[i].identifier, this.musics[i].filePath);
                this.currentMusic = this.musics[i];
                //KuzzleGame.MusicManager.currentMusic.music = game.add.audio(this.musics[i].identifier);
                console.log('loading music from host '+this.musics[i].identifier);
                break;
            }
        }

    }

};


