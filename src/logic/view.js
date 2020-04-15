"use strict";

// uses https://davidshimjs.github.io/qrcodejs/

$(() => {
	const pin_shebang = "pin~";
	let pins = [];
	for ( var i = 0, len = window.localStorage.length; i < len; ++i ) {
	  if (~(window.localStorage.getItem(window.localStorage.key(i))).indexOf(pin_shebang)) {
	  	pins.push(window.localStorage.getItem(window.localStorage.key(i)));
	  }
	}
	console.log(pins);
	
	var qrcode = new QRCode("test_qr_code", {
	    text: pins[0].replace(pin_shebang, ''),
	    width: 128,
	    height: 128,
	    colorDark : "#000000",
	    colorLight : "#ffffff",
	    correctLevel : QRCode.CorrectLevel.H
	});

});