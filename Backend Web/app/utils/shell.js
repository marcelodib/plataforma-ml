
module.exports.startTrain = async function () {
    const util = require('util');

    const exec = util.promisify(require('child_process').exec);

    const { stdout, stderr } = await exec('sh train.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
    console.log(`Number of files ${stdout}`);
}

module.exports.stopTrain = function () {
    if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
}

module.exports.convertTflite = function () {
    if (shell.exec('git commit -am "Auto-commit"').code !== 0) {
        shell.echo('Error: Git commit failed');
        shell.exit(1);
    }
}