const bootLog = document.getElementById("bootLog");
const progress = document.getElementById("bootProgress");

const logs = [
  "Initializing Ship Interface…",
  "Loading LCARS modules…",
  "Powering primary systems…",
  "Navigation online…",
  "Warp core stable…",
  "USS AZURA READY"
];

let step = 0;

function bootSequence() {
  if (step < logs.length) {
    bootLog.innerHTML += logs[step] + "<br>";
    progress.style.width = ((step + 1) / logs.length) * 100 + "%";
    step++;
    setTimeout(bootSequence, 700);
  } else {
    setTimeout(() => {
      switchScreen("boot-screen", "login-screen");
    }, 1000);
  }
}

bootSequence();

const AUTH = {
  "AZR-CREW-1626": "Crew",
  "AZR-CAPTAIN-DELTA": "Captain",
  "AZR-ADMIRAL-OMEGA": "Admiral"
};

let role = "";

function login() {
  const code = document.getElementById("authCode").value;
  if (AUTH[code]) {
    role = AUTH[code];
    document.getElementById("userRole").innerText = role;
    switchScreen("login-screen", "main-ui");
  } else {
    document.getElementById("loginMsg").innerText = "ACCESS DENIED";
  }
}

function switchScreen(from, to) {
  document.getElementById(from).classList.remove("active");
  document.getElementById(to).classList.add("active");
}

function openStation(station) {
  const view = document.getElementById("stationView");

  if (station === "starbase" && role === "Crew") {
    view.innerHTML = "<h2>ACCESS RESTRICTED</h2>";
    return;
  }

  view.innerHTML = `<h2>${station.toUpperCase()} STATION ONLINE</h2>`;
}
