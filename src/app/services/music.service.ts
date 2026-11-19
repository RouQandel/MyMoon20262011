import { Injectable, signal } from '@angular/core';
import { BOOK } from '../love-book.config';

/** One audio element for the whole app, so the song never restarts between pages. */
@Injectable({ providedIn: 'root' })
export class MusicService {
  readonly song = BOOK.song;
  readonly playing = signal(false);
  readonly started = signal(false);
  readonly failed = signal(false);
  readonly currentTime = signal(0);
  readonly duration = signal(0);

  private audio: HTMLAudioElement | null = null;
  private fadeFrame = 0;

  /** Must be called from a click so browsers allow sound. Never restarts the song. */
  start(): void {
    if (this.audio) {
      if (!this.playing()) this.play();
      return;
    }
    const audio = new Audio(this.song.src);
    audio.loop = this.song.loop;
    audio.preload = 'auto';
    audio.volume = 0;
    audio.addEventListener('play', () => this.playing.set(true));
    audio.addEventListener('pause', () => this.playing.set(false));
    audio.addEventListener('ended', () => this.playing.set(false));
    audio.addEventListener('timeupdate', () => this.currentTime.set(audio.currentTime));
    audio.addEventListener('loadedmetadata', () => this.duration.set(audio.duration || 0));
    audio.addEventListener('error', () => {
      this.failed.set(true);
      this.playing.set(false);
    });
    this.audio = audio;
    this.started.set(true);
    this.play();
  }

  toggle(): void {
    if (!this.audio) return this.start();
    if (this.playing()) this.audio.pause();
    else this.play();
  }

  seek(ratio: number): void {
    if (!this.audio || !this.duration()) return;
    this.audio.currentTime = Math.min(Math.max(ratio, 0), 1) * this.duration();
  }

  private play(): void {
    const audio = this.audio!;
    audio.volume = 0;
    audio
      .play()
      .then(() => this.fadeIn(0.85))
      .catch(() => this.playing.set(false));
  }

  private fadeIn(target: number): void {
    cancelAnimationFrame(this.fadeFrame);
    const audio = this.audio!;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min(Math.max((now - startTime) / 2200, 0), 1);
      audio.volume = target * t;
      if (t < 1) this.fadeFrame = requestAnimationFrame(step);
    };
    this.fadeFrame = requestAnimationFrame(step);
  }
}
