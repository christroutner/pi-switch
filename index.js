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

const onoff = require("onoff");
var lib = require("./lib.js");
var blah;

const POLL_INTERVAL = 60000 * 3; // 3 minutes

// Create a new timer event.
const pollTimer = setInterval(() => pollInternet(), POLL_INTERVAL);

function pollInternet() {
  // Poll the internet to ensure the device is still connected to the internet.

  // Test succeeded? Clear the counter.

  // Test failed? Increment the counter.

    // Test failed 5 times? Power cycle the modem
}
