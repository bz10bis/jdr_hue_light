const hue = require("node-hue-api");
const colors = require("colors");
const figlet = require("figlet");

const HueApi = hue.HueApi;
const argv = require('minimist')(process.argv.slice(2));
const username = "WFLf-2QjqLpOhV0AsgBmXJhgivLnkL0v9EKIpJ-V";

const displayResult = function(res) {
    console.log(JSON.stringify(res, null, 2));
    return res;
}

const displayBridgeInfo = function(res) {
    if(res.length === 0) {
        console.log("No Bridge found on local network");
        return;
    }
    console.log("Bridge(s) found:");
    let i;
    for (i = 0; i < res.length; i++) {
        console.log("Bridge " + 1 + " ==========");
        console.log("id: " + res[i]["id"]);
        console.log("ip address:" + res[i]["ipaddress"]);
    }
}

if ("scan" in argv ) {
    if (argv["scan"] == "bridges") {
        hue.nupnpSearch().then(displayBridgeInfo).done();    
    } else if (argv["scan"] == "lights") {
        hue.nupnpSearch().then(function(res) {
            let api = new HueApi(res[0]["ipaddress"], username);
            api.lights().then(function(res) {
                //console.log(res["lights"][0]["name"]);
                let i;
                for (i=0; i < res["lights"].length; i++) {
                    console.log(res["lights"][i]["name"]);
                }
            })
        }).done(); 
    } else {
        console.log("[ERROR] specify scan target".red);    
    }
}


