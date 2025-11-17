let sounds = {};
if (typeof window !== "undefined") {
  sounds = {
    newMessage: new Audio("/app/assets/audio/new.mp3"),
  };

  const unlockAudio = () => {
    Object.values(sounds).forEach((audio) => {
      audio.play().catch(() => {});
    });

    document.removeEventListener("click", unlockAudio);
    document.removeEventListener("keydown", unlockAudio);
  };

  document.addEventListener("click", unlockAudio);
  document.addEventListener("keydown", unlockAudio);
}

const playSound = (name) => {
  const audio = sounds[name];
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
};

export default playSound;
