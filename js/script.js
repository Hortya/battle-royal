
const minAtck = 1;
const maxAtck = 10;
const minDef = 1;
const maxDef = 10;
const minXp = 1;
const maxXp = 10;
const nCara = 4;

let caracters = [];


/**
 * Get a random value between 2 parametr
 * @param {number} min minimal number
 * @param {number} max maximal number
 * @returns {number} random number between 2 parametr
 */
function getRandomBetweenValue(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}

/**
 * Create 'n' numbers of caracters in your array
 * @param {array} array -where you want your caracter to be created in
 * @param {number} n -number of caracters you want to create
 */
function creatCara(array, n) {
    while (array.length < n) {
        array.push({
            name: prompt('choisissez un nom'),
            hp: 50,
            xp: getRandomBetweenValue(minXp, maxXp),
            atck: getRandomBetweenValue(minAtck, maxAtck),
            def: getRandomBetweenValue(minDef, maxDef)
        });
    }
}

/**
 * Do the fight between the attacker and the defender
 * @param {array} array -the caracter's array
 * @param {number} attacker -index of the attacker
 * @param {number} defender -index of the defender
 */
function fight(array, attacker, defender) {
    let atckPwr = getRandomBetweenValue(0, array[attacker].atck) + array[attacker].xp;
    if (atckPwr > getRandomBetweenValue(0, array[defender].def) + array[defender].xp) {
        array[defender].hp -= atckPwr;
        if (array[defender].hp <= 0) {
            console.info(array[attacker].name, ' a tué ', array[defender].name);
            death(array, defender);
        }
        else {
            console.log(`${array[attacker].name} a enlevé ${atckPwr} points de vie à ${array[defender].name}`);
        }
    }
    else {
        console.log(array[defender].name, " a résister à l'attaque de ", array[attacker].name)
    }
}

/**
 * Create the battle. Randomly get an attacker who figth a defender from your caracter's array
 * @param {array} array - caracter's array
 */
function battle(array) {
    //cara atck
    const attacker = getRandomBetweenValue(0, array.length - 1);

    //cara atck
    let defender;
    while (defender === undefined || defender === attacker) {
        defender = getRandomBetweenValue(0, array.length - 1);
    };
    fight(array, attacker, defender);
}

/**
 * Remove a caracter if he/she died from the caracter's array
 * @param {array} array -caracter's array
 * @param {number} defender -index of the defender
 */
function death(array, defender) {
    array.splice(defender, 1);
}

/**
 * Do the battle every 'time' milisecond and stop when only 1 caracter remain
 * @param {array} array -caracter's array
 */
function battleTimout(array){
    setTimeout(() => {
        if (array.length > 1) {
            battle(array);
            battleTimout(array);
        }
        else{
            console.info(`Félicitation à ${array[0].name} d'avoir remporté la victoire !`);
        }
    }, 750)
}

function battleRoyal(array) {
    creatCara(array, nCara);
    console.table(array);
    battleTimout(array);
}

battleRoyal(caracters)