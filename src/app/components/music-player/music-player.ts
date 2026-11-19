import { Component, effect, inject, signal } from '@angular/core';
import { MusicService } from '../../services/music.service';
import { Doodle } from '../doodle/doodle';

@Component({
  selector: 'app-music-player',
  imports: [Doodle],
  templateUrl: './music-player.html',
  styleUrl: './music-player.scss',
})
export class MusicPlayer {
  protected readonly music = inject(MusicService);
  protected readonly bubble = signal(false);

  constructor() {
    let shown = false;
    effect(() => {
      if (this.music.playing() && !shown) {
        shown = true;
        setTimeout(() => this.bubble.set(true), 1400);
        setTimeout(() => this.bubble.set(false), 7400);
      }
    });
  }
}
