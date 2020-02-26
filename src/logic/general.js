"use strict";

function show_err(m) {
  $("#notification").find("p").text(m);
  $("#notification").addClass("notification_err");
  $("#notification").removeClass("fadeOutDown");
  $("#notification").addClass("fadeInUp");
  $("#notification").removeClass("-hidden");
  setTimeout(() => {
    $("#notification").find("p").text("");
    $("#notification").removeClass("fadeInUp");
    $("#notification").addClass("fadeOutDown");
    setTimeout(() => {
      $("#notification").addClass("-hidden");
      $("#notification").removeClass("notification_err");
    },500);
  },2500);
}

function show_msg(m) {
  $("#notification").find("p").text(m);
  $("#notification").addClass("notification_msg");
  $("#notification").removeClass("fadeOutDown");
  $("#notification").addClass("fadeInUp");
  $("#notification").removeClass("-hidden");
  setTimeout(() => {
    $("#notification").find("p").text("");
    $("#notification").removeClass("fadeInUp");
    $("#notification").addClass("fadeOutDown");
    setTimeout(() => {
      $("#notification").addClass("-hidden");
      $("#notification").removeClass("notification_msg");
    },500);
  },2500);
}

function pin_mismatch(window__create_pin__field, window__create_pin__verify, storage_available) {
  // re-verify PIN because PINs didn't match
  if(storage_available) {
    $(window__create_pin__verify).removeClass("fadeInRight");
    $(window__create_pin__verify).addClass("-hidden");
    $(window__create_pin__field).addClass("fadeInLeft");
    $(window__create_pin__field).removeClass("-hidden");
    $("#field_pin").val("");
    $("#field_pin_verify").val("");
    show_err("Your PINs don't match");
  }
}

$(() => {
  if (typeof(Storage) !== "undefined") {
    let storage_available = true;
    // Code for localStorage/sessionStorage.
    let pin = null
    let window__create_pin = document.getElementById("window__create-pin");
    if (window.localStorage.getItem("pin") === null) {
      // set a PIN
      let window__create_pin__field = document.getElementById("window__create-pin__field");
      let window__create_pin__verify = document.getElementById("window__create-pin__verify");
      let pin_first = null;
      let pin_verify = null;
      $(window__create_pin).removeClass("-hidden");
      $("#field_pin").keypress((e) => {
        let inpkey = e.which;
        if(inpkey == 13) {
          pin_first = $("#field_pin").val();
          $(window__create_pin__field).addClass("fadeOutLeft");
          setTimeout(() => {
            $(window__create_pin__field).removeClass("fadeOutLeft");
            $(window__create_pin__field).addClass("-hidden");
            $(window__create_pin__verify).removeClass("-hidden");
            $("#field_pin_verify").keypress((e) => {
              let inpkey = e.which;
              if(inpkey == 13) {
                pin_verify = $("#field_pin_verify").val();
                if(pin_first === pin_verify) {
                  window.localStorage.setItem("pin", $("#field_pin").val());
                  show_msg("Your PIN is set");
                  $(window__create_pin).removeClass("fadeInDown");
                  $(window__create_pin).addClass("fadeOutDown");
                  setTimeout(() => {
                    $(window__create_pin).addClass("-hidden");
                  },500);
                } else {
                  console.log("PINs Don't Match");
                  pin_mismatch(window__create_pin__field, window__create_pin__verify, storage_available);
                }
              }
            });
          },500);
          return false;
        }
      });
    } else {
      pin = window.localStorage.getItem("pin");
    }
  } else {
    alert("Web storage not supported");
  }
});
