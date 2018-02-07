/*
  This library contains code to perform low level functions. It keeps the main
  index.js file free from clutter.
*/

"use strict";

const ping = require("ping");

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function pingInternet() {
  const hosts = ["p2pvps.org", "google.com", "yahoo.com", "asdahrhejah.com"];

  let res;
  for (let i = 0; i < hosts.length; i++) {
    res = await ping.promise.probe(hosts[i]);
    //console.log(res);
    if (res.alive) console.log(`${res.host} ping returned successfully.`);
    else console.log(`${res.host} ping failed.`);
  }
}

module.exports.sleep = sleep;
module.exports.pingInternet = pingInternet;
