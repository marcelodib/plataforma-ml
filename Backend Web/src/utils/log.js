/*=================================ERROR LOG==================================*/
module.exports.errorLog = function (email, controller, model, msg, error) {
    console.log("==================================================");
    console.log("DateTime: " + Date(Date.now()).toString());
    console.log("Email: " + email);
    console.log("Controller: " + controller);
    console.log("Msg: " + msg);
    console.log("Error(" + model + "): " + error);
    console.log("==================================================\n");
}
/*============================================================================*/
