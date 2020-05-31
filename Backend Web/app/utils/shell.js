const util = require('util');

module.exports.mkdirUser = function (user) {
    const execSync = require('child_process').execSync;

    const { stderr } = execSync('sh ~/Desktop/ECCNNO/Machine_Learning/shellScripts/mkdirUser.sh ' + user);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.mkdirProject = function (user, project) {
    const execSync = require('child_process').execSync;

    const { stderr } = execSync('sh ~/Desktop/ECCNNO/Machine_Learning/shellScripts/mkdirProject.sh ' + user + ' ' + project);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.unzip = async function () {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/shellScripts/unzip.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.startTrain = async function () {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/shellScripts/train.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.convertTflite = async function () {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/shellScripts/convertTflite.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.exportGraph = async function () {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/shellScripts/exportGraph.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}