let form = document.querySelector('form')
let returnBtn = document.querySelector('.card-back .return')
let cancelBtn = document.querySelector('.cancel-btn')
let delay

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
    mediaInput.value = ''
    window.clearTimeout(delay)
  })
})

cancelBtn.addEventListener('click', (e) => {
  setTimer.classList.remove('show-set-timer')
  if(timer) {
    window.clearTimeout(timer)
  }
})
function playAudio() {
  var audio = new Audio('public/jntm.mp3');
  audio.volume = 1;
  audio.play();
}