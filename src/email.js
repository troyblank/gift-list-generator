const fs = require('fs');
const nodemailer = require('nodemailer');
const emailCreds = JSON.parse(fs.readFileSync('./config/email.json', 'utf8'));

const transporter = nodemailer.createTransport(`smtps://${emailCreds.username}:${emailCreds.password}@smtp.gmail.com`);

const mailOptionsTemplate = {
    from: `Digital Santa <${emailCreds.username}>`,
    subject: 'Here is your secret gift list.'
};

function generateHtmlContent(list) {
    let i = 0;
    let html = '<h1>Please get gifts for the following people:</h1><ul>';
    for (i; i < list.length; i++) {
        html += `<li>${list[i]}</li>`;
    }
    html += '</ul>';
    return html;
}

function generateTextContent(list) {
    let i = 0;
    let text = 'Please get gifts for the following people:\n\n';
    for (i; i < list.length; i++) {
        text += `${list[i]}\n`;
    }
    return text;
}

function generateEmailOptions(person) {
    const mailOptions = {
        to: `${person.name} <${person.email}>`,
        text: generateTextContent(person.list),
        html: generateHtmlContent(person.list)
    };
    return Object.assign(mailOptionsTemplate, mailOptions);
}

/* istanbul ignore next */
function sendEmail(mailOptions) {
    transporter.sendMail(mailOptions, (err, res) => {
        if (err) {
            console.log(err);
            transporter.close();
        } else {
            console.log(`Message sent: ${res.accepted}`);
            transporter.close();
        }
    });
}

function mailListsOut(giftList) {
    let i = 0;
    let person;
    for (i; i < giftList.length; i++) {
        person = giftList[i];
        module.exports.sendEmail(generateEmailOptions(person));
    }
}

module.exports = {
    generateHtmlContent,
    generateTextContent,
    generateEmailOptions,
    sendEmail,
    mailListsOut
};
