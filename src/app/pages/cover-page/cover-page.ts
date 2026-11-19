import { Component, output } from '@angular/core';
import { BOOK } from '../../love-book.config';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-cover-page',
  imports: [Doodle, Secret],
  template: `
    <div class="cover">
      <div class="frame">
        <span class="corner tl"></span><span class="corner tr"></span>
        <span class="corner bl"></span><span class="corner br"></span>

        <app-secret class="cover-secret" at="cover" doodle="sparkle" />

        <p class="eyebrow">{{ b.cover.eyebrow }}</p>
        <p class="name foil">{{ b.hisName }}</p>
        <p class="nickname">{{ b.cover.nicknameLine }}</p>

        <div class="emblem" aria-hidden="true">
          <app-doodle class="sprig left" name="sprig" />
          <app-doodle class="heart" name="heart" [filled]="true" />
          <app-doodle class="sprig right" name="sprig" />
        </div>

        <h1 class="title foil">{{ b.cover.title }}</h1>
        <p class="subtitle">{{ b.cover.subtitle }}</p>
        <p class="date">{{ b.birthday }}</p>

        <button type="button" class="open-btn" (click)="open.emit()">{{ b.cover.openButton }}</button>
        <p class="hint">{{ b.cover.hint }}</p>
      </div>
    </div>
  `,
  styleUrl: './cover-page.scss',
})
export class CoverPage {
  readonly open = output<void>();
  protected readonly b = BOOK;
}
