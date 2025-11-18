let sounds = {};
const unlockAudio = () => {
  sounds = {
    newMessage: new Audio("/app/assets/audio/new.mp3"),
  };

  Object.values(sounds).forEach((audio) => {
    audio.volume = 0.05;
    audio.play().catch(() => {});
  });

  document.removeEventListener("click", unlockAudio);
  document.removeEventListener("keydown", unlockAudio);
};

if (typeof window !== "undefined") {
  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);
}

const playSound = (name) => {
  const audio = sounds[name];
  if (!audio) return;

  audio.volume = 1;
  audio.currentTime = 0;
  audio.play().catch(() => {});
};

export default playSound;
