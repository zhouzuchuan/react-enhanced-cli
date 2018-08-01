const { join, basename } = require('path');
const vfs = require('vinyl-fs');
const { renameSync } = require('fs');
const through = require('through2');
const { sync } = require('empty-dir');
const leftPad = require('left-pad');
const chalk = require('chalk');

const emptyDir = sync;

function info(type, message) {
    console.log(`${chalk.green.bold(leftPad(type, 12))}  ${message}`);
}

function error(message) {
    console.error(chalk.red(message));
}

function success(message) {
    console.error(chalk.green(message));
}

function init(aaa) {
    const { demo, install } = aaa;

    // const type = demo ? 'demo' : 'app';
    const cwd = join(__dirname, '../boilerplates', 'app');
    const dest = process.cwd();
    const projectName = basename(dest);

    if (!emptyDir(dest)) {
        error('Existing files here, please run init command in an empty folder!');
        process.exit(1);
    }

    console.log(`Creating a new RE app in ${dest}.`);
    console.log();

    vfs.src(['**/*', '!node_modules/**/*'], { cwd: cwd, cwdbase: true, dot: true })
        .pipe(template(dest, cwd))
        .pipe(vfs.dest(dest))
        .on('end', function(...q) {
            // info('rename', 'gitignore -> .gitignore');
            // renameSync(join(dest, 'gitignore'), join(dest, '.gitignore'));

            if (install) {
                info('run', 'npm install');

                require('./install')(printSuccess);
            } else {
                printSuccess();
            }
        })
        .resume();

    function printSuccess() {
        success(`
Success! Created ${projectName} at ${dest}.

Inside that directory, you can run several commands:
  * npm dev: Starts the development server.
  * npm run build: Bundles the app into dist for production.
  * npm test: Run test.

We suggest that you begin by typing:
  cd ${dest}
  npm dev

Happy hacking!`);
    }
}

function template(dest, cwd) {
    console.log('');
    return through.obj(function(file, enc, cb) {
        if (!file.stat.isFile()) {
            return cb();
        }

        info('create', file.path.replace(cwd + '/', ''));
        this.push(file);
        cb();
    });
}

module.exports = init;
