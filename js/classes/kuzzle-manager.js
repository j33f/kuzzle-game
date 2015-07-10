
KuzzleGame.KuzzleManager = {

    kuzzle: false,
    isHost: false,
    hostID: false,
    server: 'http://api.uat.kuzzle.io:7512',


    init: function(){

        this.kuzzle = new Kuzzle(this.server);
        //this.hostID = "AU5vdQYSChWSAXeON8el";
        //this.hostUnregister();

    },

    findHost: function(){

        var filters = {
            "filter": {
                "term": {
                    "host": true
                }
            }
        }

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

            console.log("unloadind host")
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

            console.log("unloadind subchannel")
            console.log(response.result);
        });
    },

    subscribeToHost: function()
    {
        var filters = {
            "filter": {
                "term": {
                    "event": "kg_event"
                }
            }
        }

        console.log(filters);

        console.log('register to '+"kg_room_"+this.hostID);

        //this.kuzzle.subscribe("kg_room_"+this.hostID, filters, this.eventHook);
        console.log(this.kuzzle.subscribe("kg_room_"+this.hostID, filters, function(response){console.log('PROUT');console.log(response)})) ;

        this.throwEvent('test','valuetest');
    },

    eventHook: function(response){
        console.log('EVENT LEVE');
        console.log(response);
    },

    throwEvent: function(eventType,value)
    {
        console.log('throw Event');
        this.kuzzle.create("kg_room_"+this.hostID, {event: "kg_event",event_type: eventType,event_value: value}, true   , function(response) {
            if(response.error) {
                console.error(response.error);
            } else {

            }

            console.log(response);
        });
    }

};
