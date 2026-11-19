import { Component, inject, signal } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { OverlayService } from '../../services/overlay.service';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-promises-page',
  imports: [Doodle, Secret],
  template: `
    <article class="page">
      <header class="page-head">
        <span class="kicker">{{ chapter }}</span>
        <h2 class="script-title">{{ p.title }}</h2>
        <p class="lead">{{ p.intro }}</p>
      </header>

      <ul class="promises">
        @for (item of p.items; track $index; let i = $index) {
          <li>
            <button type="button" class="promise" [class.sealed]="sealed().has(i)" (click)="seal(i)">
              <span class="text">{{ item }}</span>
              <span class="wax" aria-hidden="true"><app-doodle name="heart" [filled]="true" /></span>
            </button>
          </li>
        }
      </ul>

      @if (sealed().size === p.items.length) {
        <p class="all-sealed" animate.enter="fade-up-enter">all sealed. no take-backs ♡</p>
      }

      <div class="foot">
        <app-secret at="promises" doodle="sprig" [filled]="false" />
        @if (secretHeart.enabled) {
          <button type="button" class="tiny-heart" (click)="findSecret()" aria-label="a tiny heart">
            <app-doodle name="heart" [filled]="true" />
          </button>
        }
      </div>
    </article>
  `,
  styles: `
    .promises {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 14px;
    }
    .promise {
      position: relative;
      display: flex;
      align-items: center;
      gap: 12px;
      width: 100%;
      min-height: 64px;
      padding: 14px 64px 14px 18px;
      border-radius: 4px;
      background: var(--paper-light);
      box-shadow: 0 4px 12px rgba(74, 47, 42, 0.1);
      text-align: left;
      transition: transform 0.3s;
    }
    li:nth-child(odd) .promise {
      rotate: -0.6deg;
    }
    li:nth-child(even) .promise {
      rotate: 0.8deg;
    }
    .text {
      font-family: var(--font-hand);
      font-size: 1.38rem;
      line-height: 1.15;
      color: var(--ink);
    }
    .wax {
      position: absolute;
      right: 14px;
      top: 50%;
      display: grid;
      place-items: center;
      width: 38px;
      height: 38px;
      translate: 0 -50%;
      border-radius: 47% 53% 50% 50% / 52% 48% 52% 48%;
      border: 1.5px dashed rgba(122, 46, 62, 0.3);
      color: transparent;
      font-size: 0.95rem;
      transition: all 0.3s;
    }
    .sealed .wax {
      border-color: transparent;
      background: radial-gradient(circle at 35% 30%, #a5435a, var(--burgundy) 60%, #4f1a28);
      box-shadow: 0 3px 6px rgba(79, 26, 40, 0.35);
      color: rgba(255, 235, 225, 0.85);
      animation: press 0.5s cubic-bezier(0.2, 0.9, 0.3, 1.4);
    }
    .all-sealed {
      margin-top: 20px;
      font-family: var(--font-hand);
      font-size: 1.45rem;
      text-align: center;
      color: var(--burgundy);
    }
    .foot {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 36px;
      padding: 0 6px;
    }
    .foot app-secret {
      color: var(--muted-rose);
    }
    .tiny-heart {
      padding: 10px;
      margin: -10px;
      color: var(--rose);
      font-size: 9px;
      opacity: 0.45;
    }
    @keyframes press {
      from {
        transform: scale(1.8) rotate(-25deg);
        opacity: 0;
      }
    }
  `,
})
export class PromisesPage {
  private readonly overlay = inject(OverlayService);
  protected readonly p = BOOK.promises;
  protected readonly secretHeart = BOOK.secretHeart;
  protected readonly chapter = chapterLabel('promises');
  protected readonly sealed = signal<ReadonlySet<number>>(new Set());

  protected seal(i: number): void {
    this.sealed.update((s) => new Set(s).add(i));
  }

  protected findSecret(): void {
    this.overlay.showNote({ title: this.secretHeart.title, text: this.secretHeart.message, special: true });
  }
}
