import { Component, computed, signal } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

const COLORS = ['#c97b84', '#7a2e3e', '#e9cf9a', '#f2d4d0', '#b5838d', '#f7e4b8'];

@Component({
  selector: 'app-wish-page',
  imports: [Doodle, Secret],
  templateUrl: './wish-page.html',
  styleUrl: './wish-page.scss',
})
export class WishPage {
  protected readonly w = BOOK.wish;
  protected readonly chapter = chapterLabel('wish');
  protected readonly candles = Array.from({ length: this.w.candles }, (_, i) => i);
  protected readonly out = signal<ReadonlySet<number>>(new Set());
  protected readonly allOut = computed(() => this.out().size === this.candles.length);
  protected readonly glow = computed(() => 1 - this.out().size / this.candles.length);

  protected readonly confetti = Array.from({ length: 36 }, (_, i) => ({
    left: (i * 29) % 100,
    delay: ((i * 13) % 20) / 10,
    duration: 2.6 + ((i * 7) % 15) / 10,
    color: COLORS[i % COLORS.length],
    heart: i % 4 === 0,
    drift: ((i * 17) % 60) - 30,
  }));

  protected blow(i: number): void {
    this.out.update((s) => new Set(s).add(i));
  }

  protected relight(): void {
    this.out.set(new Set());
  }
}
