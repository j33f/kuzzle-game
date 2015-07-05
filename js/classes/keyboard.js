KuzzleGame.Keyboard = typeof KuzzleGame.Keyboard === 'undefined' ? {} : KuzzleGame.Keyboard;

KuzzleGame.Keyboard = {

    State: function() {
        this.keys = {};

        this.addKey = function(game, keyIdentifier) {
            var key = game.input.keyboard.addKey(keyIdentifier);
            this.keys[keyIdentifier] = {isDown: key.isDown};
        };

        this.isKeyDown = function(keyIdentifier) {
            if(this.keys[keyIdentifier]) {
                return this.keys[keyIdentifier].isDown;
            } else {
                return false;
            }
        };
    }

};
