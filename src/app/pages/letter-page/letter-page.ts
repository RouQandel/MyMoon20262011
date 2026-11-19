import { Component, inject } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { OverlayService } from '../../services/overlay.service';
import { Doodle } from '../../components/doodle/doodle';
import { Envelope } from '../../components/envelope/envelope';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-letter-page',
  imports: [Doodle, Envelope, Secret],
  template: `
    <article class="page">
      <header class="page-head">
        <span class="kicker">{{ chapter }}</span>
        <h2 class="script-title">{{ letter.title }}</h2>
      </header>

      <div class="sheet lined">
        <app-secret class="corner-secret" at="letter" doodle="flower" />
        <p class="greeting">{{ letter.greeting }}</p>
        @for (p of letter.paragraphs; track $index) {
          <p class="hand-p">{{ p }}</p>
        }
        <p class="signoff">{{ letter.signoff }}</p>
        <p class="signature">{{ letter.signature }}</p>
        <app-doodle class="pressed-flower" name="flower" [filled]="true" />
      </div>

      @if (secret.enabled) {
        <section class="sealed">
          <div class="divider"><app-doodle name="sparkle" [filled]="true" /></div>
          <div class="env-wrap">
            <app-envelope [large]="true" [label]="secret.label" (opened)="overlay.openLetter(secret)" />
          </div>
          <p class="hint">{{ secret.hint }}</p>
        </section>
      }
    </article>
  `,
  styles: `
    .sheet {
      position: relative;
      padding: 22px 20px 26px 34px;
    }
    .corner-secret {
      position: absolute;
      top: 10px;
      right: 12px;
      --size: 16px;
      color: var(--rose);
    }
    .greeting {
      margin-bottom: 6px;
      font-family: var(--font-script);
      font-size: 2rem;
      color: var(--burgundy);
    }
    .signoff {
      margin-top: 14px;
      font-family: var(--font-serif);
      font-style: italic;
      color: var(--brown);
    }
    .signature {
      font-family: var(--font-script);
      font-size: 1.9rem;
      color: var(--burgundy);
    }
    .pressed-flower {
      position: absolute;
      right: 18px;
      bottom: 18px;
      font-size: 2.4rem;
      color: rgba(201, 123, 132, 0.35);
      transform: rotate(-18deg);
    }
    .sealed {
      margin-top: 30px;
      text-align: center;
    }
    .env-wrap {
      width: min(78%, 300px);
      margin: 84px auto 8px;
    }
  `,
})
export class LetterPage {
  protected readonly overlay = inject(OverlayService);
  protected readonly letter = BOOK.letter;
  protected readonly secret = BOOK.secretLetter;
  protected readonly chapter = chapterLabel('letter');
}
