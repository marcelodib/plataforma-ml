const util = require('util');

module.exports.mkdirUser = function (user) {
    const execSync = require('child_process').execSync;

    const { stderr } = execSync('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/mkdirUser.sh ' + user);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.mkdirProject = function (user, project) {
    const execSync = require('child_process').execSync;

    const { stderr } = execSync('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/mkdirProject.sh ' + user + ' ' + project);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.deleteProject = function (user, project) {
    const execSync = require('child_process').execSync;

    const { stderr } = execSync('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/deleteProject.sh ' + user + ' ' + project);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.unzip = function (user, project) {

    const execSync = require('child_process').execSync;

    const { stderr } = execSync('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/unzip.sh ' + user + ' ' + project);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.startTrain = async function (user, project, label) {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/train.sh ' + user + " " + project + " " + label);

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.convertTflite = async function () {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/convertTflite.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.exportGraph = async function () {

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine_Learning/scripts/exportGraph.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}