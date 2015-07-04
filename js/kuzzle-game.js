KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    arrowsMatrix: new Array(4),
    ARROW_LEFT: 1,
    ARROW_RIGHT: 2,
    ARROW_UP: 3,
    ARROW_DOWN: 4,
    EMPTY_ARROW: 0,
    elementToGeneratePerLevel: 200,
    arrowsProbability: [0.6, 0.1, 0.1, 0.1, 0.1],

    preload: function() {
        this.generateLevel();
    },

    create: function() {
        sprite.create(200, 360, 'mummy', 5);
    },

    //Genere le tableau 2D qui contient l'ordre des fleche en fonction des probabilités renseignées.
    generateLevel: function() {

        for(arrowMatrixIndex = 0 ; arrowMatrixIndex < this.arrowsMatrix.length ; arrowMatrixIndex++){

            this.arrowsMatrix[arrowMatrixIndex] = new Array();

            for(generatingIndex=0;generatingIndex<this.elementToGeneratePerLevel;generatingIndex++) {

                this.arrowsMatrix[arrowMatrixIndex].push(this.generateRandomData());

            }
        }

        console.log(this.arrowsMatrix);
    },

    generateRandomData: function() {
        var r = Math.random();
        var s = 0;

        for(var i = 0; i < this.arrowsProbability.length; i++) {
            s += this.arrowsProbability[i];
            if(r <= s)
                return i;
        }
    }

}