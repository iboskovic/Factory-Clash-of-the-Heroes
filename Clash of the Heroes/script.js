// Random hero without repetition of the same heroes

function getId(min, max, team) {
    let id = Math.floor(Math.random() * (max - min + 1)) + min;
    if (team.filter(t => t.id == id).length > 0) {
        getId(min, max, team);
    } else {
        return id;
    };
};
const fetchHeroes = async () => {
    let team = [];
    for (let i = 0; i < 8; i++) {
        let id = getId(1, 731, team);
        const url = `http://gql.devtvornica.org/cors.php?url=https://superheroapi.com/api/10217569260847682/${id}`;
        let response = await fetch(url).then(res => res.json());
        let hero = {
            id: response.id,
            name: response.name,
            powerstats: response.powerstats
        };
        console.log('%c' + hero.name, 'color:blue;');
        team.push(hero);
    };

    return team;
};

const fight = (firstHero, secondHero) => {
    // Picking random values from powerstats property

    var hero1Val1 = Object.values(firstHero.powerstats);
    var randHero1Val1 = hero1Val1[Math.floor(Math.random() * hero1Val1.length)];
    var hero1Val2 = Object.values(firstHero.powerstats);
    var randHero1Val2 = hero1Val2[Math.floor(Math.random() * hero1Val2.length)];

    var hero2Val1 = Object.values(secondHero.powerstats);
    var randHero2Val1 = hero2Val1[Math.floor(Math.random() * hero2Val1.length)];
    var hero2Val2 = Object.values(secondHero.powerstats);
    var randHero2Val2 = hero2Val2[Math.floor(Math.random() * hero2Val2.length)];

    randHero1Val1 = +randHero1Val1 || 0;
    randHero1Val2 = +randHero1Val2 || 0;
    randHero2Val1 = +randHero2Val1 || 0;
    randHero2Val2 = +randHero2Val2 || 0;
    //console.log('First hero:', randHero1Val1, randHero1Val2);
    //console.log('Second hero:', randHero2Val1, randHero2Val2);

    // Suming values for both hero properties

    var firstHeroStats = +randHero1Val1 + +randHero1Val2;
    var secondHeroStats = +randHero2Val1 + +randHero2Val2;
    //console.log(firstHero.name, firstHeroStats, secondHero.name, secondHeroStats);

    var firstHeroScore = 0;
    var secondHeroScore = 0;

    while (firstHeroScore != 2 || secondHeroScore != 2) {
        if (firstHeroScore == 2 || secondHeroScore == 2) {
            let result = {
                firstHeroScore: firstHeroScore,
                secondHeroScore: secondHeroScore
            };
            return result;
        }

        let winnerId = round(firstHeroStats, secondHeroStats, firstHero.id, secondHero.id);
        if (winnerId == firstHero.id) {
            firstHeroScore++;
        } else if (winnerId == secondHero.id) {
            secondHeroScore++;
        }
    }
};

const round = (firstHeroStats, secondHeroStats, firstHeroId, secondHeroId) => {
    if (firstHeroStats > secondHeroStats) {
        return firstHeroId;
    } else if (firstHeroStats < secondHeroStats) {
        return secondHeroId;
    } else {
        return firstHeroId, secondHeroId;
    }
}

console.log('%c  Chosen Heroes!', 'font-weight:bold;');
const startTournament = async () => {

    let heroes = await fetchHeroes();
    console.log('%c  Quarter Finals!', 'font-weight:bold;');
    let winnerIds = []
    for (let i = 0; i < 8; i += 2) {

        const firstHero = heroes[i];
        const secondHero = heroes[i + 1];
        //console.log(i);
        let result = fight(firstHero, secondHero);

        if (result.firstHeroScore == 2) {
            winnerIds.push(firstHero.id);
            console.log('%c' + firstHero.name, 'color:green;', result.firstHeroScore);
            console.log('%c' + secondHero.name, 'color:red;', result.secondHeroScore);
            console.log(firstHero.name, ' is the Winner!');
            console.log(' ');
        } else {
            winnerIds.push(secondHero.id);
            console.log('%c' + secondHero.name, 'color:green;', result.secondHeroScore);
            console.log('%c' + firstHero.name, 'color:red;', result.firstHeroScore);
            console.log(secondHero.name, ' is the Winner!');
            console.log(' ');
        }
    };
    
    let semiFinalHeroes = heroes.filter(f => winnerIds.includes(f.id));
    console.log('%c  Semi finals!', 'font-weight:bold;');
    
    let winnerIds2 = []
    for (let j = 0; j < 4; j += 2) {
        const firstHero = semiFinalHeroes[j];
        const secondHero = semiFinalHeroes[j + 1];

        let result = fight(firstHero, secondHero);

        if (result.firstHeroScore == 2) {
            winnerIds2.push(firstHero.id);
            console.log('%c' + firstHero.name, 'color:green;', result.firstHeroScore);
            console.log('%c' + secondHero.name, 'color:red;', result.secondHeroScore);
            console.log(firstHero.name, ' is the Winner!');
            console.log(' ');
        } else {
            winnerIds2.push(secondHero.id);
            console.log('%c' + secondHero.name, 'color:green;', result.secondHeroScore);
            console.log('%c' + firstHero.name, 'color:red;', result.firstHeroScore);
            console.log(secondHero.name, ' is the Winner!');
            console.log(' ');
        }
    }

    
    let finalHeroes = semiFinalHeroes.filter(f => winnerIds2.includes(f.id));
    //console.log(finalHeroes);
    console.log('%c  Finals!', 'font-weight:bold;');
    for (let k = 0; k < 1; k++) {
        const firstHero = finalHeroes[k];
        const secondHero = finalHeroes[k + 1];

        let result = fight(firstHero, secondHero);

        if (result.firstHeroScore == 2) {
            winnerIds.push(firstHero.id);
            console.log('%c' + firstHero.name, 'color:green;', result.firstHeroScore);
            console.log('%c' + secondHero.name, 'color:red;', result.secondHeroScore);
            console.log(firstHero.name, ' is the Winner!');
        } else {
            winnerIds.push(secondHero.id);
            console.log('%c' + secondHero.name, 'color:green;', result.secondHeroScore);
            console.log('%c' + firstHero.name, 'color:red;', result.firstHeroScore);
            console.log(secondHero.name, ' is the Winner!');
        }
    }
    
    
};

startTournament();




