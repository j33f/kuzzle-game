KuzzleGame.Level = typeof KuzzleGame.Level === 'undefined' ? {} : KuzzleGame.Level;

KuzzleGame.Level = {

    debug: true,
    arrowsMatrix: new Array(4),
    ARROW_LEFT: 1,
    ARROW_RIGHT: 2,
    ARROW_UP: 3,
    ARROW_DOWN: 4,
    EMPTY_ARROW: 0,
    elementToGeneratePerLevel: 200,
    arrowsProbability: [0.6, 0.1, 0.1, 0.1, 0.1],

    /**
    * generate Level data (bi-dimentionnal array of arrows)
    */
    generateLevel: function() {

        for(var arrowMatrixIndex = 0 ; arrowMatrixIndex < this.arrowsMatrix.length ; arrowMatrixIndex++){

            this.arrowsMatrix[arrowMatrixIndex] = [];

            for(var generatingIndex=0;generatingIndex<this.elementToGeneratePerLevel;generatingIndex++) {
                this.arrowsMatrix[arrowMatrixIndex].push(this.generateRandomData(this));
            }
        }

        if(this.debug){
            console.log(this.arrowsMatrix);
        }
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

};