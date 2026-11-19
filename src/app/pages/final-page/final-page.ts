import { Component, inject, input, output } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { OverlayService } from '../../services/overlay.service';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-final-page',
  imports: [Doodle, Secret],
  template: `
    <article class="page final">
      @if (active()) {
        <div class="petals" aria-hidden="true">
          @for (p of petals; track $index) {
            <span
              class="petal"
              [style.left.%]="p.left"
              [style.animation-delay.s]="p.delay"
              [style.animation-duration.s]="p.duration"
              [style.--size.px]="p.size"
              [style.--sway.px]="p.sway"
            ></span>
          }
        </div>
      }

      <header class="page-head">
        <span class="kicker">{{ chapter }}</span>
        <h2 class="script-title big">{{ f.title }}</h2>
      </header>

      @if (f.photo) {
        <figure class="polaroid">
          <img [src]="f.photo" [alt]="f.photoCaption" loading="lazy" draggable="false" />
          <figcaption>{{ f.photoCaption }}</figcaption>
        </figure>
      }

      <div class="body">
        @for (para of f.paragraphs; track $index) {
          <p class="serif-p">{{ para }}</p>
        }
      </div>

      <div class="closing">
        <app-doodle class="sprig l" name="sprig" />
        <p>{{ f.closingLine }}</p>
        <app-doodle class="sprig r" name="sprig" />
      </div>

      <p class="sign">— {{ herName }}</p>

      <div class="actions">
        @if (f.surprise.enabled) {
          <button type="button" class="btn-primary" (click)="overlay.surprise.set(true)">
            <app-doodle name="sparkle" [filled]="true" /> {{ f.surpriseButton }}
          </button>
        }
        <button type="button" class="btn-ghost" (click)="restart.emit()">{{ f.restartButton }}</button>
      </div>

      <app-secret class="final-secret" at="final" doodle="star" />
    </article>
  `,
  styles: `
    .final {
      position: relative;
      overflow: hidden;
      min-height: 100%;
      text-align: center;
    }
    .big {
      font-size: clamp(2.5rem, 12vw, 3.2rem);
    }
    .polaroid {
      position: relative;
      z-index: 1;
      width: 70%;
      margin: 0 auto 26px;
      padding: 10px 10px 0;
      background: #fffdf9;
      box-shadow: 0 12px 26px rgba(74, 47, 42, 0.2);
      rotate: -2deg;
    }
    .polaroid img {
      display: block;
      width: 100%;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      object-position: center 62%;
    }
    .polaroid figcaption {
      padding: 8px 4px 12px;
      font-family: var(--font-hand);
      font-size: 1.35rem;
      color: var(--ink);
    }
    .body {
      position: relative;
      z-index: 1;
    }
    .serif-p {
      margin-bottom: 14px;
      font-family: var(--font-serif);
      font-size: 1.12rem;
      font-style: italic;
      line-height: 1.6;
      color: var(--ink);
    }
    .closing {
      position: relative;
      z-index: 1;
      display: flex;
      align-items: center;
      gap: 8px;
      margin: 24px 0 8px;
      color: var(--rose);
    }
    .closing p {
      font-family: var(--font-hand);
      font-size: 1.55rem;
      line-height: 1.2;
      color: var(--burgundy);
    }
    .sprig {
      font-size: 1.6rem;
    }
    .sprig.l {
      transform: scaleX(-1);
    }
    .sign {
      font-family: var(--font-script);
      font-size: 1.9rem;
      color: var(--burgundy);
    }
    .actions {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
      margin-top: 26px;
    }
    .final-secret {
      position: absolute;
      top: 18px;
      left: 18px;
      --size: 14px;
    }
    .petals {
      position: absolute;
      inset: 0;
      pointer-events: none;
    }
    .petal {
      position: absolute;
      top: -30px;
      width: var(--size);
      height: calc(var(--size) * 0.8);
      border-radius: 80% 0 80% 0;
      background: linear-gradient(135deg, #f6cfd0, #d98f99);
      opacity: 0;
      animation: petal linear infinite;
    }
    @keyframes petal {
      0% {
        opacity: 0;
        transform: translate(0, 0) rotate(0deg);
      }
      10% {
        opacity: 0.85;
      }
      50% {
        transform: translate(var(--sway), 50vh) rotate(200deg);
      }
      100% {
        opacity: 0;
        transform: translate(calc(var(--sway) * -0.5), 105vh) rotate(420deg);
      }
    }
  `,
})
export class FinalPage {
  protected readonly overlay = inject(OverlayService);
  readonly active = input(false);
  readonly restart = output<void>();

  protected readonly f = BOOK.finalPage;
  protected readonly herName = BOOK.herName;
  protected readonly chapter = chapterLabel('final');
  protected readonly petals = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 23) % 100,
    delay: (i * 0.9) % 10,
    duration: 9 + ((i * 3) % 7),
    size: 10 + ((i * 5) % 9),
    sway: ((i * 19) % 80) - 40,
  }));
}
