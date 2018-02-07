/*
  This library contains code to perform low level functions. It keeps the main
  index.js file free from clutter.
*/

"use strict";

const ping = require("ping");
const gpio = require("onoff").Gpio;

const RELAY1 = 7;
const RELAY2 = 3;
const RELAY3 = 22;
const RELAY4 = 25;

let relay1, relay2, relay3, relay4;
let toggleVal = false;

// Promise based sleep function.
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Ping 5 websites. Return true if 3/5 can be pinged successfully. Otherwise,
// return false.
async function pingInternet() {
  const hosts = ["p2pvps.org", "google.com", "yahoo.com", "amazon.com", "en.wikipedia.org"];

  let res;
  let passCnt = 0;
  for (let i = 0; i < hosts.length; i++) {
    res = await ping.promise.probe(hosts[i]);
    //console.log(res);
    if (res.alive) {
      console.log(`${res.host} ping returned successfully.`);
      passCnt++;
    } else {
      //debugger;
      console.log(`${res.host} ping failed.`);
    }
  }

  if (passCnt >= 3) return true;

  return false;
}

function initRelay() {
  relay1 = new gpio(RELAY1, "out");
  relay1.writeSync(0);

  relay2 = new gpio(RELAY2, "out");
  relay2.writeSync(0);

  relay3 = new gpio(RELAY3, "out");
  relay3.writeSync(0);

  relay4 = new gpio(RELAY4, "out");
  relay4.writeSync(0);
}

function toggleRelay1() {
  /*
  const val = relay1.readSync();

  if (val === 0) {
    console.log(`Relay 1 is off. Turning it on.`);
    relay1.writeSync(1);
  } else if (val === 1) {
    console.log(`Relay 1 is on. Turning it off.`);
    relay1.writeSync(1);
  } else {
    console.log(`Relay 1 is unknown state: ${val}`);
    relay1.writeSync(0);
  }
  */

  if (toggleVal) {
    console.log(`Turning relay 1 off.`);
    relay1.writeSync(0);
    toggleVal = false;
  } else {
    console.log(`Turning relay 1 on.`);
    relay1.writeSync(1);
    toggleVal = true;
  }
}

module.exports.sleep = sleep;
module.exports.pingInternet = pingInternet;
module.exports.initRelay = initRelay;
module.exports.toggleRelay1 = toggleRelay1;
