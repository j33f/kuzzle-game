
KuzzleGame.KuzzleManager = {

    kuzzle: false,
    isHost: false,
    hostID: false,
    uniquid: false,
    server: 'http://api.uat.kuzzle.io:7512',


    init: function(){

        this.kuzzle = new Kuzzle(this.server);
        this.uniquid = this.generateUid();
        //this.hostID = "AU5veb0VChWSAXeON8eu";
        //this.hostUnregister();


    },

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
                console.log('no host found');
                KuzzleGame.KuzzleManager.registerAsHost();
            } else {
                console.log('host found');

                KuzzleGame.KuzzleManager.hostID = response.result.hits.hits[0]._id;
                console.log(KuzzleGame.KuzzleManager.hostID);
                KuzzleGame.KuzzleManager.subscribeToHost();


            }

        });

    },

    registerAsHost: function(){

        console.log('registering as host');
        this.kuzzle.create("kg_main_room", {host: true}, true   , function(response) {
            if(response.error) {
                console.error(response.error);
            } else {

                KuzzleGame.KuzzleManager.hostID = response.result._id;
                KuzzleGame.KuzzleManager.isHost = true;

                KuzzleGame.KuzzleManager.createHostSubChannel();

                console.log('event unload');
                $(window).on('beforeunload', function(){
                    KuzzleGame.KuzzleManager.hostUnregister();
                });

            }

            console.log(response);
        });
    },

    hostUnregister: function()
    {

        this.deleteHostSubChannel();
        this.kuzzle.delete("kg_main_room", this.hostID, function(response) {
            if(response.error) {
                console.error(response.error);
            }

            console.log("unloadind host");
            console.log(response.result);
        });
    },


    createHostSubChannel: function()
    {
        if(this.hostID){

            this.kuzzle.create("kg_room_"+this.hostID, {hostID: this.hostID}, true   , function(response) {
                if(response.error) {
                    console.error(response.error);
                }else{
                    KuzzleGame.KuzzleManager.subscribeToHost();
                }

                console.log(response);
            });

        }
    },

    deleteHostSubChannel: function()
    {
        this.kuzzle.delete("kg_room_"+this.hostID, this.hostID, function(response) {
            if(response.error) {
                console.error(response.error);
            }

            console.log(response.result);
        });
    },

    subscribeToHost: function()
    {
        var filters = {
            not: {term: {event_owner: this.uniquid}},
            term: {event: " kg_event"}
        };
        
        this.kuzzle.subscribe("kg_room_"+this.hostID, filters, this.eventFire);

        this.throwEvent('test','valuetest');
    },

    eventFire: function(response){
        console.log('EVENT FIRED');
        console.log(response);
    },

    throwEvent: function(eventType,value)
    {
        this.kuzzle.create("kg_room_"+this.hostID, {event: "kg_event",event_type: eventType,event_value: value, event_owner: KuzzleGame.KuzzleManager.uniquid}, true   , function(response) {
            if(response.error) {
                console.error(response.error);
            }
        });
    },

     generateUid: function (separator)
     {

        var delim = separator || "-";

        function S4() {
            return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
        }

        return (S4() + S4() + delim + S4() + delim + S4() + delim + S4() + delim + S4() + S4() + S4());
    }
}
