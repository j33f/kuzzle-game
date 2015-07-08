
KuzzleGame.KuzzleManager = {

    kuzzle: false,
    isHost: false,
    server: 'http://api.uat.kuzzle.io:7512',

    init: function(){

        this.kuzzle = new Kuzzle(this.server);

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
                console.log(response);

            }

        });

    },

    registerAsHost: function(){

        console.log('registering as host');
        this.kuzzle.create("kg_main_room", {host: true}, false, function(response) {
            if(response.error) {
                console.error(response.error);
            }

            console.log(response);
        });
    }
};