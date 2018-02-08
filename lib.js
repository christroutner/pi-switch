/*
  This library contains code to perform low level functions. It keeps the main
  index.js file free from clutter.
*/

"use strict";

const ping = require("ping");
const gpio = require("onoff").Gpio;

const RELAY1 = 4; // Pi pin 7, BCM 4
const RELAY2 = 22; // Pi pin 3, BCM 22
const RELAY3 = 6; // Pi pin 22, BCM 6
const RELAY4 = 26; // Pi pin 25, BCM 26

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

// Returns a promise, which resolves to a gpio object when the pin is
// changed to an output.
// Currently, the output pin defaults to low. TODO implement val to set to high
// or low.
function makeOutput(pin, val) {
  return new Promise(function(resolve, reject) {
    const pinModel = new gpio(pin, "out");
    pinModel.write(0, function(err, data) {
      if (err) return reject(err);
      return resolve(pinModel);
    });
  });
}

async function initRelay() {
  await makeOutput(RELAY1, 0);
  console.log(`Relay 1 initialized`);

  //relay1 = new gpio(RELAY1, "out");
  //relay1.write(0, function(err, val) {
  //  if (err) console.error(err);
  //  console.log(`Relay 1 initialize with ${val}`);
  //});

  /*
  relay2 = new gpio(RELAY2, "out");
  relay2.writeSync(0);

  relay3 = new gpio(RELAY3, "out");
  relay3.writeSync(0);

  relay4 = new gpio(RELAY4, "out");
  relay4.writeSync(0);
*/
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
    relay1.write(0, function(err, value) {
      if (err) console.error(err);
      console.log(`Relay 1 turned off with ${value}`);
    });
    toggleVal = false;
  } else {
    console.log(`Turning relay 1 on.`);
    relay1.write(1, function(err, value) {
      if (err) console.error(err);
      console.log(`Relay 1 turned on with ${value}`);
    });
    toggleVal = true;
  }
}

module.exports.sleep = sleep;
module.exports.pingInternet = pingInternet;
module.exports.initRelay = initRelay;
module.exports.toggleRelay1 = toggleRelay1;
