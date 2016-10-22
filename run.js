const fs = require('fs');
const listGenerator = require('./src/listGenerator');
const email = require('./src/email');
const list = JSON.parse(fs.readFileSync('./config/list.json', 'utf8'));

listGenerator.makeLists(list, (giftList) => {
    email.mailListsOut(giftList);
});
