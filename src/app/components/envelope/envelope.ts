import { Component, input, output, signal } from '@angular/core';
import { Doodle } from '../doodle/doodle';

@Component({
  selector: 'app-envelope',
  imports: [Doodle],
  templateUrl: './envelope.html',
  styleUrl: './envelope.scss',
  host: { '[class.large]': 'large()' },
})
export class Envelope {
  readonly label = input('');
  readonly large = input(false);
  readonly opened = output<void>();

  protected readonly state = signal<'closed' | 'opening' | 'open'>('closed');

  protected tap(): void {
    if (this.state() === 'opening') return;
    if (this.state() === 'open') {
      this.opened.emit();
      return;
    }
    this.state.set('opening');
    setTimeout(() => {
      this.state.set('open');
      this.opened.emit();
    }, 1150);
  }
}
