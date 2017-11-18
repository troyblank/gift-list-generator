# Gift List Generator

[![Build Status](https://travis-ci.org/troyblank/gift-list-generator.svg?branch=master)](https://travis-ci.org/troyblank/gift-list-generator)
[![Coverage Status](https://coveralls.io/repos/github/troyblank/gift-list-generator/badge.svg?branch=master)](https://coveralls.io/github/troyblank/gift-list-generator?branch=master)

## Setup
First thing you want to do is install all node packages run:

    npm install
    
Next you will need to setup recipients of the list

    cp config/list.example.json list.json
    
Inside this file add names, spouses, and emails for each person in the gift circle. A spouse will not get a gift from the person they are with. `listLength` is the amount of gifts each person will be responsible for giving.

After that add authorization for what email it will be sent from 

    cp config/email.example.json email.json
    
Inside the file add an email and password.
    
Currently this will only worith with `smtps`.

## Use

In order to send out an email list:

    npm run
    
## Test

    npm test
