const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const title = document.getElementById("title");
const cover = document.getElementById("cover");

// songs
const songs = ["How You Like That", "Kill This Love", "SOLO", "WHISTLE"];

let songIndex = 0;
let flag = false;

// load songs
loadSong(songs[songIndex]);

function loadSong(song) {
  title.innerHTML = song;
  cover.src = `./image/${song}.jpeg`;
  audio.src = `./music/${song}.mp3`;
}

// play song
function playSong() {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-play");
  playBtn.querySelector("i.fa-solid").classList.add("fa-pause");

  audio.play();
}

function pauseSong() {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fa-solid").classList.remove("fa-pause");
  playBtn.querySelector("i.fa-solid").classList.add("fa-play");

  audio.pause();
}

// Next song
function nextSong() {
  {
    //   if (songIndex < songs.length - 1) {
    //     songIndex += 1;
    //   } else {
    //     songIndex = 0;
    //   }
    //   flag = true;
    songIndex++;
    if (songIndex > songs.length - 1) songIndex = 0;

    loadSong(songs[songIndex]);
    playSong();
  }
}

// Prev song
function prevSong() {
  //   if (songIndex > 0) {
  //     songIndex -= 1;
  //   } else {
  //     songIndex = songs.length - 1;
  //   }
  //   flag = true;
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;

  loadSong(songs[songIndex]);
  playSong();
}

// update progress
function updateProgress(event) {
  const currentTime = event.srcElement.currentTime;
  const duration = event.srcElement.duration;
  const progressPercent = (currentTime / duration) * 100;
  //   console.log(duration, currentTime);
  progress.style.width = `${progressPercent}%`;
}

// Set progress
function setProgress(event) {
  const width = this.clientWidth; // Width of the progress bar - a constant value
  //   console.log(width);
  //   console.log(event);
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}

// Event handlers
playBtn.addEventListener("click", () => {
  //   flag == false ? playSong() : pauseSong();
  //   flag = !flag;
  //   console.log(flag);
  const isPlaying = musicContainer.classList.contains("play");
  isPlaying ? pauseSong() : playSong();
  console.log(isPlaying);
});

document.body.addEventListener("keydown", (event) => {
  const isPlaying = musicContainer.classList.contains("play");
  console.log(event);

  if (event.code === "Space") {
    isPlaying ? pauseSong() : playSong();
  }
});

prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", nextSong);

progressContainer.addEventListener("click", setProgress);
