class SoundManager {
  constructor() {
    this.background = null;
    this.effect = null;
  }

  // Background music
  playBackground(src, loop = true, volume = 0.5) {
    this.stopBackground();

    this.background = new Audio(src);
    this.background.loop = loop;
    this.background.volume = volume;

    this.background.play().catch(() => {});
  }

  stopBackground() {
    if (this.background) {
      this.background.pause();
      this.background.currentTime = 0;
      this.background = null;
    }
  }

  // Sound effects
  playEffect(src, volume = 1) {
    this.stopEffect();

    this.effect = new Audio(src);
    this.effect.volume = volume;

    this.effect.play().catch(() => {});
  }

  stopEffect() {
    if (this.effect) {
      this.effect.pause();
      this.effect.currentTime = 0;
      this.effect = null;
    }
  }
}

export default new SoundManager();