const HueApi = require('node-hue-api').HueApi;

const username = "WFLf-2QjqLpOhV0AsgBmXJhgivLnkL0v9EKIpJ-V";
const bridgeip = "192.168.1.45";

const displayResult = function(res) {
    console.log(JSON.stringify(res, null, 2));
}

//hue.nupnpSearch().then(displayResult).done();

var api = new HueApi(bridgeip, username);

//api.config().then(displayResult).done();
api.lights().then(displayResult).done();