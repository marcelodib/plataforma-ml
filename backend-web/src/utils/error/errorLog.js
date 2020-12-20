/*=================================ERROR LOG==================================*/
module.exports.errorController = function (error, controller) {
    console.log("==================================================");
    console.log("DateTime: " + Date());
    console.log("Controller: " + controller);
    console.log("Msg: Internal server error");
    console.log(error);
    console.log("==================================================\n");
}

module.exports.errorService = function (error, controller) {
    console.log("==================================================");
    console.log("DateTime: " + Date());
    console.log("Controller: " + controller);
    console.log("model: " + error.model);
    console.log("Msg: " + error.type);
    console.log(error.error);
    console.log("==================================================\n");
}
/*============================================================================*/