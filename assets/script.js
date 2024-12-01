let form = document.querySelector('form');
let returnBtn = document.querySelector('.card-back .return');
let cancelBtn = document.querySelector('.cancel-btn');
let delay;

var version = '1.9.7';
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

var keysToDelete = [];
for (var i = 0; i < localStorage.length; i++) {
  var key = localStorage.key(i);
  if (key.startsWith('announcementShown') && !key.endsWith(today)) {
    keysToDelete.push(key);
  }
}

keysToDelete.forEach(function (key) {
  localStorage.removeItem(key);
});

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

const images = ['bj1.jpg', 'bj2.jpg', 'bj3.jpg', 'bj4.jpg', 'bj5.jpg', 'bj6.jpg'];
const randomIndex = Math.floor(Math.random() * images.length);
document.getElementById('backgroundImage').src = `public/images/${images[randomIndex]}`;

document.getElementById('api1').checked = true;

const urlParams = new URLSearchParams(window.location.search);
const videoUrl = urlParams.get('videoUrl');
const videoSource = urlParams.get('source');

const hiddenPlayerApi = '请更换您自己的解析地址（此处为切片解析）';

function selectRouteBySource(source) {
  if (source === 'official') {
    document.getElementById('api1').checked = true;
  } else if (source === 'heimuer') {
    document.querySelectorAll('.api').forEach(api => api.checked = false);
  } else {
    document.getElementById('api1').checked = true;
  }
}

if (videoUrl) {
  const mediaInput = document.getElementById('media-url');
  mediaInput.value = decodeURIComponent(videoUrl);

  selectRouteBySource(videoSource);

  const playButton = document.querySelector('button[type="submit"].play');
  if (playButton) {
    setTimeout(function () {
      playButton.click();
    }, 500);
  }
}

window.onresize = function () {
  document.body.style.minHeight = window.innerHeight + 'px'
}
window.onresize();

const infoBox = document.getElementById('infoBox');
const closeButton = document.querySelector('.info-box-close');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let mediaInput = document.querySelector('#media-url');
  let mediaURL = mediaInput.value;
  let api;
  
  if (videoSource === 'heimuer') {
    api = hiddenPlayerApi;
  } else {
    api = document.querySelector('.api:checked').value;
  }
  
  let card = document.querySelector('.card');
  let player = document.querySelector('.player');
  let returnBtn = document.querySelector('.return');

  mediaInput.blur();
  card.classList.add('turn-to-back');
  delay = window.setTimeout(function () {
    player.src = api + mediaURL;
  }, 800);

  returnBtn.addEventListener('click', (e) => {
    player.src = '';
    card.classList.remove('turn-to-back');
    window.clearTimeout(delay);
  });
  infoBox.classList.add('show');
  infoBox.classList.remove('hide');

  setTimeout(function() {
    infoBox.classList.remove('show');
  }, 5000);

  closeButton.addEventListener('click', function() {
    infoBox.classList.remove('show');
    infoBox.classList.add('hide');
  });
});

const input = document.getElementById('media-url');
const clearButton = document.getElementById('clear-button');

function updateClearButtonVisibility() {
  clearButton.style.display = input.value ? 'flex' : 'none';
}

updateClearButtonVisibility();

input.addEventListener('input', updateClearButtonVisibility);
setInterval(updateClearButtonVisibility, 100);

clearButton.addEventListener('click', function () {
  input.value = '';
  updateClearButtonVisibility();
  input.focus();
});

function playAudio() {
  var audioFiles = [
    'public/cxk/cxk1.MP3',
    'public/cxk/cxk2.MP3',
    'public/cxk/cxk3.MP3',
    'public/cxk/cxk4.MP3',
    'public/cxk/cxk5.MP3',
    'public/cxk/cxk6.MP3',
    'public/cxk/cxk7.MP3',
  ];
  var randomIndex = Math.floor(Math.random() * audioFiles.length);
  var audio = new Audio(audioFiles[randomIndex]);
  audio.volume = 1;
  audio.play();
}