import { Component, signal } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-dreams-page',
  imports: [Doodle, Secret],
  template: `
    <article class="page">
      <header class="page-head">
        <span class="kicker">{{ chapter }}</span>
        <h2 class="script-title">{{ d.title }}</h2>
        <p class="lead">{{ d.intro }}</p>
      </header>

      <div class="notebook">
        <span class="someday">someday</span>
        <ul>
          @for (item of d.items; track $index; let i = $index) {
            <li>
              <button type="button" class="dream" [class.promised]="marked().has(i)" (click)="toggle(i)">
                <span class="box">
                  @if (marked().has(i)) {
                    <app-doodle class="check" name="heart" [filled]="true" />
                  }
                </span>
                <span class="text">{{ item.text }}</span>
                <span class="tag">{{ item.tag }}</span>
              </button>
            </li>
          }
        </ul>
        <p class="tally">
          {{ marked().size }} pinky promise{{ marked().size === 1 ? '' : 's' }} made
          <app-secret at="dreams" doodle="sun" />
        </p>
      </div>
    </article>
  `,
  styles: `
    .notebook {
      position: relative;
      padding: 30px 14px 18px 40px;
      border-radius: 4px;
      background:
        linear-gradient(90deg, transparent 30px, rgba(201, 123, 132, 0.45) 30px, rgba(201, 123, 132, 0.45) 31.5px, transparent 31.5px),
        repeating-linear-gradient(180deg, transparent 0 33px, rgba(122, 46, 62, 0.1) 33px 34px),
        #fffaf3;
      box-shadow: 0 8px 20px rgba(74, 47, 42, 0.12);
    }
    .someday {
      position: absolute;
      top: -12px;
      right: 14px;
      padding: 4px 12px;
      border: 1.5px solid var(--rose);
      border-radius: 4px;
      color: var(--rose);
      font-family: var(--font-serif);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      background: #fffaf3;
      rotate: 6deg;
    }
    ul {
      list-style: none;
    }
    .dream {
      display: flex;
      align-items: flex-start;
      gap: 12px;
      width: 100%;
      padding: 9px 0;
      text-align: left;
    }
    .box {
      position: relative;
      display: grid;
      place-items: center;
      flex-shrink: 0;
      width: 20px;
      height: 20px;
      margin-top: 3px;
      border: 1.5px solid var(--brown);
      border-radius: 5px 3px 6px 4px;
    }
    .check {
      font-size: 1.35rem;
      color: var(--burgundy);
      animation: stamp 0.45s cubic-bezier(0.2, 0.9, 0.3, 1.5);
    }
    .text {
      flex: 1;
      font-family: var(--font-hand);
      font-size: 1.35rem;
      line-height: 1.15;
      color: var(--ink);
      transition: color 0.3s;
    }
    .promised .text {
      color: var(--burgundy);
    }
    .tag {
      flex-shrink: 0;
      margin-top: 4px;
      padding: 2px 8px;
      border-radius: 999px;
      background: rgba(242, 212, 208, 0.7);
      color: var(--brown);
      font-family: var(--font-serif);
      font-size: 0.66rem;
      font-style: italic;
      white-space: nowrap;
    }
    .tally {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      margin-top: 14px;
      font-family: var(--font-serif);
      font-size: 0.85rem;
      font-style: italic;
      color: var(--brown);
    }
    @keyframes stamp {
      from {
        opacity: 0;
        transform: scale(2.4) rotate(-20deg);
      }
    }
  `,
})
export class DreamsPage {
  protected readonly d = BOOK.dreams;
  protected readonly chapter = chapterLabel('dreams');
  protected readonly marked = signal<ReadonlySet<number>>(new Set());

  protected toggle(i: number): void {
    this.marked.update((s) => {
      const next = new Set(s);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  }
}
