class SoundManager {
  constructor() {
    this.background = null;
    this.effects = [];
  }

  // ==========================
  // Background Music
  // ==========================
  playBackground(src, loop = true, volume = 0.5) {
    this.stopBackground();

    this.background = new Audio(src);
    this.background.src = src;
    this.background.loop = loop;
    this.background.volume = volume;

    this.background.play().catch(() => {});
  }

  stopBackground() {
    if (!this.background) return;

    this.background.pause();
    this.background.currentTime = 0;
    this.background = null;
  }

  // ==========================
  // Sound Effects
  // ==========================
  playEffect(src, volume = 1, onEnded = null) {
  const audio = new Audio(src);

  audio.src = src;
  audio.volume = volume;

  audio.play().catch(() => {});

  this.effects.push(audio);

  audio.onended = () => {
    this.effects = this.effects.filter(
      effect => effect !== audio
    );

    if (onEnded) {
      onEnded();
    }
  };

  return audio;
}

  stopEffect() {
    this.effects.forEach(effect => {
      effect.pause();
      effect.currentTime = 0;
    });

    this.effects = [];
  }

  stopSpecific(audio) {
    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;

    this.effects = this.effects.filter(
      effect => effect !== audio
    );
  }

  // ==========================
  // Pause / Resume
  // ==========================
  pauseAll() {
    if (this.background) {
      this.background.pause();
    }

    this.effects.forEach(effect => effect.pause());
  }

  resumeBackground() {
    if (this.background) {
      this.background.play().catch(() => {});
    }
  }

  // ==========================
  // Stop Everything
  // ==========================
  stopAll() {
    this.stopBackground();
    this.stopEffect();
  }
}

export default new SoundManager();