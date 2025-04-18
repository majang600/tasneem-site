// assets/js/slogan.js
const words = ['Read','Understand','Grow']
let idx = 0
const el = document.getElementById('slogan-text')

function cycle() {
  el.innerText = words[idx]
  idx = (idx + 1) % words.length
}

document.addEventListener('DOMContentLoaded', () => {
  cycle()
  setInterval(cycle, 3000)
})
