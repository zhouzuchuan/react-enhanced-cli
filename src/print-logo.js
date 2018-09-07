const chalk = require('chalk');
const resolve = require('path').resolve;
const readFileSync = require('fs').readFileSync;

module.exports = function() {
    const pkg = require('../package');
    console.log();
    console.log(
        chalk.green(
            `
            ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄  ▄▄▄▄▄▄▄▄▄▄▄ 
            ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
            ▐░█▀▀▀▀▀▀▀█░▌▐░█▀▀▀▀▀▀▀▀▀ ▐░█▀▀▀▀▀▀▀▀▀ 
            ▐░▌       ▐░▌▐░▌          ▐░▌          
            ▐░█▄▄▄▄▄▄▄█░▌▐░█▄▄▄▄▄▄▄▄▄ ▐░▌          
            ▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌▐░▌          
            ▐░█▀▀▀▀█░█▀▀ ▐░█▀▀▀▀▀▀▀▀▀ ▐░▌          
            ▐░▌     ▐░▌  ▐░▌          ▐░▌          
            ▐░▌      ▐░▌ ▐░█▄▄▄▄▄▄▄▄▄ ▐░█▄▄▄▄▄▄▄▄▄ 
            ▐░▌       ▐░▌▐░░░░░░░░░░░▌▐░░░░░░░░░░░▌
             ▀         ▀  ▀▀▀▀▀▀▀▀▀▀▀  ▀▀▀▀▀▀▀▀▀▀▀  
            
            `
        )
    );
    console.log(chalk.green(`react-enhanced-cli ${chalk.bgGreen(chalk.white(` v${pkg.version} `))}`));
    console.log();
};
