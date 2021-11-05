var readline = require('readline');
const fs = require('fs');
const waitForUserInput = require('wait-for-user-input')
const colors = require('colors');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    terminal: false
});

const inputs = [
    {
        var: 'GOOGLE_APPLICATION_CREDENTIALS',
        target: 'dev',
        message: 'Google application credentials file (default: \'~/./pictugram-833db-firebase-adminsdk-ecb6m-da0f3e35fd\'): ',
        default: "pictugram-833db-firebase-adminsdk-ecb6m-da0f3e35fd",
    }
    /*{
        var: 'FIREBASE_AUTH_EMULATOR_HOST',
        target: 'dev',
        message: '* Auth emulator port (default: \'localhost:9099\'): ',
        default: "localhost:9099",
    },
    {
        var: 'FIREBASE_DATABASE_EMULATOR_HOST',
        target: 'dev',
        message: '* Reatime Databse emulator port (default: \'localhost:9000\'): ',
        default: "localhost:9000",
    },
    {
        var: 'FIRESTORE_EMULATOR_HOST',
        target: 'dev',
        message: '* Firestore emulator port (default: \'localhost:8080\'): ',
        default: "localhost:8080",
    },*/
    /**{
        var: 'MAIL',
        target: 'both',
        message: '* Mail to use to send newsletter and email confirmation: ',
        default: 'none'
    },
    {
        var: 'MAIL_SERVICE',
        target: 'both',
        message: 'Name of the mail service you use (default: \'gmail\'): ',
        default: 'gmail'
    },
    {
        var: 'PASS',
        target: 'both',
        message: '* Password of the mail account: ',
        default: 'none'
    },
    {
        var: 'TEAM',
        target: 'both',
        message: 'Name of your compagny/team: ',
        default: 'none'
    },
    {
        var: 'CITY',
        target: 'both',
        message: 'The city where your compagny/team is located',
        default: 'none'
    },
    {
        var: 'API_PATH',
        target: 'both',
        message: 'Path of the api (default: \'/api\'): ',
        default: '/api'
    },
    {
        var: 'PORT',
        target: 'both',
        message: 'Port to bind with the server (default: 8000): ',
        default: '8000'
    },
    {
        var: 'TOKEN_SECRET',
        target: 'both',
        message: 'Enter a secret to generate (default: \'NotR34LlyStongS3Cret\'): ',
        default: 'NotR34LlyStongS3Cret'
    }*/
];


function callback(err) {
    if (err)
        console.log(err);
}


function writeFile(target, variable, value) {
    switch (target) {
        case 'dev':
            fs.appendFile('.config/env-managment/dev.env', (variable) + '=' + (value) + '\n', callback);
            break;
        case 'prod':
            fs.appendFile('.config/env-managment/prod.env', (variable) + '=' + (value) + '\n', callback);
            break;
        default:
            fs.appendFile('.config/env-managment/dev.env', (variable) + '=' + (value) + '\n', callback);
            fs.appendFile('.config/env-managment/prod.env', (variable) + '=' + (value) + '\n', callback);
            break;
    }
}

function setup() {
    fs.writeFile('.config/env-managment/dev.env', '#!/bin/sh\n# .env\n# Developpement environment\n\n', callback);
    //fs.writeFile('.config/env-managment/prod.env', '#!/bin/sh\n# .env\n# Production environment\n\n', callback);
}

async function getEnv() {
    process.setMaxListeners(100);
    let approve = await waitForUserInput('By typing \'yes\', you accept that some .env file may be removed: ');
    if (approve !== 'yes')
        return 84;
    setup();
    console.log(colors.red('Inputs starting with\'*\' are required, the project may not work without'))
    for (let i = 0; i !== inputs.length; i++) {
        let input = inputs[i];
        let target = input.target;
        if (target === 'both')
            target = 'both dev and prod build'
        let message = colors.green(colors.magenta(target) + ' ' + input.message)
        let userInput = await waitForUserInput(message);
        if (!userInput.length)
            userInput = input.default;
        console.log(colors.yellow(input.var) + '=' + colors.blue(userInput) + '\n');
        writeFile(input.target, input.var, userInput);
    }
    return 0;
}

async function main() {
    let env = await getEnv();
    setTimeout(() => {
        console.log(colors.green('Environment files have been generated !!'))
        process.exit(env);
    }, 1000);
}

main();