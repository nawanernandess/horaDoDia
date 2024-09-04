const laps = document.getElementById("laps");
let hour = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let cronometro;

const timeNow = () => {
  const time = document.getElementById("time");
  let dateNow = new Date();
  let hh = dateNow.getHours();
  let mm = dateNow.getMinutes();
  let ss = dateNow.getSeconds();

  hh = formatValue(hh);
  mm = formatValue(mm);
  ss = formatValue(ss);

  time.innerHTML = `${hh}:${mm}:${ss}`;
};

function date() {
  const date = document.getElementById("date");
  let newDate = new Date();

  date.innerHTML = newDate.toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function start() {
  cronometro = setInterval(() => {
    timer();
  }, 10);

  document.getElementById("start").classList.add("d-none");
  document.getElementById("reset").classList.add("d-none");
  document.getElementById("flag").classList.remove("d-none");
}

function pause() {
  clearInterval(cronometro);
  document.getElementById("start").classList.remove("d-none");
  document.getElementById("reset").classList.remove("d-none");
  document.getElementById("flag").classList.add("d-none");
  document.getElementById("pause").classList.add("d-none");
}

function lapRecord() {
  const hh = formatValue(hour);
  const mm = formatValue(minutes);
  const ss = formatValue(seconds);
  const ms = formatValue(String(milliseconds).slice(0, -1));
  const lapsTime = `${hh}:${mm}:${ss}.${ms}`;
  const lapsList = document.createElement("li");

  lapsList.textContent = lapsTime;
  laps.appendChild(lapsList);

  document.getElementById("laps").classList.remove("d-none");
}

function reset() {
  hour = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  document.getElementById("hour").innerHTML = "00";
  document.getElementById("minutes").innerHTML = "00";
  document.getElementById("seconds").innerHTML = "00";
  document.getElementById("milliseconds").innerHTML = "00";

  document.getElementById("reset").classList.add("d-none");

  const laps = document.getElementById("laps");
  laps.classList.add("d-none");
  while (laps.firstChild) {
    laps.removeChild(laps.firstChild);
  }
}

function timer() {
  if ((milliseconds += 10) == 1000) {
    milliseconds = 0;
    seconds++;
  }

  if (seconds == 60) {
    seconds = 0;
    minutes++;
  }

  if (minutes == 60) {
    minutes = 0;
    hour++;
  }

  if (milliseconds > 0 || seconds > 0 || hour > 0) {
    document.getElementById("pause").classList.remove("d-none");
  }

  document.getElementById("hour").innerHTML = formatValue(hour);
  document.getElementById("minutes").innerHTML = formatValue(minutes);
  document.getElementById("seconds").innerHTML = formatValue(seconds);
  document.getElementById("milliseconds").innerHTML = formatValue(
    String(milliseconds).slice(0, -1)
  );
}

function formatValue(value) {
  return value >= 10 ? value : `0${value}`;
}

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    "0"
  );
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

timeNow();
setInterval(timeNow, 1000);
date();
