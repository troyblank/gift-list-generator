const assert = require('assert');
const fs = require('fs');
const Chance = require('chance');
const chance = new Chance();
const listGenerator = require('../../src/listGenerator');
const testList = JSON.parse(fs.readFileSync('./config/list.example.json', 'utf8'));


describe('List Generator', () => {
    it('should be able able to make a pick list', () => {
        const person = chance.word();
        const people = [
            { name: chance.word() },
            { name: chance.word() },
            { name: person },
            { name: chance.word() }
        ];
        assert.equal(listGenerator.makePicks(4, people).length, 16);
        assert.equal(listGenerator.makePicks(4, people)[11], person);
    });

    it('should be able able to determine if a pick is disqualified', () => {
        const name = chance.word();
        const spouse = chance.word();
        const person1 = chance.word();
        const person2 = chance.word();
        const person = {
            name,
            spouse,
            list: [person1, person2]
        };

        assert.equal(listGenerator.isPickDisqualified(name, person), true);
        assert.equal(listGenerator.isPickDisqualified(spouse, person), true);
        assert.equal(listGenerator.isPickDisqualified(person1, person), true);
        assert.equal(listGenerator.isPickDisqualified(person2, person), true);
        assert.equal(listGenerator.isPickDisqualified(chance.word(), person), false);
    });

//     function getRandomPick(picks, person, maxtries = 100) {
//     const randomIndex = Math.floor(Math.random() * picks.length);
//     const pick = picks[randomIndex];
//     let triesRemaining;

//     if (isPickDisqualified(pick, person)) {
//         triesRemaining = maxtries - 1;
//         if (0 <= triesRemaining) {
//             return getRandomPick(picks, person, triesRemaining);
//         }

//         return false;
//     }

//     picks.splice(randomIndex, 1);
//     return pick;
// }

    it('should be able able to get a random pick', () => {
        const pick1 = chance.word();
        const pick2 = chance.word();
        const name = chance.word();
        const picks = [
            pick1,
            pick2
        ];
        const badPicks = [
            name
        ];
        const person = {
            name,
            list: []
        };

        assert.equal(0 < listGenerator.getRandomPick(picks, person).length, true);
        assert.equal(listGenerator.getRandomPick(badPicks, person), false);
    });

    it('should be able to make a gift list', (done) => {
        listGenerator.makeLists(testList, (giftList) => {
            assert.equal(0 < giftList.length, true);
            done();
        });
    });
});
