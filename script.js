const keys = document.querySelectorAll('.key');

keys.forEach((key) => {
  key.addEventListener('click', () => playNote(key));
});

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);

  noteAudio.currentTime = 0;
  noteAudio.play();

  key.classList.add('active');

  noteAudio.addEventListener('ended', () => {
    key.classList.remove('active');
  });
}

// keyboard
const WHITE_KEYS = ['z', 'x', 'c', 'v', 'b', 'n', 'm'];
const BLACK_KEYS = ['s', 'd', 'g', 'h', 'j'];

const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');

document.addEventListener('keydown', (e) => {
  if (e.repeat) return;

  const key = e.key;

  const whiteKeyIndex = WHITE_KEYS.indexOf(key);
  const blackKeyIndex = BLACK_KEYS.indexOf(key);

  if (whiteKeyIndex > -1) {
    playNote(whiteKeys[whiteKeyIndex]);
  }

  if (blackKeyIndex > -1) {
    playNote(blackKeys[blackKeyIndex]);
  }
});

const song = [
  ["C", 500], ["C", 500], ["G", 500], ["G", 500],
  ["A", 500], ["A", 500], ["G", 1000],
  ["F", 500], ["F", 500], ["E", 500], ["E", 500],
  ["D", 500], ["D", 500], ["C", 1000]
];

function playSong(song) {
  let time = 0; 
  song.forEach(([note, duration]) => {
    setTimeout(() => {
      const key = document.querySelector(`.key[data-note="${note}"]`);
      const audio = document.getElementById(note);

      if (key && audio) {
        audio.pause();
        audio.currentTime = 0;
        audio.play();

        key.classList.remove('active');
        void key.offsetWidth; // force 
        key.classList.add('active');

        setTimeout(() => {
          key.classList.remove('active');
        }, duration);
      }
    }, time);
    time += duration;
  });
}

document.getElementById('playSong').addEventListener('click', () => {
  playSong(song);
});
