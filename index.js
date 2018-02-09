/*
  This program controls a 4-switch relay board purchased on Amazon.com. Here is
  the wiki for the relay board:
  http://wiki.keyestudio.com/index.php/KS0212_keyestudio_RPI_4-channel_Relay_Shield

  The purpose of this program is to power-cycle a DSL modem whenever the internet
  goes down for more than 15 minutes.

  The power to the modem is routed through one of the relays. The Pi constantly
  pings 5 different websites, every 3 mintutes. If 3 of 5 do not respond, the
  test is considered a 'fail'. If the test fails 5 times in a row (15 minutes),
  then the modem is power cycled.
*/

"use strict";

const lib = require("./lib.js");

const POLL_INTERVAL = 60000 * 1; // 3 minutes
let passCnt = 0;

// Create a new timer event to ping the internet.
const pollTimer = setInterval(() => pollInternet(), POLL_INTERVAL);

// Poll the internet. Power cycle the modem if the internet can't be reached.
async function pollInternet() {
  // Poll the internet to ensure the device is still connected to the internet.
  const netConnection = await lib.pingInternet();

  // If the internet connection is functioning correctly, exit.
  if (netConnection) {
    passCnt = 0;
    return;
  }

  // Test failed? Increment the counter.
  passCnt++;
  console.log(`Ping test failed ${passCnt} times.`);

  // Test failed 5 times? Power cycle the modem
  if (passCnt >= 2) {
    passCnt = 0;
    clearInterval(pollTimer); // Disable the timer until the modem can be rebooted.
    powerCycle();
  }
}
pollInternet();

// Power cycle the modem.
async function powerCycle() {
  console.log(`Power cycling the modem...`);

  // Power off the modem.
  await lib.relay1On();
  console.log(`...Modem power off...`);

  // Wait 1 minute;
  await lib.sleep(60000 * 1);

  // Power the modem back on.
  await lib.relay1Off();
  console.log(`...Modem power on...`);

  // Wait for the modem to boot back up.
  await lib.sleep(60000 * 5);
  console.log(`...Internet should be restored.`);

  // Begin polling the internet again.
  pollTimer = setInterval(() => pollInternet(), POLL_INTERVAL);
}

//lib.initRelay();
//setInterval(() => {
//  lib.toggleRelay1();
//}, 10000);
