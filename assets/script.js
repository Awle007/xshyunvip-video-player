let form = document.querySelector('form');
let returnBtn = document.querySelector('.card-back .return');
let cancelBtn = document.querySelector('.cancel-btn');
let delay;

var version = '1.7.0';
var storedVersion = localStorage.getItem('version');

if (!storedVersion || storedVersion !== version) {
    localStorage.setItem('version', version);
    window.location.reload(true); 
}

var date = new Date();
var formatter = new Intl.DateTimeFormat('zh-CN', {
  timeZone: 'Asia/Shanghai',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit'
});
var today = formatter.format(date).split('/').join('-');

var announcementCard = document.querySelector('.announcement-card');
var overlay = document.querySelector('.overlay');

if (!localStorage.getItem('announcementShown' + today)) {
    announcementCard.style.display = 'block';
    overlay.style.display = 'block';
} else {
    announcementCard.style.display = 'none';
}

function closeModal() {
    announcementCard.style.display = 'none';
    overlay.style.display = 'none';
    localStorage.setItem('announcementShown' + today, 'true');
}

document.addEventListener('DOMContentLoaded', function () {
  const urlParams = new URLSearchParams(window.location.search);
  const videoUrl = urlParams.get('videoUrl');
  if (videoUrl) {
    const mediaInput = document.getElementById('media-url');
    mediaInput.value = decodeURIComponent(videoUrl);

    const playButton = document.querySelector('button[type="submit"].play');
    if (playButton) {
      setTimeout(function () {
        playButton.click();
      }, 500);
    }
  }
});

window.onresize = function () {
  document.body.style.minHeight = window.innerHeight + 'px'
}
window.onresize()

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let mediaInput = document.querySelector('#media-url')
  let mediaURL = mediaInput.value
  let api = document.querySelector('.api:checked').value
  let card = document.querySelector('.card')
  let player = document.querySelector('.player')

  mediaInput.blur()
  card.classList.add('turn-to-back')
  delay = window.setTimeout(function () {
    player.src = api + mediaURL
  }, 800)

  returnBtn.addEventListener('click', (e) => {
    player.src = ''
    card.classList.remove('turn-to-back')
    window.clearTimeout(delay)
  })
})

function playAudio() {
  var audio = new Audio('public/jntm.mp3');
  audio.volume = 1;
  audio.play();
}
