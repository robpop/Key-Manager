"use strict";

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// https://flatuicolors.com/palette/us

$(() => {
	var draw = SVG().addTo("#key_canvas");
	let xMin = 100;
	let xMax = $("#key_canvas").width()-100;
	let yMin = 100;
	let yMax = $("#key_canvas").height()-100;
  $("#key_canvas").click(() => {
  	$("#key_canvas p").hide();
  	let coordX = getRandomInt(xMin, xMax); // doesn't work for some reason
  	let coordY = getRandomInt(yMin, yMax); // doesn't work for some reason
  	let shape = getRandomInt(0,2);
  	if(shape==0) {
  		draw.polyline([[getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)]]).move(50, 50).fill('#74b9ff');
  	} else if (shape==1) {
  		draw.polyline([[getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)]]).move(50, 50).fill('#ff7675');
  	} else {
  		draw.polyline([[getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)]]).move(50, 50).fill('#00b894');
  	}
  });
});
