$(document).ready(function () {

  pauseTimer();
  $("#myButton").click(function () {
    change();
  });
  
  var btn = document.getElementById("myButton");
  var timer;
  let defaultSession = "25:00";
  let defaultBreak = "05:00";
  let sessionRemaining = defaultSession;
  let breakRemaining = defaultBreak;
  let sessionText = $("#timer-label").text();
  updateBreakTimer();
  updateTimer();
  clearTimeout(timer);
  function change() {
    var btn = document.getElementById("myButton");
    if (btn.value == "start") {
      clearTimeout(timer)
      btn.value = "pause";
      btn.innerHTML = "pause";
      btn.classList.add("btn-danger");
      updateTimer();
      
    } else {
      clearTimeout(timer)
      btn.value = "start";
      btn.innerHTML = "start";
      btn.classList.remove("btn-danger");
    }
  }  
  
  function updateBreakTimer() {
    let $worked = $("#worked");
    $worked.html(breakRemaining);
    let $label = $("#timer-label");
    $label.html("Break");
  }

  function updateTimer() {
    let $worked = $("#worked");
    let $label = $("#timer-label");
    $worked.html(sessionRemaining) 
    $label.html("Session");
    $label.css("font-weight", "lighter");
  }
  function update() {
    let $worked = $("#worked");
    var myTime = $worked.html();
    var ss = myTime.split(":");
    var mm = new Date();
    mm.setHours(0);
    mm.setMinutes(ss[0]);
    mm.setSeconds(ss[1]);

    var dt2 = new Date(mm.valueOf() - 1000);
    var temp = dt2.toTimeString().split(" ");
    var ts = temp[0].split(":");

    $worked.html(ts[1] + ":" + ts[2]);
    timer = setTimeout(update, 1000);
    let sessionText = $("#timer-label").text()
    if (ts[1] === "00" && ts[2] === "00" && sessionText == "Session") {
      play();
      sessionRemaining = defaultSession;
      // updateBreakTimer();
      clearTimeout(timer)
      updateTimer();
      btn.value = "start";
      btn.innerHTML = "start";
      btn.classList.remove("btn-danger")
    } 
      else if (ts[1] === "00" && ts[2] === "00" && sessionText == "Break") {
      clearTimeout(timer);
      breakRemaining = defaultBreak;
      updateTimer();
      change();
      setTimeout(update, 1000);  
    }

  }

  
  function pauseTimer() {
    var btn = document.getElementById("myButton");
    $("#myButton").click(function () {
      clearTimeout(timer);
      var checkDataAttr = $("#timer-label").text(); //getter
      if (checkDataAttr === "Break") {
        breakRemaining = $("#worked").text();
        clearTimeout(timer);
        updateBreakTimer();
        setTimeout(update, 1000)
        
      } else if (checkDataAttr === "Session" ){
        sessionRemaining = $("#worked").text();
        clearTimeout(timer);
        updateBreakTimer()
        setTimeout(update, 1000)
      }
    });
  }

  $("#reset").click(function () {
    clearTimeout(timer)
    $("#break-label").html("5:00");
    $("#session-label").html("25:00");
    defaultSession = "25:00";
    defaultBreak = "5:00";
    sessionRemaining = defaultSession 
    breakRemaining = defaultBreak 
    clearTimeout(timer);
    
    $("#timer-label").text() == "Session" ? updateTimer() : updateBreakTimer();
  });

  function getLengthNum(defaultVar) {
    let lengthNumber = defaultVar.split(":");
    lengthNumber = parseInt(lengthNumber[0]);
    return lengthNumber;
  }

  $("#session-label").html(defaultSession);
  $("#break-label").html(defaultBreak);

  $("#session-increment").click(function () {
    if (getLengthNum(defaultSession) < 60) {
      defaultSession = (getLengthNum(defaultSession) + 1).toString() + ":00";
      sessionRemaining = defaultSession
      $("#session-label").html(defaultSession);
      updateTimer();
    }
  });
  $("#session-decrement").click(function () {
    if (getLengthNum(defaultSession) > 0) {
      defaultSession = (getLengthNum(defaultSession) - 1).toString() + ":00";
      sessionRemaining = defaultSession
      $("#session-label").html(defaultSession);
      updateTimer();
    }
  });
  $("#break-increment").click(function () {
    if (getLengthNum(defaultBreak) < 10) {
      defaultBreak = (getLengthNum(defaultBreak) + 1).toString() + ":00";
      breakRemaining = defaultBreak
      $("#break-label").html(defaultBreak);
      updateBreakTimer();
    }
  });
  $("#break-decrement").click(function () {
    if (getLengthNum(defaultBreak) > 0) {
      defaultBreak = (getLengthNum(defaultBreak) - 1).toString() + ":00";
      breakRemaining = defaultBreak
      $("#break-label").html(defaultBreak);
      updateBreakTimer();
    }
  });

  function play() {
    var audio = new Audio(
      "https://www.soundjay.com/clock/sounds/alarm-clock-01.mp3"
    );
    audio.play();
    setTimeout(() => {
      audio.pause();
    }, 4000);
  }
});
