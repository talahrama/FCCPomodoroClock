var sessionMinutes = 1;
var breakMinutes = 5;
var seconds;
var active = false;
var onBreak = false;
var t;
var status;

$(document).ready(function() {
  seconds = (sessionMinutes*60);
  seconds=5;
  status = "WORK";
  $("#sessionLength").html(sessionMinutes);
  $("#breakLength").html(breakMinutes);
  $("#curTime").html(makeTime(sessionMinutes));
  $("#status").html("START");
})

$("#decSession").click(function() {
  if (!active && sessionMinutes>1) {
      sessionMinutes--;
      $("#sessionLength").html(sessionMinutes);
      if (status=="WORK") {
        seconds=sessionMinutes*60;    
        $("#curTime").html(sessionMinutes);
      }
  }
})

$("#incSession").click(function() {
  if (!active) {
    sessionMinutes++;
    $("#sessionLength").html(sessionMinutes);
    if (status=="WORK") {
        seconds=sessionMinutes*60;    
        $("#curTime").html(sessionMinutes);
      }
  }
})

$("#incBreak").click(function() {
  if (!active) {
    breakMinutes++;
    $("#breakLength").html(breakMinutes);
    if (status=="BREAK") {
        seconds=sessionMinutes*60;    
        $("#curTime").html(breakMinutes);
      }
  }
})

$("#decBreak").click(function() {
  if (!active) {
    if (breakMinutes>1) {
      breakMinutes--;
      $("#breakLength").html(breakMinutes);
      if (status=="BREAK") {
        seconds=sessionMinutes*60;    
        $("#curTime").html(breakMinutes);
      }
    }
  }
})

function playPause() {
  if (active) {
    clearTimeout(t);
    active=false;
    $("#status").html("PAUSE");
  } else {
    timer();
    active=true;
    $("#status").html(status);
  }
  
}
$("#curTime").click(function() {
  $("#status").html(status);
  playPause();
});

$("#status").click(function() {
  $("#status").html(status);
  playPause();
})

function makeTime() {
  var timeLeft = "";
  if (seconds>(60*60)) {
    timeLeft += Math.floor((seconds/(60*60))) +":";
  } 
  if (seconds>(60)) {
    if (Math.floor(seconds/60)<10) {
      timeLeft+="0";
    }
    timeLeft+=Math.floor((seconds/60)) + ":";
  } else {
    timeLeft+="00:"
  }
  if (seconds%60<10) {
    timeLeft+="0";
  }
  timeLeft+=seconds%60;
  return timeLeft;
}

function runTimer() {
  seconds--;
  if (seconds<=3) {
    $("#curTime").addClass("alertTimer");
  }
  if (seconds===0) {
    $("#curTime").removeClass("alertTimer");
    if (onBreak) {
      seconds = sessionMinutes*60;
      onBreak=false;
      status = "WORK";
      $("#status").html(status);
    } else {
      seconds = breakMinutes*60;
      onBreak=true;
      status = "BREAK";
      $("#status").html(status);
    }
    
  }
  var timeLeft = makeTime();
  $("#curTime").html(timeLeft);
  timer();
}

function timer() {
    t = setTimeout(runTimer, 1000);
}