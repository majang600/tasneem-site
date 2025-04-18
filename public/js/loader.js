// Splash loader with “Read · Understand · Grow”
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.getElementById('loader');
    const slogan = loader.querySelector('.slogan');
    const words = ['Read', 'Understand', 'Grow'];
    let i = 0;
  
    slogan.innerText = words[i];
    const tick = setInterval(() => {
      i++;
      if (i < words.length) {
        slogan.innerText = words[i];
      } else {
        clearInterval(tick);
        loader.style.opacity = '0';
        setTimeout(() => loader.remove(), 600);
      }
    }, 3000);
  });
  