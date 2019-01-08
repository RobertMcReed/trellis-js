'use strict';

const keys = [49, 50, 51, 52, 53, 54, 55, 56, 81, 87, 69, 82, 84, 89, 85, 73, 65, 83, 68, 70, 71, 72, 74, 75, 90, 88, 67, 86, 66, 78, 77, 188];

const wheel = (pos) => {
  if (pos < 0 || pos > 255) return [0, 0, 0];
  else if (pos < 85) return [parseInt(pos * 3), parseInt(255 - pos * 3), 0];
  else if (pos < 170) {
    pos -= 85;
    return [parseInt(255 - pos * 3), 0, parseInt(pos * 3)];
  } else {
      pos -= 170;
      return [0, parseInt(pos * 3), parseInt(255 - pos * 3)];
  }
};

const setColors = () => {
  const rows = Array.from(document.querySelectorAll('.row'));
  rows.forEach((row, i) => {
    const btns = Array.from(row.querySelectorAll('.btn'))
    btns.forEach((btn, j) => {
      const pixel = (i * 8) + j;
      const pixel_index = Math.floor(pixel * 256 / 32);
      const color = wheel(pixel_index);
      const rgb = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.7)`;
      btn.style.backgroundColor = rgb;
      console.log(rgb);
    })
  })
};

const handlePress = ({
  keyCode,
  shiftKey,
  target,
}) => {
  const { dataset: { key } } = target;

  const code = keyCode || parseInt(key);

  if (!code || !keys.includes(code)) return;
  const div = (key ? target : document.querySelector(`div[data-key="${code}"]`));
  const audio = div.querySelector('audio');
  div.classList.add('playing');
  audio.load();
  audio.play();
  setTimeout(() => {
    div.classList.remove('playing');
  }, 150);
}

window.addEventListener('keydown', handlePress);
document.getElementById('trellis-btns')
  .addEventListener('click', handlePress);
  
setColors();
