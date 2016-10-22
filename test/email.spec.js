const assert = require('assert');
const sinon = require('sinon');
const Chance = require('chance');
const chance = new Chance();
const email = require('../src/email');

const mockList = [
    {
        name: chance.word(),
        email: chance.email(),
        list: ['jen', 'ron', 'carrie']
    },
    {
        name: chance.word(),
        email: chance.email(),
        list: ['walter', 'jen', 'ron']
    }
];

describe('Email', () => {
    it('should be able able to send out emails using a list', () => {
        const sendEmail = sinon.spy(email, 'sendEmail');

        email.mailListsOut(mockList);
        assert.equal(sendEmail.callCount, 2);
    });

    it('should be able able to generate email options', () => {
        const person = mockList[0];
        const mailOptions = email.generateEmailOptions(person);

        assert.equal(mailOptions.to, `${person.name} <${person.email}>`);
    });

    it('should be able able to generate text content', () => {
        const list = mockList[0].list;
        const text = email.generateTextContent(list);
        const listText = `Please get gifts for the following people:\n\n${list[0]}\n${list[1]}\n${list[2]}\n`;

        assert.equal(text, listText);
    });

    it('should be able able to generate html content', () => {
        const list = mockList[0].list;
        const text = email.generateHtmlContent(list);
        let listText = '<h1>Please get gifts for the following people:</h1>';
        listText += `<ul><li>${list[0]}</li><li>${list[1]}</li><li>${list[2]}</li></ul>`;


        assert.equal(text, listText);
    });
});
