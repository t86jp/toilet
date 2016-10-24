'use strict';

require('date-utils');

var client = require('socket.io-client');
var socket = client.connect('https://iot-toilet.com/');
var TARGET = process.argv[2];

console.log('トイレの空き情報');
console.log('-------------------');

function printToilet(toilet){
  console.log((new Date()).toFormat('YYYY-MM-DD HH24:MI:SS') + ' - ' + toilet.bldg + ' ' + toilet.status);
}

socket.on('Update', function(msg) {
  var data = JSON.parse(msg.message);
  var toilet = data ? data[0] : undefined;
  if (!toilet) return;

  if (TARGET && toilet.bldg != TARGET) return;

  printToilet(toilet);
});

socket.on('Initialize', function(msg) {
});
