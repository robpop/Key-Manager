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
	//console.log(pins);
	
	let dyn_id_num = 0;

	$.each(pins, function(idx, data){
		let newcode = $(".qr_code__template").clone(true, true);
		let dyn_id = "pin__"+dyn_id_num;

		$(newcode).find(".qr_code").attr("id", dyn_id);

		$($(newcode).removeClass("qr_code__template").addClass("qr_code__instance")).appendTo("#qr_listview");

		// use of eval() is NOT good practice at all - this is for academia
		var qrcode = new QRCode(eval(dyn_id), {
		    text: data.replace(pin_shebang, ''),
		    width: 128,
		    height: 128,
		    colorDark : "#000000",
		    colorLight : "#ffffff",
		    correctLevel : QRCode.CorrectLevel.H
		});

		dyn_id_num++;
	});

	$(".qr_code__instance").click((e) => {
		let code = $(e.target).find(".qr_code");
		let desc = $(e.target).find("p");
		let code_literal = $(code).attr("title");
		$($(code).removeClass("qr__tiny").addClass("qr__actual")).insertBefore("#message_curator");
		$(desc).insertBefore("#message_curator");
		$("#qr_listview").hide();
		$("#qr_full_view").show();
	});

});