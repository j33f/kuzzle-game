
KuzzleGame.KuzzleManager = {

    kuzzle: false,
    isHost: false,
    hostID: false,
    registeredOnMainRoom: false,
    uniquid: false,
    connexionEstablished: false,
    connexionLastCheck: 0,
    connexionInterval: false,
    debug: false,
    server: 'http://api.uat.kuzzle.io:7512',
    //server: 'http://192.168.51.1:8081',
    kuzzleGame: false,


    initServer: function(){
        if(!this.kuzzle){
            this.kuzzle = new Kuzzle(this.server);
        }
    },

    init: function(kuzzleGame){

        this.initServer();

        if(!this.uniquid){
            this.uniquid = this.generateUid();
        }

        this.kuzzleGame = kuzzleGame;
        this.findHost();

        //this.utilsDelete("AU6JT-I7BxsUKIOaRK8a");



    },



    /**
     * Find host,
     *if a host cannot be found , the current client became host.
     */
    findHost: function(){

        var filters = {
            "filter": {
                "term": {
                    "hostDifficulty": KuzzleGame.Difficulty.currentDifficulty
                }
            }
        };

        KuzzleGame.KuzzleManager.kuzzle.search("kg_main_room", filters, function(response) {
            if(response.error) {
                console.error(response.error);
            }

            if(response.result.hits.total == 0){

                KuzzleGame.KuzzleManager.log('no host found');
                KuzzleGame.KuzzleManager.registerAsHost();
                //KuzzleGame.KuzzleManager.checkConnexion();

            } else {

                KuzzleGame.KuzzleManager.log('host found');
                KuzzleGame.KuzzleManager.hostID = response.result.hits.hits[0]._source.hostID;
                KuzzleGame.KuzzleManager.log(response.result.hits.hits[0]);
                KuzzleGame.KuzzleManager.subscribeToHost();
                KuzzleGame.KuzzleManager.checkConnexion();

            }

        });

    },

    /**
     * register the current client as host in main room , and create a subchannel
     */
    registerAsHost: function(createSubchannel){

        if (typeof(createSubchannel)==='undefined') createSubchannel = true;

        KuzzleGame.KuzzleManager.log('registering as host');

        this.kuzzle.create("kg_main_room", {hostID: this.uniquid, hostDifficulty: KuzzleGame.Difficulty.currentDifficulty}, true   , function(response) {
            if(response.error) {
                console.error(response.error);
            } else {

                KuzzleGame.KuzzleManager.hostID = KuzzleGame.KuzzleManager.uniquid;
                KuzzleGame.KuzzleManager.isHost = true;
                KuzzleGame.KuzzleManager.registeredOnMainRoom = true;

                KuzzleGame.KuzzleManager.log('host registered as '+KuzzleGame.KuzzleManager.hostID);

                if(createSubchannel){

                    KuzzleGame.KuzzleManager.log('creating subchannel');

                    KuzzleGame.KuzzleManager.createHostSubChannel();

                    $(window).on('beforeunload', function(){
                        KuzzleGame.KuzzleManager.hostUnregister();
                    });
                }
            }
        });
    },

    /**
     * Unregister host from main room , and delete his subchannel
     */
    hostUnregister: function(callbackFunc)
    {

        this.deleteHostSubChannel();
        this.hostUnregisterFromMainRoom(callbackFunc);

    },


    hostUnregisterFromMainRoom: function(callbackFunc,clearHostId)
    {

        var filters = {
            "filter": {
                "term": {
                    "hostID": this.hostID
                }
            }
        };

        if (typeof(clearHostId)==='undefined') clearHostId = true;


            this.kuzzle.deleteByQuery("kg_main_room", filters, function(response) {

                if(response.error) {
                    console.error(response.error);
                }

                KuzzleGame.KuzzleManager.log("unloadind host");
                KuzzleGame.KuzzleManager.log(response.result);

                KuzzleGame.KuzzleManager.registeredOnMainRoom = false;

                if(callbackFunc != 'undefined' && callbackFunc != null){

                    if(this.debug) {
                        console.log(callbackFunc);
                    }
                    callbackFunc();
                }

                if(clearHostId){
                    KuzzleGame.KuzzleManager.hostID = false;
                }

            });


    },

    /**
     * Create the host subchannel
     */
    createHostSubChannel: function()
    {
        if(this.hostID){

            this.kuzzle.create("kg_room_"+this.hostID, {hostID: this.hostID}, true   , function(response) {
                if(response.error) {
                    console.error(response.error);
                } else {
                    KuzzleGame.KuzzleManager.subscribeToHost();
                }
            });

        }
    },

    /**
     * Delete host subchannel
     */
    deleteHostSubChannel: function()
    {
        KuzzleGame.KuzzleManager.log('Deleting host Subchannel');


        var filters = {
            "filter": {
                "term": {
                    "hostID": this.hostID
                }
            }
        };

        this.kuzzle.deleteByQuery("kg_room_"+this.hostID, filters, function(response) {
            if(response.error) {
                console.error(response.error);
            }
            KuzzleGame.KuzzleManager.log(response.result);

        });
    },

    /**
     * Subscribe to the host subChannel room
     */
    subscribeToHost: function()
    {
        var filters = {
            not: {term: {event_owner: this.uniquid}},
            term: {event: " kg_event"}
        };

        this.kuzzle.subscribe("kg_room_"+this.hostID, filters, this.fireEvent);

    },

    /**
     * Catching event
     * @param response
     */
    fireEvent: function(response){

        eventExploded = response.body.event_type.split('_');

        for(var i=0; i < eventExploded.length; i++){
            eventExploded[i] = eventExploded[i].toLowerCase();
            eventExploded[i] = eventExploded[i].charAt(0).toUpperCase() + eventExploded[i].slice(1);
        }

        eventFunctionName = 'event'+eventExploded.join('');
        KuzzleGame.KuzzleManager.log('Event Fired : '+response.body.event_type+' , calling '+eventFunctionName);

        window["KuzzleGame"]["KuzzleManager"][eventFunctionName](response.body.event_value);

    },


    /**
     * throw event on the host subchannel room
     * @param eventType
     * @param value
     */
    throwEvent: function (eventType, value)
    {
        this.kuzzle.create("kg_room_"+this.hostID, {event: "kg_event",event_type: eventType,event_value: value, event_owner: KuzzleGame.KuzzleManager.uniquid}, false   , function(response) {
            if(response.error) {
                console.error(response.error);
            }
        });
    },


    /**
     * generate unique id for current client
     * @param separator
     * @returns {*}
     */
     generateUid: function (separator)
     {

        var delim = '';

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    },

    /**
     * Log data into console if debug is activated
     * @param sentence
     */
    log: function(data)
    {

        if(this.debug && data != 'undefined'){
            console.log("[KUZZLE]", data);
        }
    },


    /**
     * Check if connexion is established with host.
     */
    checkConnexion: function()
    {
        this.synchronize();

        if(!this.connexionInterval){

            this.connexionInterval = setInterval(function(){

                KuzzleGame.KuzzleManager.synchronize();

                if(KuzzleGame.KuzzleManager.hostID){

                    currentTime = KuzzleGame.KuzzleManager.time();

                    if(currentTime - KuzzleGame.KuzzleManager.connexionLastCheck > 2){

                            KuzzleGame.KuzzleManager.connexionLost();

                    } else {

                        if(!KuzzleGame.KuzzleManager.connexionEstablished){

                            KuzzleGame.KuzzleManager.connexionSuccess();

                        }

                    }

                }

            }, 1000);


        }

    },

    synchronize: function()
    {
        this.throwEvent('CONNEXION_STATUS','SYN');
    },

    acknowledge: function()
    {
        this.throwEvent('CONNEXION_STATUS','ACK');
    },

    time: function()
    {
        return Math.floor(Date.now() / 1000)
    },

    connexionLost: function()
    {

        KuzzleGame.KuzzleManager.connexionEstablished = false;
        KuzzleGame.KuzzleManager.log('Connexion LOST');

        clearInterval(KuzzleGame.KuzzleManager.connexionInterval);

        KuzzleGame.KuzzleManager.connexionInterval = false;

        KuzzleGame.KuzzleManager.kuzzleGame.stop();
        //if(!KuzzleGame.KuzzleManager.isHost){
            KuzzleGame.KuzzleManager.hostUnregister();
        //} else {
        //    if(!KuzzleGame.KuzzleManager.registeredOnMainRoom) {
        //        KuzzleGame.KuzzleManager.registerAsHost(false);
        //    }
        //}


    },


    connexionSuccess: function()
    {
        KuzzleGame.KuzzleManager.connexionEstablished = true;
        KuzzleGame.KuzzleManager.log('connexion ESTABLISHED');
        KuzzleGame.KuzzleManager.hostUnregisterFromMainRoom(null,false);

        if(this.isHost){
            this.throwEvent('LOAD_MUSIC',KuzzleGame.MusicManager.currentMusic.identifier);
        }

        this.kuzzleGame.startGameCountDown();
    },

    eventConnexionStatus: function(value){

        this.connexionLastCheck = this.time();

        if( value == 'SYN'){

            KuzzleGame.KuzzleManager.log('SYN');
            KuzzleGame.KuzzleManager.acknowledge();

            if(KuzzleGame.KuzzleManager.isHost && KuzzleGame.KuzzleManager.connexionEstablished == false){
                KuzzleGame.KuzzleManager.checkConnexion();
            }

        }

        if(value == 'ACK'){
            KuzzleGame.KuzzleManager.log('ACK');
        }



    },


    /**
     * To delete after dev
     * @param ID
     */
    utilsDelete: function(ID){

        this.kuzzle.delete("kg_main_room", ID, function(response) { console.log('OK');});

    },

    eventLevelGeneration: function(arrows) {
        KuzzleGame.Level.arrowsMatrix = arrows;
        KuzzleGame.Arrow.generateArrows();
        KuzzleGame.Arrow.arrows.setAll('body.move', true);
        this.kuzzleGame.isGameStarted = true;
    },

    eventSendSpell: function(spellType) {
        KuzzleGame.Spell.receiveSpell(spellType);
    },

    eventOpponentScore: function(score) {
        KuzzleGame.Player.opponentScore = score;
        KuzzleGame.Text.displayOpponentScore();
    },

    eventLoadMusic: function(identifier){
      KuzzleGame.MusicManager.loadMusicByIdentifier(identifier,this.kuzzleGame);
        KuzzleGame.MusicManager.currentMusic.music = this.kuzzleGame.add.audio(KuzzleGame.MusicManager.currentMusic.identifier);
    }
};
