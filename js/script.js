// const minAtck = 1;
// const maxAtck = 10;
// const minDef = 1;
// const maxDef = 10;
// const minXp = 1;
// const maxXp = 10;
// const nCara = 4;

let caracters = [{
    name : 'Louise MICHEL',
    hp : 50,
    xp : 8,
    atck : 10,
    def : 6
},
{
    name : 'Karl MARX',
    hp : 50,
    xp : 9,
    atck : 6,
    def : 6
},
{
    name : 'Marsha P. JOHNSON',
    hp : 50,
    xp : 9,
    atck : 9,
    def : 9
},
{
    name : 'Manu Macron',
    hp : 5,
    xp : 1,
    atck : 1,
    def : 1
}];


/**
 * Get a random value between 2 parametr
 * @param {number} min minimal number
 * @param {number} max maximal number
 * @returns {number} random number between 2 parametr
 */
function getRandomBetweenValue(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}

// /**
//  * Create 'n' numbers of caracters in your array
//  * @param {array} array -where you want your caracter to be created in
//  * @param {number} n -number of caracters you want to create
//  */
// function creatCara(array, n) {
//     while (array.length < n) {
//         array.push({
//             name: prompt('choisissez un nom'),
//             hp: 50,
//             xp: getRandomBetweenValue(minXp, maxXp),
//             atck: getRandomBetweenValue(minAtck, maxAtck),
//             def: getRandomBetweenValue(minDef, maxDef)
//         });
//     }
// }

/**
 * Add 'n' to the caracter's xp
 * @param {object} caracter -the object of the caracter
 * @param {number} n -the number of lvlup you want him/her to have
 */
function lvlUp (caracter, n){
    caracter.xp += n;
}

/**
 * Do the fight between attacker and defender
 * @param {object} attacker -the object of th attacker
 * @param {object} defender -the object of the defender
 * @return {string} -in case the defender dies, return 'dead' to specifie the death
 */
function fight(attacker, defender) {
    let atckPwr = getRandomBetweenValue(attacker.xp, attacker.atck + attacker.xp);
    if (atckPwr > getRandomBetweenValue(defender.xp, defender.def + defender.xp)) {
        defender.hp -= atckPwr;
        if (defender.hp <= 0) {
            console.info(attacker.name, 'a tué', defender.name);
            lvlUp(attacker, 1);
            return 'dead';
        }
        else {
            console.log(`${attacker.name} a enlevé ${atckPwr} points de vie à ${defender.name}`);
            lvlUp(attacker, 0.5);
        }
    }
    else {
        console.log(defender.name, "a résister à l'attaque de", attacker.name)
        lvlUp(defender, 0.5);
    }
}

/**
 * Create the battle. Randomly get an attacker who figth a defender from your caracter's array
 * @param {array} array - caracter's array
 */
function battle(array) {
    const attacker = getRandomBetweenValue(0, array.length - 1);
    let defender;
    while (defender === undefined || defender === attacker) {
        defender = getRandomBetweenValue(0, array.length - 1);
    };
    fight(array[attacker], array[defender]);
    if (fight(array[attacker], array[defender], defender) === 'dead'){
        death(defender);
    }
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
 * Do the battle every 750 milisecond and stop when only 1 caracter remain
 * @param {array} array -caracter's array
 */
function battleTimout(array){
    setTimeout(() => {
        if (array.length > 1) {
            battle(array);
            battleTimout(array);
        }
        else{
            alert(`Félicitation à ${array[0].name} d'avoir remporté la victoire !`);
            document.location.reload();
        }
    }, 750)
}

function battleRoyal(array) {
    // creatCara(array, nCara);
    console.table(array);
    battleTimout(array);
}

battleRoyal(caracters)