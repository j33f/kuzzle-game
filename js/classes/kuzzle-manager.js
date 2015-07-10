
KuzzleGame.KuzzleManager = {

    kuzzle: false,
    isHost: false,
    hostID: false,
    uniquid: false,
    connectionEstablished: false,
    debug: true,
    server: 'http://api.uat.kuzzle.io:7512',


    init: function(){

        this.kuzzle = new Kuzzle(this.server);
        this.uniquid = this.generateUid();
        //this.hostID = "AU5veb0VChWSAXeON8eu";
        //this.hostUnregister();


    },

    /**
     * Find host,
     *if a host cannot be found , the current client became host.
     */
    findHost: function(){

        var filters = {
            "filter": {
                "term": {
                    "host": true
                }
            }
        };

        this.kuzzle.search("kg_main_room", filters, function(response) {
            if(response.error) {
                console.error(response.error);
            }

            if(response.result.hits.total == 0){

                KuzzleGame.KuzzleManager.log('no host found');
                KuzzleGame.KuzzleManager.registerAsHost();
            } else {

                KuzzleGame.KuzzleManager.log('host found');
                KuzzleGame.KuzzleManager.hostID = response.result.hits.hits[0]._id;
                KuzzleGame.KuzzleManager.log(KuzzleGame.KuzzleManager.hostID);
                KuzzleGame.KuzzleManager.subscribeToHost();


            }

        });

    },

    /**
     * register the current client as host in main room , and create a subchannel
     */
    registerAsHost: function(){

        KuzzleGame.KuzzleManager.log('registering as host');
        this.kuzzle.create("kg_main_room", {host: true}, true   , function(response) {
            if(response.error) {
                console.error(response.error);
            } else {

                KuzzleGame.KuzzleManager.hostID = response.result._id;
                KuzzleGame.KuzzleManager.isHost = true;

                KuzzleGame.KuzzleManager.createHostSubChannel();

                KuzzleGame.KuzzleManager.log('event unload');
                $(window).on('beforeunload', function(){
                    KuzzleGame.KuzzleManager.hostUnregister();
                });

            }

            KuzzleGame.KuzzleManager.log(response);
        });
    },

    /**
     * Unregister host from main room , and delete his subchannel
     */
    hostUnregister: function()
    {

        this.deleteHostSubChannel();
        this.kuzzle.delete("kg_main_room", this.hostID, function(response) {
            if(response.error) {
                console.error(response.error);
            }

            KuzzleGame.KuzzleManager.log("unloadind host");
            KuzzleGame.KuzzleManager.log(response.result);
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
                }else{
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
        this.kuzzle.delete("kg_room_"+this.hostID, this.hostID, function(response) {
            if(response.error) {
                console.error(response.error);
            }
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

        this.kuzzle.subscribe("kg_room_"+this.hostID, filters, this.eventFire);

        this.throwEvent('test','valuetest');
    },

    /**
     * Catching event
     * @param response
     */
    eventFire: function(response){
        this.log('EVENT FIRED');
        this.log(response);
    },


    /**
     * throw event on the host subchannel room
     * @param eventType
     * @param value
     */
    throwEvent: function(eventType,value)
    {
        this.kuzzle.create("kg_room_"+this.hostID, {event: "kg_event",event_type: eventType,event_value: value, event_owner: KuzzleGame.KuzzleManager.uniquid}, true   , function(response) {
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

        var delim = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    },

    /**
     * Log data into console if debug is activated
     * @param sentence
     */
    log: function(sentence)
    {
        if(this.debug){
            console.log(sentence);
        }
    }
}
