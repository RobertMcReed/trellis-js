'use strict';

const keys = [
  [49, 50, 51, 52, 53, 54, 55, 56], 
  [81, 87, 69, 82, 84, 89, 85, 73], 
  [65, 83, 68, 70, 71, 72, 74, 75], 
  [90, 88, 67, 86, 66, 78, 77, 188]
];

const soundLibrary = {
  voice: {
    characters: [
      'bishop-bomberman.wav',
      'black-bomberman.wav',
      'blue-bomberman.wav',
      'fairy-bomberman.wav',
      'green-bomberman.wav',
      'hero-bomberman.wav',
      'merchant-bomberman.wav',
      'monk-bomberman.wav',
      'ninja-bomberman.wav',
      'red-bomberman.wav',
      'spark-bomber.wav',
      'white-bomberman.wav',
      'witch-bomberman.wav',
    ],
    gameplay: [
      'armor.wav',
      'bomb-up.wav',
      'bomberman-1.wav',
      'bomberman-2.wav',
      'come-on.wav',
      'danger.wav',
      'darn.wav',
      'draw.wav',
      'fire.wav',
      'game-over.wav',
      'game-start.wav',
      'go.wav',
      'i-won.wav',
      'im-burnt.wav',
      'jump.wav',
      'lucky.wav',
      'nooo.wav',
      'ohh.wav',
      'ouch.wav',
      'special.wav',
      'start.wav',
      'time-over.wav',
      'winner.wav',
      'yee-haw.wav',
    ],
    sayings: [
      'a-dark-power.wav',
      'arrgh.wav',
      'by-hadaha.wav',
      'can-you-withstand-my-power.wav',
      'cyclone-power.wav',
      'feel-my-power.wav',
      'i-shall -return.wav',
      'im-not-done-yet.wav',
      'it-hurts.wav',
      'japanese-guy.wav',
      'my-fire-isnt-out-yet.wav',
      'ouch.wav',
      'this-cant-be.wav',
      'this-is-bad.wav',
      'this-isnt-happening.wav',
      'well-done-bomberman.wav',
      'why-was-i-beaten-so-badly.wav',
      'you-cant-defeat-me.wav',
      'youll-be-sorry.wav',
      'youll-never-defeat-me.wav',
      'youre-gonna-fry-now.wav',
      'youre-gonna-get-burned.wav',
      'youve-run-outta-luck.wav',
    ],
  },
  sfx: {
    assorted: [
      'alien-ship.wav',
      'beam-1.wav',
      'beam-2.wav',
      'beep-boop.wav',
      'blip-2.wav',
      'blip.wav',
      'boink.wav',
      'bomb-bound.wav',
      'bomb-kick.wav',
      'bomb-set.wav',
      'boss-dramatic.wav',
      'boss.wav',
      'bribribri.wav',
      'chimes-crystal-1.wav',
      'chimes-crystal-2.wav',
      'chimes.wav',
      'crystal-down.wav',
      'crystal-up.wav',
      'dash.wav',
      'din-doon.wav',
      'drop.wav',
      'drum-1.wav',
      'drum-2.wav',
      'electricity-1.wav',
      'electricity-2.wav',
      'electricity-3.wav',
      'explosion-1.wav',
      'explosion-2.wav',
      'explosion-3.wav',
      'explosion-4.wav',
      'explosion-5.wav',
      'explosion-6.wav',
      'get-item.wav',
      'gong.wav',
      'hit.wav',
      'hurry-up-whistle.wav',
      'jump.wav',
      'laser-2.wav',
      'laser-3.wav',
      'laser.wav',
      'machine-noise.wav',
      'marimba-fast.wav',
      'pan-to-head.wav',
      'piano-fast.wav',
      'player-out.wav',
      'player-up.wav',
      'player-walk.wav',
      'plew.wav',
      'press-block.wav',
      'ricochet.wav',
      'rustle.wav',
      'saw-1.wav',
      'saw-2.wav',
      'sine-wave-1.wav',
      'sine-wave-2.wav',
      'soft-block.wav',
      'spaceship-1.wav',
      'spaceship-2.wav',
      'squirt.wav',
      'tik.wav',
      'times-up.wav',
      'warp.wav',
      'warter-drop.wav',
      'water.wav',
      'whichoo.wav',
      'whip.wav',
      'whipper-woo.wav',
      'whistle-1.wav',
      'whistle-2.wav',
      'whistle-3.wav',
      'woo-woo-woo-woo.wav',
      'zap-1.wav',
      'zap-2.wav',
    ],
    controls: [
      'command-cancel.wav',
      'command-set.wav',
      'confirm.wav',
      'move-ding.wav',
      'pause.wav',
      'reset.wav',
      'select.wav',
    ],
  },
};

const flatKeys = keys.reduce((acc, row) => [...acc, ...row], [])

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

const handlePress = ({
  keyCode,
  shiftKey,
  target,
}) => {
  const { dataset: { key } } = target;

  const code = keyCode || parseInt(key);

  if (!code || !flatKeys.includes(code)) return;
  const div = (key ? target : document.querySelector(`div[data-key="${code}"]`));
  const audio = div.querySelector('audio');
  div.classList.add('playing');
  audio.load();
  audio.play();
  setTimeout(() => {
    div.classList.remove('playing');
  }, 150);
};

const buildBoard = () => {
  const board = document.getElementById('trellis-btns');

  keys.forEach((row, i) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    row.forEach((dataKey, j) => {
      const idx = j + i * 8;

      const buttonDiv = document.createElement('div');
      buttonDiv.classList.add('btn');
      buttonDiv.setAttribute('data-key', String(dataKey))
      
      const audioEl = document.createElement('audio');
      audioEl.src = `sounds/live/${idx}.wav`;

      const pixel = (i * 8) + j;
      const pixel_index = Math.floor(pixel * 256 / 32);
      const color = wheel(pixel_index);
      const rgb = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 1)`;
      buttonDiv.style.backgroundColor = rgb;
      
      buttonDiv.appendChild(audioEl);
      rowDiv.appendChild(buttonDiv);
    })
    
    board.appendChild(rowDiv);
  })

  window.addEventListener('keydown', handlePress);
  board.addEventListener('click', handlePress);
}
  
buildBoard()
