class SoundManager {
  constructor() {
    this.background = null;
    this.currentTrack = null;
    this.effects = [];
  }

  // ==========================
  // Background Music
  // ==========================
  playBackground(src, loop = true, volume = 0.5) {
    // Don't restart the same track
    if (this.currentTrack === src && this.background) {
      return;
    }

    this.stopBackground();

    this.currentTrack = src;
    this.background = new Audio(src);
    this.background.loop = loop;
    this.background.volume = volume;

    this.background.play().catch(() => {});
  }

  stopBackground() {
    if (!this.background) return;

    this.background.pause();
    this.background.currentTime = 0;
    this.background = null;
    this.currentTrack = null;
  }

  // ==========================
  // Sound Effects
  // ==========================
  playEffect(src, volume = 1, onEnded = null) {
    const audio = new Audio(src);
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
  // Helpers
  // ==========================
  isPlaying(src) {
    return this.currentTrack === src;
  }

  getCurrentTrack() {
    return this.currentTrack;
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