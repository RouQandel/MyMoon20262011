import { Component, computed, inject, input, signal } from '@angular/core';
import { BOOK, DoodleName, PageId } from '../../love-book.config';
import { OverlayService } from '../../services/overlay.service';
import { Doodle } from '../doodle/doodle';

/** A decorative doodle that hides a little love note. */
@Component({
  selector: 'app-secret',
  imports: [Doodle],
  template: `
    @if (text()) {
      <button
        type="button"
        class="secret"
        [class.found]="found()"
        [class.burst]="bursting()"
        (click)="reveal()"
        aria-label="A little secret"
      >
        <app-doodle [name]="doodle()" [filled]="filled()" />
      </button>
    }
  `,
  styles: `
    :host {
      display: inline-block;
      line-height: 0;
    }
    .secret {
      position: relative;
      padding: 8px;
      margin: -8px;
      color: var(--gold);
      font-size: var(--size, 18px);
      opacity: 0.75;
      animation: twinkle 3.6s ease-in-out infinite;
      animation-delay: var(--delay, 0s);
      transition: transform 0.3s, opacity 0.3s;
    }
    .secret:active {
      transform: scale(0.85);
    }
    .secret.found {
      opacity: 0.45;
      animation: none;
    }
    .secret::after {
      content: '';
      position: absolute;
      inset: 50%;
      border-radius: 50%;
      box-shadow: 0 0 0 0 rgba(200, 164, 106, 0.6);
    }
    .secret.burst::after {
      animation: ring 0.7s ease-out;
    }
    @keyframes twinkle {
      0%, 100% { transform: scale(1) rotate(0deg); opacity: 0.55; }
      50% { transform: scale(1.15) rotate(8deg); opacity: 1; }
    }
    @keyframes ring {
      from { box-shadow: 0 0 0 0 rgba(200, 164, 106, 0.7); }
      to { box-shadow: 0 0 0 26px rgba(200, 164, 106, 0); }
    }
  `,
})
export class Secret {
  private readonly overlay = inject(OverlayService);

  /** Which page's note from BOOK.hiddenNotes to show. */
  readonly at = input.required<PageId | 'cover'>();
  readonly doodle = input<DoodleName>('star');
  readonly filled = input(true);

  protected readonly found = signal(false);
  protected readonly bursting = signal(false);
  protected readonly text = computed(() =>
    BOOK.hiddenNotes.enabled ? BOOK.hiddenNotes.notes[this.at()] : undefined,
  );

  protected reveal(): void {
    this.found.set(true);
    this.bursting.set(true);
    setTimeout(() => this.bursting.set(false), 700);
    this.overlay.showNote({ text: this.text()! });
  }
}
