let sounds = {};
if (typeof window !== "undefined") {
  sounds = {
    newMessage: new Audio("/app/assets/audio/new.mp3"),
  };
}

const playSound = (name) => {
  const audio = sounds[name];
  if (!audio) return;

  audio.currentTime = 0;
  audio.play().catch(() => {});
};

export default playSound;
