KuzzleGame = typeof KuzzleGame === 'undefined' ? {} : KuzzleGame;

KuzzleGame = {

    arrowsMatrix: new Array(4),
    arrowLeft: 1,
    arrowRight: 2,
    arrowUp: 3,
    arrowDown: 4,
    emptyArrow: 0,
    elementToGeneratePerLevel: 200,


    preload: function() {
        console.log('preload game');
    },

    create: function() {
        sprite.create(200, 360, 'mummy', 5);
    },

    generateLevel: function() {

        for(arrowMatrixIndex = 0 ; arrowMatrixIndex < this.arrowsMatrix.length ; arrowMatrixIndex++){

            this.arrowsMatrix[arrowMatrixIndex] = new Array();

            for(generatingIndex=0;generatingIndex<this.elementToGeneratePerLevel;generatingIndex++) {
                rand = Math.floor((Math.random() * 100) + 1);

                //pour commencer , on pars sur 60% de chance de generer une case vide
                if(rand >= 1 && rand <= 60){
                    this.arrowsMatrix[arrowMatrixIndex].push(this.emptyArrow);
                } else if( rand >= 61 && rand <= 70){
                    this.arrowsMatrix[arrowMatrixIndex].push(this.arrowLeft);
                } else if( rand >= 71 && rand <= 80) {
                    this.arrowsMatrix[arrowMatrixIndex].push(this.arrowRight);
                } else if (rand >= 81 && rand <= 90) {
                    this.arrowsMatrix[arrowMatrixIndex].push(this.arrowUp);
                } else if (rand >= 91 && rand <= 100) {
                    this.arrowsMatrix[arrowMatrixIndex].push(this.arrowDown);
                }
            }
        }

        console.log(this.arrowsMatrix);
    }

}