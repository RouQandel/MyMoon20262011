import { Component, inject } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { Doodle } from '../doodle/doodle';
import { FinalSurprise } from '../final-surprise/final-surprise';

@Component({
  selector: 'app-overlays',
  imports: [Doodle, FinalSurprise],
  templateUrl: './overlays.html',
  styleUrl: './overlays.scss',
  host: { '(document:keydown.escape)': 'closeAll()' },
})
export class Overlays {
  protected readonly overlay = inject(OverlayService);

  protected closeAll(): void {
    this.overlay.closeNote();
    this.overlay.letter.set(null);
  }
}
