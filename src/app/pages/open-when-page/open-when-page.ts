import { Component, inject } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { OverlayService } from '../../services/overlay.service';
import { Envelope } from '../../components/envelope/envelope';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-open-when-page',
  imports: [Envelope, Secret],
  template: `
    <article class="page">
      <header class="page-head">
        <span class="kicker">{{ chapter }}</span>
        <h2 class="script-title">{{ o.title }}</h2>
        <p class="lead">{{ o.intro }}</p>
      </header>

      <div class="grid">
        @for (l of o.letters; track $index; let i = $index) {
          <app-envelope [label]="l.label" [style.--tilt.deg]="tilts[i % tilts.length]" (opened)="read(l)" />
        }
      </div>

      <p class="foot">
        <app-secret at="openWhen" doodle="star" />
        <span>read them in any order — or all at once</span>
      </p>
    </article>
  `,
  styles: `
    .grid {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 46px 18px;
      padding: 30px 4px 0;
    }
    app-envelope {
      transform: rotate(var(--tilt));
    }
    app-envelope:last-child:nth-child(odd) {
      grid-column: 1 / -1;
      width: 55%;
      justify-self: center;
    }
    .foot {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-top: 34px;
      font-family: var(--font-serif);
      font-size: 0.85rem;
      font-style: italic;
      color: var(--brown);
    }
  `,
})
export class OpenWhenPage {
  private readonly overlay = inject(OverlayService);
  protected readonly o = BOOK.openWhen;
  protected readonly chapter = chapterLabel('openWhen');
  protected readonly tilts = [-2, 2, 1.5, -1.5, 1];

  protected read(l: { label: string; paragraphs: string[] }): void {
    this.overlay.openLetter({
      title: `Open when ${l.label}`,
      greeting: this.o.greeting,
      paragraphs: l.paragraphs,
      signature: BOOK.herName,
    });
  }
}
