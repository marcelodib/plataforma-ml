module.exports.unzip = function () {
    const util = require('util');

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine Learning/shellScripts/unzip.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.startTrain = async function () {
    const util = require('util');

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine Learning/shellScripts/train.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.convertTflite = function () {
    const util = require('util');

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine Learning/shellScripts/convertTflite.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}

module.exports.exportGraph = function () {
    const util = require('util');

    const exec = util.promisify(require('child_process').exec);

    const { stderr } = await exec('sh ~/Desktop/ECCNNO/Machine Learning/shellScripts/exportGraph.sh');

    if (stderr) {
        console.error(`error: ${stderr}`);
    }
}