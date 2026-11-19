import { Component, computed, inject } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { MusicService } from '../../services/music.service';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-playlist-page',
  imports: [Doodle, Secret],
  templateUrl: './playlist-page.html',
  styleUrl: './playlist-page.scss',
})
export class PlaylistPage {
  protected readonly music = inject(MusicService);
  protected readonly p = BOOK.playlist;
  protected readonly chapter = chapterLabel('playlist');
  protected readonly progress = computed(() =>
    this.music.duration() ? (this.music.currentTime() / this.music.duration()) * 100 : 0,
  );

  protected time(seconds: number): string {
    const s = Math.floor(seconds || 0);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  }

  protected seek(event: MouseEvent): void {
    const el = event.currentTarget as HTMLElement;
    const rect = el.getBoundingClientRect();
    this.music.seek((event.clientX - rect.left) / rect.width);
  }
}
