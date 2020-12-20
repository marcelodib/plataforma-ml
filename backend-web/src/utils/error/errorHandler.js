/*===============================IMPORT MODULES===============================*/
const errorLog = require("./errorLog.js")
/*============================================================================*/

/*=================================MKDIR USER=================================*/
module.exports.errorHandler = function (error, controller) {
    const type = error.type;

    switch (type) {
        case "Database error":
            errorLog.errorService(error, controller);
            break;
        default:
            errorLog.errorController(error, controller);
            break;
    }
}
/*============================================================================*/