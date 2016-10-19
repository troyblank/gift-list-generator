const fs = require('fs');
const listGenerator = require('./src/listGenerator');
const list = JSON.parse(fs.readFileSync('./config/list.example.json', 'utf8'));

listGenerator.makeLists(list, (giftList) => {
    console.log(giftList);
});
