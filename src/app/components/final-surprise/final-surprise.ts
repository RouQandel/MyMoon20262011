import { Component, output } from '@angular/core';
import { BOOK } from '../../love-book.config';
import { Doodle } from '../doodle/doodle';

@Component({
  selector: 'app-final-surprise',
  imports: [Doodle],
  templateUrl: './final-surprise.html',
  styleUrl: './final-surprise.scss',
})
export class FinalSurprise {
  readonly close = output<void>();

  protected readonly s = BOOK.finalPage.surprise;
  protected readonly lights = Array.from({ length: 16 }, (_, i) => ({
    left: (i * 37) % 100,
    size: 4 + ((i * 7) % 10),
    delay: (i * 0.73) % 9,
    duration: 9 + ((i * 5) % 8),
  }));

  /** Each paragraph appears after the previous one, like a slow scene. */
  protected delay(i: number): string {
    return `${1.6 + i * 1.3}s`;
  }

  protected get endDelay(): string {
    return `${1.6 + this.s.paragraphs.length * 1.3 + 0.4}s`;
  }
}
