
const minAtck = 1;
const maxAtck = 10;
const minDef = 1;
const maxDef = 10;
const minXp = 1;
const maxXp = 10;

let caracters = [];


/**
 * Get a random value between 2 parametr
 * @param {number} min minimal number
 * @param {number} max maximal number
 * @returns {number} random number between 2 parametr
 */
function getRandomBetweenValue (min, max){
    return Math.floor(min + Math.random() * (max + 1 - min))
}

/**
 * Create 'n' numbers of caracters in your array
 * @param {array} array -where you want your caracter to be created in
 * @param {number} n -number of caracters you want to create
 */
function creatCara (array, n){
    while (array.length < n){
        array.push({
            name : prompt('choisissez un nom'),
            hp : 50,
            xp : getRandomBetweenValue(minXp, maxXp),
            atck : getRandomBetweenValue(minAtck, maxAtck),
            def : getRandomBetweenValue(minDef, maxDef)
        });
    }
}

