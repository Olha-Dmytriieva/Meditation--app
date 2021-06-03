const duration = document.querySelectorAll(".js-timer-buttons button");
const playBtn = document.querySelector(".play-img");
const ambientBtns = document.querySelectorAll(".js-ambient-buttons button");
const videoContainer = document.getElementById("myVideo");
const audioContainer = document.querySelector(".song");
const timer = document.querySelector(".timer");
const outline = document.querySelector('.moving-outline circle')
duration.forEach((button) => button.addEventListener("click", durationHandler));
ambientBtns.forEach((button) =>
  button.addEventListener("click", ambientHandler)
);
const outlineLength = outline.getTotalLength();
outline.style.strokeDashoffset = outlineLength;
outline.style.strokeDasharray = outlineLength;


let seconds = 0;

function durationHandler(e) {
  seconds = e.target.dataset.time;
  timer.innerHTML = `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60)}0`;
}

playBtn.addEventListener("click", playHandler);

function playHandler(e) {
  playBtn.src = "./svg/pause.svg";
  playBtn.setAttribute("alt", "pause");
  playBtn.classList.toggle("fake");
  audioContainer.play();
  videoContainer.play();

  if (!playBtn.classList.contains("fake")) {
    playBtn.removeAttribute("alt");
    playBtn.src = "./svg/play.svg";
    videoContainer.pause();
    audioContainer.pause();
  }
}

audioContainer.ontimeupdate = function () {
  let date = new Date(null);
  date.setSeconds(seconds - audioContainer.currentTime);
  let result = date.toISOString().substr(14, 5);
  let progress = outlineLength - (audioContainer.currentTime / seconds) * outlineLength;
  outline.style.strokeDashoffset = progress;

  timer.innerHTML = result;

  if (audioContainer.currentTime >= seconds) {
    playBtn.src = "./svg/play.svg";
    videoContainer.pause();
    audioContainer.pause();

    seconds = 0;
  }
};

function ambientHandler(e) {
  if (e.currentTarget) {
    videoContainer.firstElementChild.src = e.currentTarget.dataset.video;
    videoContainer.load();
    audioContainer.firstElementChild.src = e.currentTarget.dataset.sound;
    audioContainer.load();
  }
}


