KuzzleGame.MusicManager = typeof KuzzleGame.MusicManager === 'undefined' ? {} : KuzzleGame.MusicManager;

KuzzleGame.MusicManager = {

    musics: [],
    currentMusic: null,

    init: function(){
        this.musics.push(new KuzzleGame.Music('deepbluesky',310,['assets/audio/music/extreme/Graphiqs_Groove_-_09_-_Deep_Sky_Blue.ogg','assets/audio/music/extreme/Graphiqs_Groove_-_09_-_Deep_Sky_Blue.mp3'],KuzzleGame.Difficulty.DIFFICULTY_EXTREME));
        this.musics.push(new KuzzleGame.Music('utopia',280,['assets/audio/music/extreme/YACHT_-_01_-_Utopia_instrumental.ogg','assets/audio/music/extreme/YACHT_-_01_-_Utopia_instrumental.mp3'],KuzzleGame.Difficulty.DIFFICULTY_EXTREME));

        this.musics.push(new KuzzleGame.Music('memories',127,['assets/audio/music/hard/Risey_-_02_-_Memories_Of_Thailand_Beat_Doctors_stuck_in_Britain_remix.ogg','assets/audio/music/hard/Risey_-_02_-_Memories_Of_Thailand_Beat_Doctors_stuck_in_Britain_remix.mp3'],KuzzleGame.Difficulty.DIFFICULTY_HARD));
        this.musics.push(new KuzzleGame.Music('funkylicious',130,['assets/audio/music/hard/Fhernando_-_01_-_Funkylicious_Album_Version.ogg','assets/audio/music/hard/Fhernando_-_01_-_Funkylicious_Album_Version.mp3'],KuzzleGame.Difficulty.DIFFICULTY_HARD));
        this.musics.push(new KuzzleGame.Music('needlove',125,['assets/audio/music/hard/Fhernando_-_10_-_I_Need_Ya_LOVE.ogg','assets/audio/music/hard/Fhernando_-_10_-_I_Need_Ya_LOVE.mp3'],KuzzleGame.Difficulty.DIFFICULTY_HARD));

        this.musics.push(new KuzzleGame.Music('liftoff',100,['assets/audio/music/normal/Jahzzar_-_01_-_Lift_Off.ogg','assets/audio/music/normal/Jahzzar_-_01_-_Lift_Off.mp3'],KuzzleGame.Difficulty.DIFFICULTY_NORMAL));
        this.musics.push(new KuzzleGame.Music('shangrila',100,['assets/audio/music/normal/YACHT_-_10_-_Shangri-La_instrumental.ogg','assets/audio/music/normal/YACHT_-_10_-_Shangri-La_instrumental.mp3'],KuzzleGame.Difficulty.DIFFICULTY_NORMAL));
    },

    loadMusic: function(game){

        var musicsMatchingDifficulty = [];

        for(var i=0;i<this.musics.length;i++){
            if(this.musics[i].difficulty == KuzzleGame.Difficulty.currentDifficulty){
                musicsMatchingDifficulty.push(this.musics[i]);
                game.load.audio(this.musics[i].identifier, this.musics[i].filePath);
            }
        }

        var random = Math.floor(Math.random() * musicsMatchingDifficulty.length);
        console.log(musicsMatchingDifficulty, random);
        console.log(musicsMatchingDifficulty, random, 'loading music '+musicsMatchingDifficulty[random].identifier);
        game.add.audio(musicsMatchingDifficulty[random].identifier);
        this.currentMusic = musicsMatchingDifficulty[random];
    },

    loadMusicByIdentifier: function(identifier, game){

        for(var i=0;i<this.musics.length;i++){

            if(this.musics[i].identifier == identifier){
                //game.load.audio(this.musics[i].identifier, this.musics[i].filePath);
                this.currentMusic = this.musics[i];
                console.log('loading music from host '+this.musics[i].identifier);
                KuzzleGame.MusicManager.currentMusic.music = game.add.audio(this.musics[i].identifier);
                break;
            }
        }

    }

};


