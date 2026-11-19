import { Component, input } from '@angular/core';
import { DoodleName } from '../../love-book.config';

@Component({
  selector: 'app-doodle',
  template: `
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      [attr.fill]="filled() ? 'currentColor' : 'none'"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      @switch (name()) {
        @case ('heart') {
          <svg:path
            d="M12 20.5s-7.5-4.6-9.3-9.4C1.4 7.6 3.6 4 7.1 4c2.1 0 3.6 1.2 4.9 3 1.3-1.8 2.8-3 4.9-3 3.5 0 5.7 3.6 4.4 7.1-1.8 4.8-9.3 9.4-9.3 9.4z"
          />
        }
        @case ('star') {
          <svg:path d="M12 2.8l2.7 5.8 6.3.8-4.6 4.3 1.2 6.2L12 16.9l-5.6 3 1.2-6.2L3 9.4l6.3-.8z" />
        }
        @case ('sparkle') {
          <svg:path d="M12 2c.6 4.6 2.4 7.4 10 10-7.6 2.6-9.4 5.4-10 10-.6-4.6-2.4-7.4-10-10 7.6-2.6 9.4-5.4 10-10z" />
        }
        @case ('moon') {
          <svg:path d="M20 14.5A8.5 8.5 0 0 1 9.5 4a8.5 8.5 0 1 0 10.5 10.5z" />
        }
        @case ('flower') {
          <svg:circle cx="12" cy="7.4" r="3.4" />
          <svg:circle cx="16.4" cy="10.6" r="3.4" />
          <svg:circle cx="14.7" cy="15.7" r="3.4" />
          <svg:circle cx="9.3" cy="15.7" r="3.4" />
          <svg:circle cx="7.6" cy="10.6" r="3.4" />
          <svg:circle cx="12" cy="12" r="2" fill="#f6e3b4" />
        }
        @case ('sprig') {
          <svg:path
            d="M5 19c4-4 7-9 14-14M9 15c-2-.5-3.5-2-3.8-4 2 .3 3.4 1.6 3.8 4zM13 10.8c-.4-2 .3-4 1.8-5.3.6 2 0 3.9-1.8 5.3zM12.5 12.3c2-.6 4-.1 5.4 1.3-2 .7-3.9.3-5.4-1.3z"
          />
        }
        @case ('note') {
          <svg:path d="M9 18.5V5.5l10-2v12.5" />
          <svg:circle cx="6.5" cy="18.5" r="2.5" />
          <svg:circle cx="16.5" cy="16" r="2.5" />
        }
        @case ('sun') {
          <svg:circle cx="12" cy="12" r="4" />
          <svg:path
            d="M12 2.5V5M12 19v2.5M2.5 12H5M19 12h2.5M5.3 5.3l1.8 1.8M16.9 16.9l1.8 1.8M5.3 18.7l1.8-1.8M16.9 7.1l1.8-1.8"
          />
        }
      }
    </svg>
  `,
  styles: `
    :host {
      display: inline-block;
      width: 1em;
      height: 1em;
      line-height: 0;
      flex-shrink: 0;
    }
    svg {
      width: 100%;
      height: 100%;
      overflow: visible;
    }
  `,
})
export class Doodle {
  readonly name = input<DoodleName>('heart');
  readonly filled = input(false);
}
