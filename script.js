const days = document.querySelector(".days");
const hours = document.querySelector(".hours");
const minutes = document.querySelector(".minutes");
const seconds = document.querySelector(".seconds");

function countdown() {
  const today = new Date();
  const currentYear = today.getFullYear();
  const newYearDay = new Date(`Jan 01 ${currentYear + 1} 00:00:00`);

  const diff = newYearDay - today;

  const temp = Math.floor(diff / 1000);

  const second = temp % 60;

  const minute = Math.floor(temp / 60) % 60;

  const hour = Math.floor(temp / 3600) % 24;

  const day = Math.floor(temp / 86400);

  days.innerHTML = day;
  hours.innerHTML = hour;
  minutes.innerHTML = minute;
  seconds.innerHTML = second;
}

setInterval(countdown, 1);
