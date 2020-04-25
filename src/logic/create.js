"use strict";

// hashCode prototype grabbed from
// https://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript
Object.defineProperty(String.prototype, 'hashCode', {
  value: function() {
    var hash = 0, i, chr;
    for (i = 0; i < this.length; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0;
    }
    return hash;
  }
});


function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// colors
// https://flatuicolors.com/palette/us

$(() => {
	var draw = SVG().addTo("#key_canvas").size("100%", "100%");
  let pkey = null;
  $("#key_canvas").click((e) => {
  	$("#key_canvas p").hide();
  	let coordX = e.pageX;
  	let coordY = e.pageY;
    console.log(coordX+" "+coordY);
  	let shape = getRandomInt(0,2);
  	if(shape==0) {
  		draw.polyline([[getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)]]).cx(coordX).cy(coordY).fill('#74b9ff');
  	} else if (shape==1) {
  		draw.polyline([[getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)]]).cx(coordX).cy(coordY).fill('#ff7675');
  	} else {
  		draw.polyline([[getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)], [getRandomInt(-100,100),getRandomInt(-100,100)]]).cx(coordX).cy(coordY).fill('#00b894');
  	}
    pkey = draw.svg().hashCode();
    $("#private_key").text(pkey);
    $("#private_key_use").css({
      "opacity":"1",
      "pointer-events":"auto"
    })
  });

  $("#private_key_use").click(() => {
    // save the key and go to views
    window.localStorage.setItem((Math.floor(Math.random() * 1000000)).toString(), "pin~"+CryptoJS.AES.encrypt($("#private_key").text(), window.localStorage.getItem("pin").toString()).toString());
    window.location.href = "view.html";
  });
});
