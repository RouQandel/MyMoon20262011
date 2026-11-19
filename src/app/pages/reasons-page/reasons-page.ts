import { Component, computed, signal } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-reasons-page',
  imports: [Doodle, Secret],
  templateUrl: './reasons-page.html',
  styleUrl: './reasons-page.scss',
})
export class ReasonsPage {
  protected readonly r = BOOK.reasons;
  protected readonly chapter = chapterLabel('reasons');

  protected readonly hearts = this.r.floatingHearts.map((text, i, all) => ({
    text,
    left: 9 + (i * 82) / Math.max(all.length - 1, 1),
    color: ['var(--rose)', 'var(--muted-rose)', 'var(--burgundy)'][i % 3],
    top: [14, 54, 26, 62, 10, 44, 30, 58, 20][i % 9],
    size: 26 + ((i * 7) % 14),
    duration: 3.2 + ((i * 0.7) % 2.4),
    delay: (i * 0.45) % 2,
  }));

  protected readonly popping = signal<ReadonlySet<number>>(new Set());
  protected readonly popped = signal<ReadonlySet<number>>(new Set());
  protected readonly revealed = signal<{ id: number; text: string } | null>(null);
  protected readonly flipped = signal<ReadonlySet<number>>(new Set());
  protected readonly allPopped = computed(() => this.popped().size === this.hearts.length);

  protected pop(i: number): void {
    if (this.popping().has(i)) return;
    this.popping.update((s) => new Set(s).add(i));
    this.revealed.set({ id: i, text: this.hearts[i].text });
    setTimeout(() => this.popped.update((s) => new Set(s).add(i)), 450);
  }

  protected refill(): void {
    this.popping.set(new Set());
    this.popped.set(new Set());
    this.revealed.set(null);
  }

  protected flip(i: number): void {
    this.flipped.update((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }
}
