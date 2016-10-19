function makePicks(listLength, people) {
    let picks = [];
    let i = 0;

    for (i; i < people.length; i++) {
        picks = picks.concat(Array(listLength).fill(people[i].name));
    }
    return picks;
}

function isPickDisqualified(pick, person) {
    if (pick === person.name || pick === person.spouse || person.list.includes(pick)) {
        return true;
    }

    return false;
}

function getRandomPick(picks, person, maxtries = 100) {
    const randomIndex = Math.floor(Math.random() * picks.length);
    const pick = picks[randomIndex];
    let triesRemaining;

    if (isPickDisqualified(pick, person)) {
        triesRemaining = maxtries - 1;
        if (0 <= triesRemaining) {
            return getRandomPick(picks, person, triesRemaining);
        }

        return false;
    }

    picks.splice(randomIndex, 1);
    return pick;
}

function makeLists(list, callback) {
    const listLength = list.listLength;
    const people = list.people;
    const picks = makePicks(listLength, people);
    let i = 0;
    let j, person, pick;

    for (i; i < people.length; i++) {
        j = 0;
        people[i].list = [];
        for (j; j < listLength; j++) {
            person = people[i];
            pick = getRandomPick(picks, person);
            if (!pick) {
                // Couldn't get a good list, trying again....
                makeLists(list, callback);
                return false;
            }
            person.list.push(pick);
        }
    }

    callback(people);
    return true;
}

module.exports = {
    makePicks,
    isPickDisqualified,
    getRandomPick,
    makeLists
};
